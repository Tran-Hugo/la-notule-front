<template>
{{message}}
  <body>
      <form class="d-flex justify-content-center" @submit.prevent="submit" id="payment-form">
        <div class="form-row col-6">
            <div id="card-elements" v-on:change="cardChange(event)"></div>
            <div id="card-errors" role="alert"></div>
        </div>
      </form>
  </body>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

let stripe = window.Stripe('pk_test_51JinhbIWZlqy6WjcZXGkpfEZhzIxhrVBvtHJpQTC8dUZ2fBM51VHUJ83Ow6je0sM4tV1RJlRk5tTlkquPN3J3lP800Y24MdTrk'),
    elements = stripe.elements(),
    card = undefined;
export default {
    name:'cartPayment',
    data(){
        return {
            intentSecret:'',
            cartId:'',
            cardholderName:'',
            cardholderEmail:'',
            message:''
        }
    },
    mounted(){
        card = elements.create('card');
        card.mount('#card-elements');
        axios.post("https://127.0.0.1:8000/payment/"+this.cart)
            .then(res=>{
                if(res.status == "404"){
                    this.$router.push(-1)
                }
                // console.log(res.data.user.email)
                this.intentSecret = res.data.intentSecret
                this.cartId = res.data.cart['id']  
                this.cardholderName = res.data.user.lastname
                this.cardholderEmail = res.data.user.email
                this.cartTotal = res.data.cart.total
            })
    },
    methods: {
        cardChange(event){
            console.log(event)
            let displayError = document.getElementById('card-errors');
            if(event.error){
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = "";
            }
        },
        submit(){
            stripe.handleCardPayment(
                this.intentSecret,
                card,
                {
                    payment_method_data : {
                        billing_details:{
                            name: this.cardholderName,
                            email:this.cardholderEmail
                        }
                    }
                }
            ).then((result)=>{
                if('paymentIntent' in result){
                    // console.log(result.paymentIntent,result)
                    this.stripeTokenHandler(result.paymentIntent)
                    // console.log(result.paymentIntent,result)
                } else if ('error' in result) {
                    console.log(result.error.code)
                    this.message = 'Carte refusée'
                }
            })
        },
        stripeTokenHandler(intent){
            let data = {
                'stripeIntentId':intent.id,
                'stripeIntentPaymentMethod':intent.payment_method,
                'stripeIntentStatus':intent.status,
                'subscription':this.cartId
            }
            console.log(data)
            axios.post('https://127.0.0.1:8000/payment/'+this.cartId+'/subscription',data)
                .then(
                    setTimeout(window.location.href="http://localhost:8080/",4000)
                   )
        }
    },
    computed: {
    ...mapGetters({
        cart:'getCart',
        })
  }

}
</script>

<style>

</style>
<template>
  <main>
    <h3>Paiement par carte bancaire :</h3>
    <div class="d-flex flex-column principale">
      <div class="my-auto">
        <div class="cards-logos brands">
          <img src="@/assets/mc_vrt_pos.svg" alt="master-card.svg" />
          <img src="@/assets/Visa_Brandmark_Blue_RGB_2021.svg" alt="visa.svg" />
          <img
            src="@/assets/AXP_BlueBoxLogo_Alternate_SMALLscale_RGB_DIGITAL_80x80.svg"
            alt="amex.svg"
          />
        </div>
        <form
          class="d-flex justify-content-center"
          @submit.prevent="submit"
          id="payment-form"
        >
          <div class="form-row col-12 col-md-6 col-lg-6 d-flex flex-column">
            <div id="card-elements" v-on:change="cardChange(event)"></div>
            <div id="card-errors" role="alert"></div>
            <br />
            <button type="button" @click.prevent="submit" class="btn btn-plus">
              Payer {{ cartTotal }}€
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="cards-logos stripe-logo-div">
      <img
        class="logo-stripe"
        src="@/assets/Stripe-blurple.svg"
        alt="stripe.svg"
      />
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import configHelper from "../../helpers/configHeader";

let stripe = window.Stripe(
    "pk_test_51JinhbIWZlqy6WjcZXGkpfEZhzIxhrVBvtHJpQTC8dUZ2fBM51VHUJ83Ow6je0sM4tV1RJlRk5tTlkquPN3J3lP800Y24MdTrk"
  ),
  elements = stripe.elements(),
  card = undefined;
export default {
  name: "cartPayment",
  data() {
    return {
      intentSecret: "",
      cartId: "",
      cardholderName: "",
      cardholderEmail: "",
      cartTotal: "",
    };
  },
  mounted() {
    card = elements.create("card", {
      style: {
        base: {
          fontSize: "18px",
        },
      },
    });
    card.mount("#card-elements");
    card.addEventListener("change", (event) => {
      console.log(event);
      let displayError = document.getElementById("card-errors");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    });
    axios
      .get(configHelper.domain + "/payment/" + this.cart, configHelper.config())
      .then((res) => {
        console.log(res.data);
        this.intentSecret = res.data.intentSecret;
        this.cartId = res.data.cart["id"];
        this.cardholderName = res.data.user.lastname;
        this.cardholderEmail = res.data.user.email;
        this.cartTotal = res.data.cart.total;
      });
  },
  beforeUnmount() {
    card.destroy("#card-elements");
  },
  methods: {
    submit() {
      stripe
        .handleCardPayment(this.intentSecret, card, {
          payment_method_data: {
            billing_details: {
              name: this.cardholderName,
              email: this.cardholderEmail,
            },
          },
        })
        .then((result) => {
          if ("paymentIntent" in result) {
            if(result.paymentIntent.status == "succeeded"){
              let data = {
              stripeIntentId: result.paymentIntent.id,
              stripeIntentPaymentMethod: result.paymentIntent.payment_method,
              stripeIntentStatus: result.paymentIntent.status,
              subscription: this.cartId,
            };
            console.log(data);
            axios.post(
              configHelper.domain + "/payment/" + this.cartId + "/subscription",
              data
            );
            alert("paiement réussi");
            this.$router.push("/");
            }
          } else if ("error" in result) {
            if (result.error.code == "card_declined") {
              alert("votre carte est refusée");
              this.$router.go();
            }
          }
        });
    },
    // async stripeTokenHandler(intent){
    //     let data = {
    //         'stripeIntentId':intent.id,
    //         'stripeIntentPaymentMethod':intent.payment_method,
    //         'stripeIntentStatus':intent.status,
    //         'subscription':this.cartId
    //     }
    //     console.log(data)
    //     await axios.post('https://127.0.0.1:8000/payment/'+this.cartId+'/subscription',data)
    //     // card.clear();
    //             .then(setTimeout(window.location.href="http://localhost:8080/",4000))
    // }
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
    }),
  },
};
</script>

<style scoped>
.principale {
  min-height: 26rem;
  border: 1px solid wheat;
  margin: 1rem;
}
.cards-logos img {
  height: 3rem;
}
.brands {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
}
.logo-stripe {
  height: 2rem !important;
}
.stripe-logo-div {
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem;
}
.btn-plus {
  background-color: #12ba9e;
  color: white;
}
@media screen and (min-width: 768px) {
  .principale {
    min-height: 36rem;
  }
}
@media screen and (min-width: 992px) {
  main {
    padding: 9rem 4rem 0 4rem;
  }
}
</style>

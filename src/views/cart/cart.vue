<template>
  <div>
    
    <h4 v-if="cartItems.length == 0">Votre panier est vide</h4>
    <ul v-for="(item,key) in cartItems" :key="key" class="list-group list-group-flush">
  <li class="list-group-item">
    {{item['book']['title']}}  
    <span class="badge bg-primary rounded-pill me-2">
      {{item.quantity}}
      </span>
  <button type="button" @click="minusCartItem(item.id)" class="btn btn-danger btn-sm me-2">-</button>
  <button type="button" @click="plusCartItem(item.id)" class="btn btn-success btn-sm me-2">+</button>
  <button type="button" @click="deleteCartItem(item.id)" class="btn btn-danger btn-sm me-2">Supprimer</button>
  </li>
</ul>
<br>
<h4 v-if="cartItems.length !== 0">Total de votre panier {{total}}€</h4>
<button v-if="cartItems.length !== 0" type="button" @click="removeCart" class="btn btn-danger me-2">Vider le panier</button>
<router-link v-if="cartItems.length !== 0" to="/payment"><button type="button" class="btn btn-primary">Valider le panier</button></router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import {mapGetters} from 'vuex'
import configHelper from '../../helpers/configHeader.js'

export default {
  name: 'cart',
  data(){
    return {
      cartItems:[],
      total:''
    }
  },
  mounted(){
     const cart = async () => {
      const data = await  axios.get(configHelper.domain+"/api/carts/"+this.cart, configHelper.config)
           
        console.log(data.data);
        this.cartItems = data.data.cartItems
        this.total = data.data.total
        
    }
    
    cart()
  },
  methods:{
    removeCart(){
      this.cartItems.forEach((item) => {
  console.log(item.id) //value
      axios.delete(configHelper.domain+"/api/cart_items/"+item.id)
          .then(res=>{console.log(res,'OK')})
    })
    let resetTotal = {
      'total':0
    }
    const config = {
            headers: {
              "content-type": "application/merge-patch+json",
            },
          };
    axios.patch(configHelper.domain+"/api/carts/"+this.cart,resetTotal,config)
    },
   async minusCartItem(id){
      let cartItemId = {
        'cartItemId': id
      };
      await axios.post(configHelper.domain+'/cartItems/minus',cartItemId);
          
            this.$router.go()
          
    },
  async plusCartItem(id){
      let cartItemId = {
        'cartItemId': id
      };
      await axios.post(configHelper.domain+'/cartItems/plus',cartItemId)

      const data = await axios.get(configHelper.domain+"/api/carts/"+this.cart, configHelper.config)
            console.log(data.data);
                this.cartItems = data.data.cartItems
                this.total = data.data.total
       
            // this.$router.go()
          
    },
   async deleteCartItem(id){
      await axios.delete(configHelper.domain+'/cartItems/delete/'+id)
          const data = await axios.get(configHelper.domain+"/api/carts/"+this.cart, configHelper.config)
            console.log(data.data);
                this.cartItems = data.data.cartItems
                this.total = data.data.total
    }
  },
  computed: {
    ...mapGetters({
        cart:'getCart',
        })
  }
}
</script>

<template>
  <h1>Identifiant commande : {{id}}</h1>
  <div class="mb-3 card" v-for="(product,key) in order.products" :key="key">
      <p class="card-text">titre : {{product.title}}</p>
      <p class="card-text">prix : {{product.price}}€</p>
      <p class="card-text">quantité : {{product.quantity}}</p>
  </div>
  <h4>Total : {{order.price}}€</h4>
</template>

<script>
import axios from 'axios'
import configHelper from '../helpers/configHeader.js'

export default {
    name:'order',
    data(){
        return{
            id:this.$route.params.id,
            order:[],
        }
    },
    mounted(){
        axios.get(configHelper.domain+'/api/user/orders/'+this.id,configHelper.config())
           .then((res)=>{
            //    console.log('on est ici')
              this.order = res.data
           })
           .catch((error) => {
            //    console.log(error.response.status)
               if(error.response.status===403){
                   this.$router.push('/')
               }
          });
    },
}
</script>

<style>

</style>
<template>
  <h1>Commande {{id}}</h1>
  <div class="mb-3" v-for="(product,key) in order.products" :key="key">
      <p>titre : {{product.title}}</p>
      <p>quantité : {{product.quantity}}</p>
      <p>prix : {{product.price}}€</p>
  </div>
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
        axios.get(configHelper.domain+'/api/user/orders/'+this.id,configHelper.config)
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
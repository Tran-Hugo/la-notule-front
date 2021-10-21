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
    beforeMount(){
        axios.get(configHelper.domain+'/api/orders/'+this.id)
           .then(res=>{
              axios
                 .get("https://127.0.0.1:8000/api/me", configHelper.config)
                 .then((data)=>{
                     console.log(data.data.roles[0])
                     if(data.data.roles[0] === "ROLE_ADMIN"){
                         console.log(res.data)
                         this.order = res.data
                     } else if(data.data.id == res.data.User.id){
                         console.log("ok")
                         this.order = res.data
                     } else {
                         this.$router.push("/")
                     }
                 })
           })
    },
}
</script>

<style>

</style>
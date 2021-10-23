<template>
  <body class="d-flex justify-content-center">
      <div class="d-flex justify-content-around col-10 border">
          <img v-if="book.fileUrl == null" :src="this.domain+'/images/no-image.jpg'" alt="...">
          <img v-else class="col-6" :src="domain+book.fileUrl" alt="">
          <div class="d-flex flex-column border-left col-6">
              <h1 class="border-bottom">{{book.title}}</h1>
              <br class="border-bottom">
              <p>de : {{book.author}}</p>
              <p>Catégories : <router-link v-for="(cat,key) in book.category" :key='key'  :to="{ name: 'category', params: { id: cat.id }}"><span class="badge bg-primary rounded-pill me-2">{{cat.name}} </span></router-link></p>
              <p>Description : {{book.description}}</p>
              <p v-if="book.quantity<3" class="text-danger">en stock : {{book.quantity}}</p>
              <p v-else>en stock : {{book.quantity}}</p>
              <p>Prix : {{book.price}}€</p>
              <label v-if="book.quantity !==0" for="">quantité</label>
              
              <input v-if="book.quantity !==0" class="col-2 mb-2 align-self-center" type="number" v-model="quantity" :max="book.quantity" min="0">
              
              <button @click="addCartItem(book.id)" v-if="book.quantity !==0" class="btn btn-primary"><i class="fas fa-cart-plus"></i>Ajouter au panier</button>
              <p class="text-danger" v-else>rupture de stock</p>
          </div>
      </div>
  </body>
</template>

<script>
import axios from 'axios'
import configHelper from '../helpers/configHeader.js'
import {mapGetters} from 'vuex'

export default {
    name:'Book',
    data(){
        return{
            domain:configHelper.domain,
            id:this.$route.params.id,
            book:[],
            quantity:1,
        }
    },
    mounted(){
        axios.get(configHelper.domain+'/api/books/'+this.id)
            .then(res=>{
                console.log(res.data)
                this.book = res.data
            })
    },
    methods:{
        addCartItem(bookId){
            let cartItem = {
            "book":bookId,
            "cart":this.cart,
            "quantity":this.quantity
            }
            axios.post(configHelper.domain+'/cartItems/add',cartItem)
                .then(res=>{
                console.log(res)
                })
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
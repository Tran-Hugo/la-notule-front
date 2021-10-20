<template>
  <body class="d-flex align-items-center flex-column">
      <h1>this is the homepage</h1>
      <div class="d-flex flex-wrap justify-content-center">
          <div v-for="(book,key) in books" :key='key' class="card m-3" style="width: 18rem;">
            <img :src="this.domain+book.fileUrl" class="card-img-top h-50" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{book.title}}</h5>
              <p class="card-text">{{book.author}}</p>
              <p class="card-text">{{book.description}}</p>
              <p class="card-text">{{book.price}}€</p>
              <label v-if="book.quantity !==0" for="">quantité</label>
              <br v-if="book.quantity !==0">
              <input v-if="book.quantity !==0" class="col-2 mb-2" type="number" v-model="quantity" min="0">
              <br v-if="book.quantity !==0">
              <button @click="addCartItem(book.id)" v-if="book.quantity !==0" class="btn btn-primary">Ajouter au panier</button>
              <p class="text-danger" v-else>rupture de stock</p>
            </div>
          </div>
      </div>
      
  </body>
</template>

<script>
import axios from 'axios'
import configHelper from '../helpers/configHeader'
import {mapGetters} from 'vuex'


export default {
  name:'home',
  data(){
    return {
      domain:configHelper.domain,
      books:[],
      quantity:1,
    }
  },
  mounted(){
    axios.get(configHelper.domain+'/api/books')
        .then(res=>{
          console.log(res.data['hydra:member'])
          this.books = res.data['hydra:member']
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
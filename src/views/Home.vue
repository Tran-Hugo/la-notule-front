<template>
  <body class="d-flex align-items-center flex-column">
      <h1>Votre librairie vous présente</h1>
      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Catégories
      </button>
      <br>
      <div class="collapse" id="collapseExample">
          <router-link v-for="(cat,key) in Categories" :key='key'  :to="{ name: 'category', params: { id: cat.id }}">
            <span class="badge bg-primary rounded-pill me-2">{{cat.name}}</span>
          </router-link>
      </div>
      <div class="d-flex justify-content-end col-12">
          <form class="d-flex" @submit.prevent="search">
            <input class="form-control me-2" type="search" placeholder="Search" v-model="searched" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
      </div>
      <div class="d-flex flex-wrap justify-content-center">
          <div v-for="(book,key) in books" :key='key' class="card m-3" style="width: 18rem;">
            <router-link class="card-img-top h-50" v-if="book.fileUrl == null" :to="{ name: 'book', params: { id: book.id }}">
              <img :src="this.domain+'/images/no-image.jpg'" class="card-img-top h-100" alt="...">
              </router-link>
            <router-link class="card-img-top h-50" v-else :to="{ name: 'book', params: { id: book.id }}">
              <img :src="this.domain+book.fileUrl" class="card-img-top h-100" alt="...">
            </router-link>
            <div class="card-body">
              <router-link :to="{ name: 'book', params: { id: book.id }}">
                <h5 class="card-title">{{book.title}}</h5>
              </router-link>
              <p class="card-text">{{book.author}}</p>
              <p class="card-text">{{book.description}}</p>
              <p class="card-text">{{book.price}}€</p>
              <label v-if="book.quantity !==0" for="">quantité</label>
              <br v-if="book.quantity !==0">
              <input v-if="book.quantity !==0" class="col-2 mb-2" type="number" v-model="quantity" min="0">
              <br v-if="book.quantity !==0">
              <button @click="addCartItem(book.id)" v-if="book.quantity !==0" class="btn btn-primary"><i class="fas fa-cart-plus"></i>Ajouter au panier</button>
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
      Categories:[],
      books:[],
      quantity:1,
      searched:"",
    }
  },
  mounted(){
    axios.get(configHelper.domain+"/api/categories")
        .then(data => {
            this.Categories = data.data['hydra:member']
        })
    axios.get(configHelper.domain+'/api/books')
        .then(res=>{
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
    },
    search(){
      let search = {
        "search": this.searched
      }
      axios.post(configHelper.domain+'/api/books/search',search)
          .then(res=>{
            console.log(res.data)
            this.books = res.data
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
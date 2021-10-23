<template>
  <h1>Catégorie {{category.name}}</h1>
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
</template>

<script>
import axios from 'axios'
import configHelper from '../helpers/configHeader.js'

export default {
    name:'Category',
    data(){
        return{
            domain:configHelper.domain,
            id:this.$route.params.id,
            category:[],
            books:[],
            quantity:1,
        }
    },
    mounted(){
        axios.get(configHelper.domain+"/api/categories/"+this.id)
            .then((res)=>{
                console.log(res.data.books)
                this.category=res.data
                this.books = res.data.books
            })
    },
}
</script>

<style>

</style>
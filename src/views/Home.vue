<template>
<div class="corps">
  <div class="d-flex align-items-center flex-column">
    <div class="banniere">
      <img class="col-12" src="@/assets/typewriter.jpg" alt="typewriter.jpg">
      <h1 class="accroche col-12 text-center">Découvrez des milliers d'oeuvres littéraires</h1>
    </div>
      <div class="d-flex justify-content-center col-12 mt-3">
          <form class="d-flex" @submit.prevent="search">
            <input class="form-control me-2" type="search" placeholder="Rechercher" v-model="searched" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Rechercher</button>
          </form>
      </div>
      <div class="col-12 mt-3 d-flex flex-nowrap tagsContainer">
          <router-link class="ms-1" v-for="(cat,key) in Categories" :key='key'  :to="{ name: 'category', params: { id: cat.id }}">
            <span class="badge rounded-pill me-2">{{cat.name}}</span>
          </router-link>
      </div>
      <div class="col-12" v-for="(cat,key) in categoriesSorted" :key="key">
        <div v-if="cat.books.length!==0">
          <h3 class='mt-3'>{{cat.name}}</h3>
          <div class="col-12 cardContainer d-flex justify-content-between flex-nowrap mb-3">
              <card @add-cartitem="addCartItem" class="me-3 ms-3" v-for="(book,key) in cat.books" :key="key" :stock="book.quantity" :lien="book.fileUrl" :titre="book.title" :auteur="book.author" :description="book.description" :prix="book.price" :bookId="book.id"/>
          </div>
        </div>
      </div>
      
      
  </div>
</div>
  
</template>

<script>
import axios from 'axios'
import configHelper from '../helpers/configHeader'
import {mapGetters} from 'vuex'
import card from '@/components/card.vue'

export default {
  name:'home',
  components:{
        card,
    },
  data(){
    return {
      domain:configHelper.domain,
      Categories:[],
      categoriesSorted:[],
      books:[],
      quantity:1,
      searched:"",
    }
  },
  mounted(){
    axios.get(configHelper.domain+"/api/categoriesLimited")
        .then(data => {
            this.Categories = data.data['hydra:member'];
            data.data['hydra:member'].forEach(cat=>{
            if(cat.books.length !==0){
            this.categoriesSorted.push(cat)
          }
        })
        })
  },
  methods:{
    addCartItem(bookId,quantity){
        let cartItem = {
          "book":bookId,
          "cart":this.cart,
          "quantity":quantity
        }
        console.log(cartItem)
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
.corps{
  background-color: #FFF3DD;
}
.tagsContainer{
  overflow-x: scroll;
  max-width: 100vw;
}
.badge{
  background-color: #03989E;
}
.cardContainer{
  overflow-x: scroll;
  max-width: 100vw;
}
.accroche{
  background-color: rgba(245, 222, 179, 0.58);
  position: absolute;
  bottom: -0.5rem;
}
.banniere{
  position: relative;
}
</style>
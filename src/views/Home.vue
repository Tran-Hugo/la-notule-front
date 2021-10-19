<template>
  <body>
      <h1>this is the homepage</h1>
      <div v-for="(book,key) in books" :key='key' class="card" style="width: 18rem;">
        <img :src="this.domain+book.fileUrl" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{book.title}}</h5>
          <p class="card-text">{{book.author}}</p>
          <p class="card-text">{{book.description}}</p>
          <p class="card-text">{{book.price}}€</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
  </body>
</template>

<script>
import axios from 'axios'
import configHelper from '../helpers/configHeader'
export default {
  name:'home',
  data(){
    return {
      domain:configHelper.domain,
      books:[],
    }
  },
  mounted(){
    axios.get(configHelper.domain+'/api/books')
        .then(res=>{
          console.log(res.data['hydra:member'])
          this.books = res.data['hydra:member']
        })
  }
}
</script>

<style>

</style>
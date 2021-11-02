<template>
  <div class="cardItem d-flex flex-column">
      <router-link v-if="lien == null" :to="{ name: 'book', params: { id: bookId }}">
        <img :src="this.domain+'/images/no-image.jpg'" class="card-img-top h-100" alt="...">
      </router-link>
      <router-link v-else :to="{ name: 'book', params: { id: bookId }}">
        <img :src="this.domain+lien" class="col-12">
      </router-link>
      <router-link :to="{ name: 'book', params: { id: bookId }}">
        <h4 class="text-center">{{titre}}</h4>
      </router-link>
      <p>Auteur : {{auteur}}</p>
      <p class="d-none d-lg-block">description : {{description}}</p>
      <p>prix : {{prix}}€</p>
      <div>
        <label v-if="stock !==0" for="">quantité :</label>
        <input v-if="stock !==0" class="col-2 mb-2 text-center" type="number" v-model="quantity" min="0"> 
      </div>
      <button v-if="stock !==0" @click="addToCart(bookId,this.quantity)" class="col-8 align-self-center mb-2" >Ajouter au panier <i class="fas fa-cart-plus"></i></button>
      <p class="text-danger" v-else>rupture de stock</p>
  </div>
</template>

<script>
import configHelper from '../helpers/configHeader'

export default {
    name:'card',
    data(){
        return {
            domain:configHelper.domain,
            quantity:1,
        }
    },
    props:{
        lien:String,
        titre:String,
        auteur:String,
        description:String,
        prix:Number,
        bookId:Number,
        stock:Number,
    },
    methods:{
        addToCart(id,quantity){
            this.$emit('add-cartitem', id,quantity)
        }
    },
}
</script>

<style scoped>
img{
    height: 50%;
    min-height: 12rem;
    max-height: 12rem;
    border-radius: 5px 5px 0px 0px;
}
.cardItem{
    background-color: #F5DEB3;
    min-width: 15rem;
    margin-top: 1vh;
    border-radius: 5px;
    max-width: 15rem;
}
h4{
    font-size: 1.1rem;
}
p{
    text-align: center;
    margin-bottom: 0.3em;
}
label{
    margin-left: 4rem;
}
button{
    background-color: #03989E;
    color:white;
    font-size: 0.8em;
    border-radius: 15px;
    height: 2rem;
    border:none;
}
a{
    text-decoration: none;
    color:black;
}

@media screen and (min-width: 768px) {

}
</style>
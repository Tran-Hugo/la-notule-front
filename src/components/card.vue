<template>
  <div class="card">
      <img v-if="lien == null" :src="this.domain+'/images/no-image.jpg'" class="card-img-top h-100" alt="...">
      <img v-else :src="this.domain+lien" class="col-12">
      <h4 class="text-center">{{titre}}</h4>
      <p>Auteur : {{auteur}}</p>
      <p>description : {{description}}</p>
      <p>prix : {{prix}}€</p>
      <button @click="addToCart(bookId,this.quantity)" class="btn btn-primary btn-sm"><i class="fas fa-cart-plus"></i>Ajouter au panier</button>
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
    min-height: 25vh;
    max-height: 25vh;
    border-radius: 5px 5px 0px 0px;
}
.card{
    background-color: #F5DEB3;
    height: 49vh;
    max-height: 50vh;
    min-width: 60vw;
    margin-top: 1vh;
    border-radius: 5px;
}
p{
    text-align: center;
}
</style>
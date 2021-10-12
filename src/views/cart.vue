<template>
  <div class="home">
    
    
    <ul v-for="(item,key) in cartItems" :key="key" class="list-group list-group-flush">
  <li class="list-group-item">{{item['book']['title']}}  <span class="badge bg-primary rounded-pill">{{item.quantity}}</span></li>
</ul>
<br>
<h4>Total de votre panier {{total}}€</h4>
<button type="button" @click="removeCart" class="btn btn-danger me-2">Vider le panier</button>
<router-link to="/payment"><button type="button" class="btn btn-primary">Valider le panier</button></router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'cart',
  data(){
    return {
      cartItems:[],
      total:''
    }
  },
  mounted(){
    axios.get("https://127.0.0.1:8000/api/carts/1")
        .then(data => {
          console.log(data.data);
          this.cartItems = data.data.cartItems
          this.total = data.data.total
        })
  },
  methods:{
    removeCart(){
      this.cartItems.forEach((item) => {
  console.log(item.id) //value
      axios.delete("https://127.0.0.1:8000/api/cart_items/"+item.id)
          .then(res=>{console.log(res,'OK')})
})
    },
  }
}
</script>

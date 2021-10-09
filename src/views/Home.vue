<template>
  <div class="home">
    
    
    <ul v-for="(item,key) in cartItems" :key="key" class="list-group list-group-flush">
  <li class="list-group-item">{{item['book']['title']}}  <span class="badge bg-primary rounded-pill">{{item.quantity}}</span></li>
</ul>
<button type="button" @click="removeCart" class="btn btn-danger">Vider le panier</button>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Home',
  data(){
    return {
      cartItems:[]
    }
  },
  mounted(){
    axios.get("https://127.0.0.1:8000/api/carts/1")
        .then(data => {
          console.log(data.data);
          this.cartItems = data.data.cartItems
        })
  },
  methods:{
    removeCart(){
      this.cartItems.forEach((item) => {
  console.log(item.id) //value
      axios.delete("https://127.0.0.1:8000/api/cart_items/"+item.id)
          .then(res=>{console.log(res,'OK')})
})
    }
  }
}
</script>

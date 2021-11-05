<template>
  <div class="m-3 principale">
    <h4 v-if="cartItems.length == 0">Votre panier est vide</h4>
    <div
      v-for="(item, key) in cartItems"
      :key="key"
      
    >
      <div class="d-flex flex-column p-3">
        <img :src="this.domain+item['book']['fileUrl']" alt="">
        <p>{{ item["book"]["title"] }}
        <span class="badge bg-primary rounded-pill me-2">
          {{ item.quantity }}
        </span></p>
        
        <div class="d-flex justify-content-between">
        <button
          type="button"
          @click="deleteCartItem(item.id)"
          class="btn btn-danger btn-sm me-2"
        >
          Supprimer
        </button>
        <div>
          <button
          type="button"
          @click="minusCartItem(item.id)"
          class="btn btn-danger btn-sm me-2 btn-plus-minus"
        >
          -
        </button>
        <button
          type="button"
          @click="plusCartItem(item.id)"
          class="btn btn-success btn-sm me-2 btn-plus-minus"
        >
          +
        </button>
        </div>
          
        </div>
        
      </div>
    </div>
    <br />
    <div class="p-3">
      <h5 v-if="cartItems.length !== 0">Total de votre panier {{ total }}€</h5>
    <div>
      <button
      v-if="cartItems.length !== 0"
      type="button"
      @click="removeCart"
      class="btn btn-danger me-2"
    >
      Vider le panier
    </button>
    <router-link v-if="cartItems.length !== 0" to="/payment"
      ><button type="button" class="btn btn-primary">
        Valider le panier
      </button></router-link
    >
    </div>
    </div>
    
    
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { mapGetters } from "vuex";
import configHelper from "../../helpers/configHeader.js";

export default {
  name: "cart",
  data() {
    return {
      cartItems: [],
      total: "",
      domain:configHelper.domain
    };
  },
  mounted() {
    const cart = async () => {
      const data = await axios.get(
        configHelper.domain + "/api/carts/" + this.cart,
        configHelper.config()
      );

      console.log(data.data);
      this.cartItems = data.data.cartItems;
      this.total = data.data.total;
    };

    cart();
  },
  methods: {
    removeCart() {
      this.cartItems.forEach((item) => {
        console.log(item.id); //value
        axios
          .delete(configHelper.domain + "/api/cart_items/" + item.id)
          .then((res) => {
            console.log(res, "OK");
            axios
              .get(
                configHelper.domain + "/api/carts/" + this.cart,
                configHelper.config()
              )
              .then((data) => {
                if (data.data.cartItems.length == 0) {
                  this.$router.go();
                }
              });
          });
      });
      let resetTotal = {
        total: 0,
      };
      const config = {
        headers: {
          "content-type": "application/merge-patch+json",
        },
      };
      axios.patch(
        configHelper.domain + "/api/carts/" + this.cart,
        resetTotal,
        config
      );
    },
    async minusCartItem(id) {
      let cartItemId = {
        cartItemId: id,
      };
      await axios.post(configHelper.domain + "/cartItems/minus", cartItemId);

      const data = await axios.get(
        configHelper.domain + "/api/carts/" + this.cart,
        configHelper.config()
      );
      console.log(data.data);
      this.cartItems = data.data.cartItems;
      this.total = data.data.total;
    },
    async plusCartItem(id) {
      let cartItemId = {
        cartItemId: id,
      };
      await axios.post(configHelper.domain + "/cartItems/plus", cartItemId);

      const data = await axios.get(
        configHelper.domain + "/api/carts/" + this.cart,
        configHelper.config()
      );
      console.log(data.data);
      this.cartItems = data.data.cartItems;
      this.total = data.data.total;

      // this.$router.go()
    },
    async deleteCartItem(id) {
      await axios.delete(configHelper.domain + "/cartItems/delete/" + id);
      const data = await axios.get(
        configHelper.domain + "/api/carts/" + this.cart,
        configHelper.config()
      );
      console.log(data.data);
      this.cartItems = data.data.cartItems;
      this.total = data.data.total;
    },
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
    }),
  },
};
</script>

<style scoped>
.principale{
  border: 1px solid wheat;
  padding: 1rem;
}
img{
  height: 15rem;
  width: 10rem;
  margin: auto;
}
p{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-plus-minus{
  padding:0.2rem 0.7rem;
}
.btn{
  font-size: .85rem;
}
</style>

<template>
  <main>
    <div class="m-3 principale d-flex flex-column justify-content-center">
      <div
        v-if="cartItems.length == 0"
        class="d-flex justify-content-center align-items-center"
      >
        <h4>Votre panier est vide</h4>
      </div>
      <div v-else v-for="(item, key) in cartItems" :key="key">
        <div class="d-flex flex-column flex-md-row p-3">
          <router-link
            class="book-link col-md-6"
            :to="{ name: 'book', params: { id: item.book.id } }"
            ><img :src="this.domain + item['book']['fileUrl']" alt=""
          /></router-link>
          <div class="d-flex flex-column justify-content-center col-md-6">
            <router-link
            class="link"
            :to="{ name: 'book', params: { id: item.book.id } }"
            ><p>
              {{ item["book"]["title"] }}
              <span class="badge bg-primary rounded-pill me-2">
                {{ item.quantity }} </span
              ><span>{{ item["book"]["price"] }}€</span>
            </p></router-link>

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
                  class="btn btn-minus btn-sm me-2 btn-plus-minus"
                >
                  -
                </button>
                <button
                  type="button"
                  @click="plusCartItem(item.id)"
                  class="btn btn-plus btn-sm me-2 btn-plus-minus"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="cartItems.length !== 0"
        class="p-3 d-flex flex-column align-items-center"
      >
        <h5 v-if="cartItems.length !== 0">
          Total de votre panier {{ total }}€
        </h5>
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
            ><button type="button" class="btn btn-plus">
              Valider le panier
            </button></router-link
          >
        </div>
      </div>
    </div>
  </main>
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
      domain: configHelper.domain,
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
                  this.cartItems = data.data.cartItems;
                  this.total = data.data.total;
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
.principale {
  border: 1px solid wheat;
  padding: 1rem;
  min-height: 25rem;
}
.book-link {
  margin: auto;
}
img {
  height: 15rem;
  width: 10rem;
}
.link{
  text-decoration: none;
  color: black;
}
p {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-plus-minus {
  padding: 0.2rem 0.7rem;
}
.btn {
  font-size: 0.85rem;
}
.btn-danger{
  background-color: #EC465A !important;
  color: white;
}
.btn-minus{
  background-color: #F97068;
  color: white;
}
.btn-plus{
  background-color: #12BA9E;
  color: white;
}
@media screen and (min-width: 768px) {
  .principale {
    min-height: 41rem;
  }
}
@media screen and (min-width: 992px) {
  main {
    padding-top: 13vh;
  }
}
</style>

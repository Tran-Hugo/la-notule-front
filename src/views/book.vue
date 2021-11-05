<template>
  <main class="d-flex justify-content-center d-lg-block mt-3">
    <div class="d-flex flex-column justify-content-around flex-lg-row col-12">
      <img
        v-if="book.fileUrl == null"
        class="col-12 col-md-6 col-lg-3 align-self-md-center"
        :src="this.domain + '/images/no-image.jpg'"
        alt="..."
      />
      <img
        v-else
        class="col-12 col-md-6 col-lg-3 align-self-md-center"
        :src="domain + book.fileUrl"
        alt=""
      />
      <div class="d-flex flex-column mt-3 ps-3 col-12 col-lg-6">
        <h1>{{ book.title }}</h1>
        <br class="border-bottom" />
        <p>de : {{ book.author }}</p>
        <p>
          Catégories :
          <router-link
            v-for="(cat, key) in book.category"
            :key="key"
            :to="{ name: 'category', params: { id: cat.id } }"
            ><span class="badge rounded-pill me-2"
              >{{ cat.name }}
            </span></router-link
          >
        </p>
        <p class="d-lg-none">Description : {{ book.description }}</p>
        <p v-if="book.quantity < 3" class="text-danger">
          en stock : {{ book.quantity }}
        </p>
        <p v-else>en stock : {{ book.quantity }}</p>
        <p>Prix : {{ book.price }}€</p>
        <div>
          <label v-if="book.quantity !== 0" for="">quantité :</label>
          <input
            v-if="book.quantity !== 0"
            class="col-1 mb-2 align-self-center"
            type="number"
            v-model="quantity"
            :max="book.quantity"
            min="0"
          />
        </div>
        <button
          class="col-6 align-self-center"
          @click="addCartItem(book.id)"
          v-if="book.quantity !== 0"
        >
          <i class="fas fa-cart-plus"></i> Ajouter au panier
        </button>
        <p class="text-danger" v-else>rupture de stock</p>
      </div>
    </div>
    <p class="d-none d-lg-block pt-4">Description :</p>
    <p class="d-none d-lg-block ps-4">{{ book.description }}</p>
  </main>
</template>

<script>
import axios from "axios";
import configHelper from "../helpers/configHeader.js";
import { mapGetters } from "vuex";

export default {
  name: "Book",
  data() {
    return {
      domain: configHelper.domain,
      id: this.$route.params.id,
      book: [],
      quantity: 1,
    };
  },
  mounted() {
    axios.get(configHelper.domain + "/api/books/" + this.id).then((res) => {
      console.log(res.data);
      this.book = res.data;
    });
  },
  methods: {
    addCartItem(bookId) {
      let cartItem = {
        book: bookId,
        cart: this.cart,
        quantity: this.quantity,
      };
      axios
        .post(configHelper.domain + "/cartItems/add", cartItem)
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            alert("Article ajouté au panier");
          }
        });
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
img {
  min-height: 30rem;
  max-height: 30rem;
}

button {
  background-color: #03989e;
  color: white;
  font-size: 0.8em;
  border-radius: 15px;
  height: 2rem;
  border: none;
}

.badge {
  background-color: #03989e;
}
@media screen and (min-width: 992px) {
  img {
    min-height: 27rem;
    max-height: 30rem;
  }
}
</style>

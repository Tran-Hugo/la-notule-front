<template>
  <div class="cardItem d-flex flex-column flex-lg-row">
    <div>
      <router-link
        v-if="lien == null"
        :to="{ name: 'book', params: { id: bookId } }"
      >
        <img
          :src="this.domain + '/images/no-image.jpg'"
          class="card-img-top h-100"
          alt="..."
        />
      </router-link>
      <router-link v-else :to="{ name: 'book', params: { id: bookId } }">
        <img :src="this.domain + lien" class="col-12" />
      </router-link>
    </div>
    <div
      class="d-flex justify-content-center justify-content-lg-around flex-column"
    >
      <router-link :to="{ name: 'book', params: { id: bookId } }">
        <h4 v-if="titre.length > 21" class="text-center">
          {{ titre.substring(0, 21) }}...
        </h4>
        <h4 v-else class="text-center">{{ titre }}</h4>
      </router-link>
      <p v-if="auteur.length > 15">
        Auteurs : {{ auteur.substring(0, 15) }}...
      </p>
      <p v-else>Auteurs : {{ auteur }}</p>
      <p>prix : {{ prix }}€</p>
      <div>
        <label v-if="stock !== 0" for="">quantité :</label>
        <input
          v-if="stock !== 0"
          class="col-2 mb-2 text-center"
          type="number"
          v-model="quantity"
          min="0"
        />
      </div>
      <p v-if="stock !== 0" class="text-success">En Stock</p>
      <button
        v-if="stock !== 0"
        @click="addToCart(bookId, this.quantity)"
        class="col-8 align-self-center mb-2"
      >
        Ajouter au panier <i class="fas fa-cart-plus"></i>
      </button>
      <p class="text-danger" v-else>rupture de stock</p>
    </div>
  </div>
</template>

<script>
import configHelper from "../helpers/configHeader";

export default {
  name: "card",
  data() {
    return {
      domain: configHelper.domain,
      quantity: 1,
    };
  },
  props: {
    lien: String,
    titre: String,
    auteur: String,
    description: String,
    prix: Number,
    bookId: Number,
    stock: Number,
  },
  methods: {
    addToCart(id, quantity) {
      this.$emit("add-cartitem", id, quantity);
    },
  },
};
</script>

<style scoped>
img {
  height: 100%;
  min-height: 15rem;
  max-height: 15rem;
  border-radius: 5px 5px 0px 0px;
}
.cardItem {
  background-color: #f5deb3;
  min-width: 15rem;
  margin-top: 1vh;
  border-radius: 5px;
  max-width: 15rem;
}
h4 {
  font-size: 1.1rem;
}
p {
  text-align: center;
  margin-bottom: 0.3em;
}
label {
  margin-left: 4rem;
}
button {
  background-color: #03989e;
  color: white;
  font-size: 0.8em;
  border-radius: 15px;
  height: 2rem;
  border: none;
}
a {
  text-decoration: none;
  color: black;
}

@media screen and (min-width: 992px) {
  a:hover {
    color: black;
  }
  img {
    max-height: unset;
    max-width: 15rem;
    width: 10rem;
  }
  .cardItem {
    min-width: 23rem;
    max-width: 23rem;
    transition: all 0.25s ease-in-out;
  }
  .cardItem:hover {
    position: relative;
    top: -0.3vh;
    box-shadow: 20px 15px 31px -18px rgba(0, 0, 0, 0.75);
  }
  h4 {
    font-weight: bold;
  }
}
</style>

<template>
  <main class="mb-3">
    <div class="principale">
      <h1 class="text-center">Catégorie {{ this.category }}</h1>
      <div class="d-flex flex-wrap justify-content-center">
        <Card
          @add-cartitem="addCartItem"
          class="mx-3"
          v-for="(book, key) in books"
          :key="key"
          :stock="book.quantity"
          :lien="book.fileUrl"
          :titre="book.title"
          :auteur="book.author"
          :description="book.description"
          :prix="book.price"
          :bookId="book.id"
        />
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import configHelper from "../helpers/configHeader.js";
import Card from "../components/card.vue";
import { mapGetters } from "vuex";

export default {
  name: "Category",
  components: {
    Card,
  },
  data() {
    return {
      domain: configHelper.domain,
      id: this.$route.params.id,
      category: null,
      books: [],
      quantity: 1,
    };
  },
  mounted() {
    axios
      .get(configHelper.domain + "/api/categories/" + this.id)
      .then((res) => {
        console.log(res.data.books);
        this.category = res.data.name;
        this.books = res.data.books;
      });
  },
  watch: {
    "$route.params.id": function() {
      if (this.$route.params.id !== undefined) {
        axios
          .get(configHelper.domain + "/api/categories/" + this.$route.params.id)
          .then((res) => {
            console.log(res.data.books);
            this.category = res.data.name;
            this.books = res.data.books;
          });
      }
    },
  },
  methods: {
    addCartItem(bookId, quantity) {
      let cartItem = {
        book: bookId,
        cart: this.cart,
        quantity: quantity,
      };
      console.log(cartItem);
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
.principale {
  min-height: 25rem;
}

@media screen and (min-width: 768px) {
  .principale {
    min-height: 41rem;
  }
}
@media screen and (min-width: 992px) {
  .principale {
    min-height: 50rem;
  }
}
</style>

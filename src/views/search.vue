<template>
  <main class="mb-3">
    <div class="principale">
      <h1 class="text-center">
        Résultats de votre recherche : "{{ this.$route.params.search }}"
      </h1>
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
import configHelper from "../helpers/configHeader";
import Card from "../components/card.vue";
import { mapGetters } from "vuex";

export default {
  name: "search",
  components: {
    Card,
  },
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    this.research();
  },
  methods: {
    async research() {
      let searched = {
        search: this.$route.params.search,
      };
      let data = await axios.post(
        configHelper.domain + "/api/books/search",
        searched
      );
      this.books = data.data;
    },
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
              alert("Article ajouté à votre panier");
            }
        });
    },
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
    }),
  },
  watch: {
    "$route.params.search": async function() {
      if (this.$route.params.search !== undefined) {
        let searched = {
          search: this.$route.params.search,
        };
        let data = await axios.post(
          configHelper.domain + "/api/books/search",
          searched
        );
        this.books = data.data;
      }
    },
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

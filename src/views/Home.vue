<template>
  <main class="corps">
    <div class="d-flex align-items-center flex-column">
      <div class="banniere col-12">
        <img
          class="col-12"
          src="@/assets/typewriter.jpg"
          alt="typewriter.jpg"
        />
        <h1 class="accroche col-12 text-center">
          Découvrez des milliers d'oeuvres littéraires
        </h1>
      </div>
      <div
        class="d-flex search-div justify-content-center justify-content-lg-start mt-3"
      >
        <form class="d-flex" @submit.prevent="search(this.searched)">
          <input
            class="form-control"
            type="search"
            placeholder="Rechercher"
            v-model="searched"
            aria-label="Search"
          />
          <button class="bouton-recherche" type="submit">Rechercher</button>
        </form>
      </div>
      <div class="col-12 mt-3 d-flex scrollbar flex-nowrap tagsContainer">
        <router-link
          class="ms-1 mb-1"
          v-for="(cat, key) in Categories"
          :key="key"
          :to="{ name: 'category', params: { id: cat.id } }"
        >
          <span class="badge rounded-pill me-2">{{ cat.name }}</span>
        </router-link>
      </div>
      <div
        class="col-12 cat-rows"
        v-for="(cat, key) in categoriesSorted"
        :key="key"
      >
        <div v-if="cat.books.length !== 0">
          <h3 class="mt-3">{{ cat.name }}</h3>
          <div
            class=" scrollbar cardContainer d-flex justify-content-between flex-nowrap mb-3"
          >
            <card
              @add-cartitem="addCartItem"
              class="me-3 mb-2 ms-3"
              v-for="(book, key) in cat.books"
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
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import configHelper from "../helpers/configHeader";
import { mapGetters } from "vuex";
import card from "@/components/card.vue";

export default {
  name: "home",
  components: {
    card,
  },
  data() {
    return {
      domain: configHelper.domain,
      Categories: [],
      categoriesSorted: [],
      books: [],
      quantity: 1,
      searched: "",
    };
  },
  mounted() {
    axios.get(configHelper.domain + "/api/categoriesLimited").then((data) => {
      this.Categories = data.data["hydra:member"];
      data.data["hydra:member"].forEach((cat) => {
        if (cat.books.length !== 0) {
          this.categoriesSorted.push(cat);
        }
      });
    });
  },
  methods: {
    addCartItem(bookId, quantity) {
      if(this.cart == ''){
        alert('Veuillez vous connecter')
      } else {
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
      }
      
    },
    search(searched) {
      this.$router.push({ name: "search", params: { search: searched } });
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
.corps {
  background-color: #fff3dd;
}
.tagsContainer {
  overflow-x: scroll;
  max-width: 100vw;
}
.badge {
  background-color: #03989e;
}
.cardContainer {
  overflow-x: scroll;
  max-width: 100vw;
}
.accroche {
  background-color: rgba(245, 222, 179, 0.58);
  position: absolute;
  bottom: -0.5rem;
}
.banniere {
  position: relative;
}
.banniere img {
  height: 10rem;
  object-fit: cover;
  object-position: center top;
}
.form-control {
  font-size: 1em;
  border-radius: 5px 0 0 5px;
}
.bouton-recherche {
  border: none;
  background-color: #03989e;
  color: white;
  font-size: 0.8em;
  border-radius: 0 5px 5px 0;
}

@media screen and (min-width: 768px) {
  .banniere img {
    height: 15rem;
  }
  .accroche {
    padding: 1rem 0;
    font-size: 1.5rem;
  }

  .badge {
    font-size: 1rem;
  }
  h3 {
    font-size: 1.5rem;
  }
}
@media screen and (min-width: 992px) {
  .banniere img {
    height: 25rem;
  }
  .search-div {
    margin-left: 2rem;
    align-self: start;
  }
  .tagsContainer {
    max-width: 78.9vw; /** évite le débordement en format desktop*/
  }
  .badge {
    font-size: 0.75em;
  }
  .cardContainer {
    max-width: 78.9vw; /** évite le débordement en format desktop*/
  }
  .scrollbar::-webkit-scrollbar {
    height: 0.3em;
    max-width: 4em;
  }
  .scrollbar::-webkit-scrollbar-thumb {
    background: #03989e;
    border-radius: 1em;
  }
}
</style>

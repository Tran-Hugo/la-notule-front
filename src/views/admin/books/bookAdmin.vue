<template>
  <h4 class="text-center p-2">Livres</h4>
  <div class="d-flex justify-content-end col-12">
    <router-link :to="{ name: 'addBook' }"
      ><button type="button" class="btn btn-turquoise me-2">
        Ajouter un livre
      </button></router-link
    >
  </div>
  <br />
  <div class="d-flex justify-content-end col-12">
    <form class="d-flex" @submit.prevent="search">
      <input
        class="form-control"
        type="search"
        placeholder="Rechercher"
        v-model="searched"
        aria-label="Search"
      />
      <button class="btn btn-pastel-green me-2" type="submit">
        Rechercher
      </button>
    </form>
  </div>
  <br />
  <p class="d-md-none text-end text-primary">
    glissez le tableau vers la droite ! <i class="fas fa-arrow-right"></i>
  </p>
  <div class="d-flex justify-content-center">
    <div class="overflow-hidden d-flex justify-content-center">
      <div class="col-10 overflow-auto">
        <table class="table">
          <br />

          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Catégories</th>
              <th scope="col">Quantité</th>
              <th scope="col">Prix</th>
              <th scope="col">Gérer</th>
            </tr>
          </thead>
          <tbody v-for="(book, index) in books" :key="index">
            <tr>
              <th scope="row">{{ book.id }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>
                <span v-for="(cat, key) in book.category" :key="key"
                  >{{ cat.name }},
                </span>
              </td>
              <td>{{ book.quantity }}</td>
              <td>{{ book.price }}€</td>
              <td>
                <router-link :to="{ name: 'book', params: { id: book.id } }">
                  <button type="button" class="btn btn-pastel-green me-2">
                    voir
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'editBook', params: { id: book.id } }"
                >
                  <button type="button" class="btn btn-pastel-yellow me-2">
                    éditer
                  </button>
                </router-link>
                <button
                  type="button"
                  @click="remove(book.id)"
                  class="btn btn-pastel-red me-2"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import configHelper from "../../../helpers/configHeader.js";

export default {
  name: "bookAdmin",
  data() {
    return {
      books: [],
      searched: "",
    };
  },
  mounted() {
    axios.get(configHelper.domain + "/api/books").then((res) => {
      console.log(res.data["hydra:member"]);
      this.books = res.data["hydra:member"];
    });
  },
  methods: {
    remove(id) {
      axios
        .delete(configHelper.domain + "/api/books/" + id, configHelper.config())
        .then((res) => {
          if (res.status == 204) {
            axios.get(configHelper.domain + "/api/books").then((res) => {
              console.log(res.data["hydra:member"]);
              this.books = res.data["hydra:member"];
            });
          }
        });
    },
    search() {
      let search = {
        search: this.searched,
      };
      axios
        .post(configHelper.domain + "/api/books/search", search)
        .then((res) => {
          console.log(res.data);
          this.books = res.data;
        });
    },
  },
};
</script>

<style scoped>
@import "../../../assets/css/btn-colors.css";
</style>

<template>
  <div class="d-flex justify-content-center">
    <form class="col-10 col-lg-8" @submit.prevent="addBook">
      <div class="mb-3">
        <label class="form-label">Titre</label>
        <input type="text" v-model="title" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Auteur</label>
        <input type="text" v-model="author" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea class="form-control" v-model="description"></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Prix</label>
        <input type="number" v-model="price" class="form-control" step="0.01" />
      </div>
      <div class="mb-3">
        <label class="form-label">Quantité</label>
        <input type="number" v-model="quantity" class="form-control" />
      </div>
      <div class="mb-3">
        <div class="d-flex justify-content-center">
          <button
            class="btn btn-pastel-pink"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Catégories
          </button>
        </div>

        <div class="collapse mt-2" id="collapseExample">
          <div class="card card-body d-flex">
            <div
              class="d-flex justify-content-center"
              v-for="(cat, index) in Categories"
              :key="index"
            >
              <label class="form-check-label me-3" for="flexCheckIndeterminate">
                {{ cat.name }}
              </label>
              <input
                type="checkbox"
                class="form-check-input mb-2"
                v-model="key"
                :value="cat['id']"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="url" id="preview" class="d-flex justify-content-center">
        <img :src="url" />
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">Image</label>
        <input
          class="form-control"
          @change="onFileChange"
          type="file"
          id="formFile"
        />
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-turquoise">Ajouter</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import configHelper from "../../../helpers/configHeader";

export default {
  name: "addBook",
  data() {
    return {
      Categories: [],
      title: "",
      author: "",
      description: "",
      price: "",
      quantity: "",
      key: [], //1 parce que v-model ignore le selected et met la valeur que l'on rentre ici comme selected
      url: null,
    };
  },
  mounted() {
    axios.get(configHelper.domain + "/api/categories").then((data) => {
      console.log(data.data["hydra:member"]);
      this.Categories = data.data["hydra:member"];
    });
  },
  methods: {
    addBook() {
      let files = document.querySelector("#formFile").files;
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("author", this.author);
      formData.append("description", this.description);
      formData.append("price", this.price);
      formData.append("quantity", this.quantity);
      for (var i = 0; i < this.key.length; i++) {
        formData.append("categories[]", this.key[i]);
      }
      formData.append("file", files[0]);

      axios
        .post(
          configHelper.domain + "/api/books/new",
          formData,
          configHelper.config()
        )
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            alert("Livre ajouté");
          }
        });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
  },
};
</script>

<style>
@import "../../../assets/css/btn-colors.css";
#preview img {
  max-width: 100%;
  max-height: 500px;
  border: 1px solid;
}
</style>

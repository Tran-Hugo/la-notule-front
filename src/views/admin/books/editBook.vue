<template>
  <div class="d-flex justify-content-center">
    <form class="col-10 col-lg-8" @submit.prevent="editBook(id)">
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
      <div class="mb-3">
        <div class="d-flex flex-column align-items-center">
          <label for="formFile" class="form-label">Image</label>
          <img
            v-if="fileUrl == null"
            :src="domain + '/images/no-image.jpg'"
            alt="..."
          />
          <img v-else :src="domain + fileUrl" alt="" />
          <div>
            <input
              class="form-check-input"
              type="checkbox"
              v-model="supprImg"
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Supprimer l'image
            </label>
          </div>
        </div>
        <div
          v-if="url"
          id="preview"
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <h5>nouvelle image</h5>
          <img :src="url" />
        </div>
        <br />
        <br />
        <input
          class="form-control"
          @change="onFileChange"
          type="file"
          id="formFile"
        />
      </div>

      <button type="submit" class="btn btn-primary">éditer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import configHelper from "../../../helpers/configHeader";

export default {
  name: "editBook",
  data() {
    return {
      Categories: [],
      title: "",
      author: "",
      description: "",
      price: "",
      quantity: "",
      key: [],
      supprImg: "false",
      domain: configHelper.domain,
      fileUrl: null,
      id: this.$route.params.id,
      url: null,
    };
  },
  mounted() {
    axios.get(configHelper.domain + "/api/categories").then((data) => {
      console.log(data.data["hydra:member"]);
      this.Categories = data.data["hydra:member"];
    });
    axios.get(configHelper.domain + "/api/books/" + this.id).then((res) => {
      console.log(res.data);
      this.title = res.data.title;
      this.author = res.data.author;
      this.description = res.data.description;
      this.price = res.data.price;
      this.quantity = res.data.quantity;
      this.fileUrl = res.data.fileUrl;
      res.data.category.forEach((element) => {
        this.key.push(element.id);
      });
    });
  },
  methods: {
    editBook(id) {
      let files = document.querySelector("#formFile").files;
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("author", this.author);
      formData.append("description", this.description);
      formData.append("price", this.price);
      for (var i = 0; i < this.key.length; i++) {
        formData.append("categories[]", this.key[i]);
      }
      formData.append("quantity", this.quantity);
      formData.append("supprImg", this.supprImg);
      formData.append("file", files[0]);

      axios
        .post(
          configHelper.domain + "/api/books/edit/" + id,
          formData,
          configHelper.config()
        )
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            alert("Livre édité");
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

<style scoped>
@import "../../../assets/css/btn-colors.css";
img {
  max-width: 100%;
  max-height: 500px;
  border: 1px solid;
}
</style>

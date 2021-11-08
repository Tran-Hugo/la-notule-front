<template>
  <div class="d-flex justify-content-center add-cat-container">
    <form class="col-6" @submit.prevent="editCategory">
      <div class="mb-3">
        <label class="form-label">Nom de la catégorie</label>
        <input type="text" v-model="name" class="form-control" />
      </div>
      <button type="submit" class="btn btn-turquoise">éditer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import configHelper from "../../../helpers/configHeader";

export default {
  name: "editCategory",
  data() {
    return {
      id: this.$route.params.id,
      name: "",
    };
  },
  mounted() {
    axios
      .get(configHelper.domain + "/api/categories/" + this.id)
      .then((res) => {
        this.name = res.data.name;
      });
  },
  methods: {
    editCategory() {
      let category = {
        name: this.name,
      };
      axios
        .put(
          configHelper.domain + "/api/categories/" + this.id,
          category,
          configHelper.config()
        )
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            alert("Catégorie éditée");
          }
        });
    },
  },
};
</script>

<style scoped>
@import "../../../assets/css/btn-colors.css";

@media screen and (min-width: 768px) {
  .add-cat-container {
    margin-top: 10rem;
  }
}
</style>

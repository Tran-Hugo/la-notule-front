<template>
  <main>
    <h1>Identifiant commande : {{ id }}</h1>
    <div
      class="mb-3 product"
      v-for="(product, key) in order.products"
      :key="key"
    >
      <div>
        <p class="card-text">{{ product.title }}</p>
        <p class="card-text">{{ product.price }}€</p>
        <p class="card-text">quantité : {{ product.quantity }}</p>
      </div>
      <div>
        <img :src="domain + product.fileUrl" alt="" />
      </div>
    </div>
    <h4>Total : {{ order.price }}€</h4>
  </main>
</template>

<script>
import axios from "axios";
import configHelper from "../helpers/configHeader.js";

export default {
  name: "order",
  data() {
    return {
      id: this.$route.params.id,
      order: [],
      domain: configHelper.domain,
    };
  },
  mounted() {
    axios
      .get(
        configHelper.domain + "/api/user/orders/" + this.id,
        configHelper.config()
      )
      .then((res) => {
        //    console.log('on est ici')
        this.order = res.data;
      })
      .catch((error) => {
        //    console.log(error.response.status)
        if (error.response.status === 403) {
          this.$router.push("/");
        }
      });
  },
};
</script>

<style scoped>
.product {
  background-color: white;
  padding: 1rem;
  border: 1px solid wheat;
  display: flex;
}
.product div img {
  max-width: 20vw;
}
</style>

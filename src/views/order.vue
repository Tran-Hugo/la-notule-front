<template>
  <main>
    <div class="principale">
    <h5 class="text-center">Identifiant commande : {{ id }}</h5>
    <div class="mb-3">
      <h4 class="titre">Adresse de livraison</h4>
      <div class="d-flex justify-content-center">
        <div class="adress col-10 col-md-8 col-lg-5">
          <p>{{user.firstname}} {{user.lastname}}</p>
          <p>{{user.adress}}</p>
        </div>
      </div>
    </div>
    <h4 class="titre">Produits</h4>
    <div class="d-flex flex-column align-items-center justify-content-center">
    <div
      class="mb-2 product col-10 col-md-8 col-lg-5"
      v-for="(product, key) in order.products"
      :key="key"
    >
      <div class="d-flex flex-column justify-content-center">
        <p class="card-text">{{ product.title }}</p>
        <p class="card-text">quantité : {{ product.quantity }}</p>
        <p class="card-text">{{ product.price }}€</p>
      </div>
      <div>
        <img v-if="product.fileUrl" :src="domain + product.fileUrl" alt="" />
        <img v-else :src="domain + '/images/no-image.jpg'" alt="" />
      </div>
    </div>
    </div>
    <h4 class="text-end col-10 total">Total : {{ order.price }}€</h4>
    </div>
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
      user:[],
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
        this.user = res.data.User;
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
.principale {
  min-height: 26rem;
  margin-top: 2rem;
}
.titre{
  margin-left: 1rem;
  margin-bottom: 1rem;
}
.adress{
  background-color: white;
  padding: 1rem;
  border: 1px solid wheat;
}
.product {
  background-color: white;
  padding: 1rem;
  border: 1px solid wheat;
  display: flex;
  justify-content: space-between;
}
.product div img {
  max-width: 20vw;
  min-height: 6rem;
  border: 2px solid wheat;
}
/* .total{
  text-decoration: underline #32abb0;
} */

@media screen and (min-width: 768px) {
  .principale {
    min-height: 41rem;
  }
  .titre{
    margin-left: 4rem;
    margin-bottom: 2rem;
  }
}

@media screen and (min-width: 992px) {
  .principale {
    min-height: 50rem;
  }
  .titre{
    margin-left: 10rem;
    margin-bottom: 2rem;
  }
  .product div img {
    max-width: 7vw;
    min-width: 7vw;
    min-height: 6rem;
    max-height: 12rem;
  }
}
</style>

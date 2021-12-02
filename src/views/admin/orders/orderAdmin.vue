<template>
  <h4 class="text-center p-2">Commandes</h4>
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
    <div class="overflow-hidden d-flex justify-content-center col-11">
      <div class="col-10 overflow-auto">
        <table class="table">
          <br />

          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Client</th>
              <th scope="col">Prix</th>
              <th scope="col">Gérer</th>
            </tr>
          </thead>
          <tbody v-for="(order, index) in orders" :key="index">
            <tr>
              <th scope="row">{{ order.id }}</th>
              <td>{{ order.User.email }}</td>
              <td>{{ order.price }}€</td>
              <td>
                <router-link :to="{ name: 'order', params: { id: order.id } }">
                  <button type="button" class="btn btn-pastel-green me-2">
                    Détails
                  </button>
                </router-link>
                <button
                  type="button"
                  @click="remove(order.id)"
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
  name: "ordersAdmin",
  data() {
    return {
      orders: [],
      searched: "",
    };
  },
  mounted() {
    axios
      .get(configHelper.domain + "/api/orders", configHelper.config())
      .then((res) => {
        console.log(res);
        this.orders = res.data["hydra:member"];
      });
  },
  methods: {
    remove(id) {
      axios
        .delete(
          configHelper.domain + "/api/orders/" + id,
          configHelper.config()
        )
        .then((res) => {
          if (res.status == 204) {
            axios
              .get(configHelper.domain + "/api/orders", configHelper.config())
              .then((res) => {
                console.log(res);
                this.orders = res.data["hydra:member"];
              });
          }
        });
    },
    search() {
      let search = {
        search: this.searched,
      };
      axios
        .post(
          configHelper.domain + "/api/search/order",
          search,
          configHelper.config()
        )
        .then((res) => {
          this.orders = res.data["hydra:member"];
        });
    },
  },
};
</script>

<style scoped>
@import "../../../assets/css/btn-colors.css";
</style>

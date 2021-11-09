<template>
  <div class="principale">
    <h1 class="text-center">Mes commandes</h1>
    <div class="d-flex justify-content-center">
      <div class="col-10 ">
        <table class="table">
          <br />

          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Client</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody v-for="(order, index) in orders" :key="index">
            <tr>
              <th scope="row">{{ order.id }}</th>
              <td>
                <router-link
                  :to="{ name: 'order', params: { id: order.id } }"
                  >{{ order.User.email }}</router-link
                >
              </td>
              <td>{{ order.price }}€</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import configHelper from "../../helpers/configHeader.js";

export default {
  name: "userOrders",
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    axios
      .get(configHelper.domain + "/api/user/orders", configHelper.config())
      .then((res) => {
        console.log(res.data["hydra:member"]);
        this.orders = res.data["hydra:member"];
      });
  },
};
</script>

<style scoped>
.principale {
  min-height: 25rem;
  margin-top: 2rem;
}
@media screen and (min-width: 768px) {
  .principale {
    min-height: 36rem;
  }
}
@media screen and (min-width: 992px) {
  .principale {
    min-height: 42rem;
  }
}
</style>

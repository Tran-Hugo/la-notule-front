<template>
  <body>
      <h4>Administration</h4>
        <router-link :to="{ name: 'booksAdmin'}" @click="setPath('booksAdmin')"><button type="button" class="btn btn-primary me-2">Books</button></router-link>
        <router-link :to="{ name: 'catAdmin'}" @click="setPath('catAdmin')"><button type="button" class="btn btn-secondary me-2">Catégories</button></router-link>
        <router-link :to="{ name: 'ordersAdmin'}" @click="setPath('ordersAdmin')"><button type="button" class="btn btn-success me-2">Commandes reçues</button></router-link>
        <br>
        <br>
    <router-view/>
  </body>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  methods:{
    ...mapActions(["setPath"])
  }
}
</script>

<style>

</style>
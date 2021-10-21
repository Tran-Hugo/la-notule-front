<template>
  <body>
      <h4>Administration</h4>
        <router-link :to="{ name: 'booksAdmin'}"><button type="button" class="btn btn-primary me-2">Books</button></router-link>
        <router-link :to="{ name: 'catAdmin'}"><button type="button" class="btn btn-secondary me-2">Catégories</button></router-link>
        <router-link :to="{ name: 'ordersAdmin'}"><button type="button" class="btn btn-success me-2">Commandes reçues</button></router-link>
        <br>
        <br>
    <router-view/>
  </body>
</template>

<script>
export default {

}
</script>

<style>

</style>
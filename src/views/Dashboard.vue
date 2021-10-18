<template>
  <body>
      <h4>admin</h4>
        <router-link :to="{ name: 'booksAdmin'}"><button type="button" class="btn btn-primary me-2">Books</button></router-link>
        <button type="button" class="btn btn-secondary me-2">Secondary</button>
        <button type="button" class="btn btn-success me-2">Success</button>
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
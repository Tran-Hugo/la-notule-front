<template>
  <main>
      <h4 class="text-center p-3">Administration</h4>
      <div class="d-flex justify-content-center">
          <div class="d-flex justify-content-around col-12 col-md-6 col-xl-5">
          <router-link :to="{ name: 'booksAdmin'}" @click="setPath('booksAdmin')"><button type="button" class="btn btn-pastel-blue"><i class="fas fa-book"></i> Livres</button></router-link>
          <router-link :to="{ name: 'catAdmin'}" @click="setPath('catAdmin')"><button type="button" class="btn btn-pastel-pink"><i class="far fa-bookmark"></i> Catégories</button></router-link>
          <router-link :to="{ name: 'ordersAdmin'}" @click="setPath('ordersAdmin')"><button type="button" class="btn btn-pastel-green"><i class="fas fa-list-ul"></i> Commandes reçues</button></router-link>
          </div>
      </div>
        <br>
    <router-view/>
  </main>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  methods:{
    ...mapActions(["setPath"])
  }
}
</script>

<style scoped>
@import '../../assets/css/btn-colors.css';

main{
  min-height: 24rem;
  margin-bottom: 2rem;
}
.btn{
  margin: 0;
  font-size: .8em;
}

@media screen and (min-width: 768px) {
  main{
  min-height: 40rem;
  }
}

@media screen and (min-width: 992px) {
  main{
    min-height: 49rem;
  }
}
</style>
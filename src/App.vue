<template>
<header>
  <div id="nav" class="d-none d-lg-block">
    <router-link to="/">Home |</router-link>
    <router-link v-if="token==null" to="/login"> Login |</router-link>
    <a v-else @click="logout"> Logout |</a>
    <router-link v-if="token" to="/cart"> Panier <i class="fas fa-shopping-cart"></i> |</router-link>
    <router-link v-if="token" to="/myAccount"> Mon compte |</router-link>
    <router-link v-if="role == 'ROLE_ADMIN'" to="/admin"> Admin |</router-link>
  </div>
  <div class="top-menu col-12 d-flex d-lg-none align-items-center justify-content-around">
    <i @click="isOpen = !isOpen" class="fas fa-bars burger"></i>
    <router-link to="/"><img src="@/assets/logo.svg" alt="logo.svg"></router-link>
  </div>
  
  <div class="barre d-lg-none"></div>
  <nav class="burnav d-lg-none" :class="{open: isOpen}">
        <form class="d-flex" @submit.prevent="search">
            <input class="form-control me-2" type="search" placeholder="Recherche..." v-model="searched" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Rechercher</button>
          </form>
        <ul>
            <li @click="isOpen = !isOpen"><router-link to="/">Accueil</router-link></li>
            <li @click="isOpen = !isOpen" v-if="token==null"><router-link to="/login">Se connecter</router-link></li>
            <li @click="isOpen = !isOpen" v-else><a href="#" @click="logout"> Se déconnecter</a></li>
            <li @click="isOpen = !isOpen" v-if="token"><router-link to="/cart">Panier<i class="fas fa-shopping-cart"></i></router-link></li>
            <li @click="isOpen = !isOpen" v-if="token"><router-link to="/myAccount">Mon compte</router-link></li>
            <li @click="isOpen = !isOpen" v-if="role == 'ROLE_ADMIN'"><router-link to="/admin">Admin</router-link></li>
            <li>Catégories :</li>
            <li @click="isOpen = !isOpen" v-for="(cat,key) in Categories" :key="key"><router-link :to="{ name: 'category', params: { id: cat.id }}">{{cat.name}}</router-link></li>
        </ul>
    </nav>
</header>
<main>
  <router-view/>
</main>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
import configHelper from '@/helpers/configHeader'

export default {
  name: 'App',
  data(){
    return{
      isOpen:false,
      Categories:[],
    }
  },
  mounted(){
    axios.get(configHelper.domain+"/api/categories")
        .then(data => {
            this.Categories = data.data['hydra:member'];
        })
  },
  methods:{
    logout(){
        this.$store.dispatch('logout');
    },
  },
  computed: {
    ...mapGetters({
        token:'getToken',
        role:'getRole'
        }),
  }

}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fas.fa-bars {
    font-size: 4em;
    color: #fa8072;
}
.burnav {
    position: fixed;
    left: 0;
    top: 21vh;
    width: 85vw;
    height: 79vh;
    background-color: #FFF3DD;
    z-index: 10;
    transform: translateX(-900px);
    border: 5px solid wheat;   
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    transition: 0.3s;
}

.burnav ul li a {
    color: black;
    text-decoration: none;
}

.burnav.open {
    transform: translateX(0);
    transition: .3s;
}
.barre {
    height: 5vh;
    width: 100%;
    background-color: wheat;
    position: fixed;
    top: 16vh;
    z-index: 10;
}
.top-menu{
    width: 100%;
    height: 16vh;
    background-color: white;
    position: fixed;
    z-index: 10;
}

main{
  padding-top:22vh
}

.burnav form {
    padding-left: 40px;
}

.burnav ul {
    list-style-type: none;
    padding-left: 40px;
    font-size: 1.8em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0;
    height: 80%;
    margin-top: -5vh;
}

@media screen and (min-width: 1024px) {
  main{
      padding-top:unset
    }
}
</style>

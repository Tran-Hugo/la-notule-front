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


  <div class="top-menu col-12 d-flex d-lg-none align-items-center">
    <i @click="isOpen = !isOpen" class="fas fa-bars burger"></i>
    <router-link class="logo-link" to="/"><img class="col-12" src="@/assets/logo.svg" alt="logo.svg"></router-link>
  </div>
  
  <div class="barre d-lg-none"></div>
  <nav class="burnav d-lg-none" :class="{open: isOpen}">
        <form class="d-flex" @submit.prevent="search(searched)" @submit="isOpen = !isOpen">
            <input class="form-control me-2" type="search" v-model="searched" placeholder="Recherche..." aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Rechercher</button>
          </form>
        <ul>
            <li @click="isOpen = !isOpen"><router-link to="/">Accueil</router-link></li>
            <li @click="isOpen = !isOpen" v-if="token==null"><router-link to="/login">Se connecter</router-link></li>
            <li @click="isOpen = !isOpen" v-else><a href="#" @click="logout"> Se déconnecter</a></li>
            <li @click="isOpen = !isOpen" v-if="token"><router-link to="/cart">Panier<i class="fas fa-shopping-cart"></i></router-link></li>
            <li @click="isOpen = !isOpen" v-if="token"><router-link to="/myAccount" @click="setPath('accountDefault')">Mon compte</router-link></li>
            <li @click="isOpen = !isOpen" v-if="role == 'ROLE_ADMIN'"><router-link to="/admin" @click="setPath('adminDefault')">Admin</router-link></li>
            <li>Catégories :</li>
            <div class="overflow-scroll">
            <li class="cats" @click="isOpen = !isOpen" v-for="(cat,key) in Categories" :key="key"><router-link :to="{ name: 'category', params: { id: cat.id }}">{{cat.name}}</router-link></li>
            </div>
        </ul>
    </nav>
</header>
<main>
  <router-view/>
</main>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'
import configHelper from '@/helpers/configHeader'

export default {
  name: 'App',
  data(){
    return{
      isOpen:false,
      Categories:[],
      searched:'',
    }
  },
  mounted(){
    axios.get(configHelper.domain+"/api/categoriesNames")
        .then(data => {
            this.Categories = data.data['hydra:member'];
        })
  },
  methods:{
    logout(){
        this.$store.dispatch('logout');
    },
    ...mapActions(["setPath"]),
    search(searched){
      this.$router.push({name:'search', params:{search:searched}})
    }
  },
  computed: {
    ...mapGetters({
        token:'getToken',
        role:'getRole'
        }),
  }

}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Arvo&display=swap');
#app {
  font-family: Arvo, Helvetica, Arial, sans-serif;
}
.fas.fa-bars {
    font-size: 2em;
    color: #fa8072;
    margin: 0 1rem;
}
.logo-link{
  width: 35vw;
  margin:auto;
}
.burnav {
    position: fixed;
    left: 0;
    top: 7vh;
    width: 85vw;
    height: 93vh;
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
    height: 3vh;
    width: 100%;
    background-color: wheat;
    position: fixed;
    top: 5vh;
    z-index: 10;
}
.top-menu{
    width: 100%;
    height: 5vh;
    background-color: white;
    position: fixed;
    z-index: 10;
}

main{
  padding-top:8vh
}

.burnav form {
    padding-left: 15px;
    padding-right: 10px;
}

.burnav ul {
    list-style-type: none;
    padding-left: 40px;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    margin: 0;
    height: 80%;
    margin-top: -5vh;
}

.cats{
  font-size: 1.2rem;
  margin-left: 18vw;
}

@media screen and (min-width: 768px) {
    main{
      padding-top: 10vh;
    }
    .burnav{
      top:10vh;
      width: 50vw;
    }
    .fas.fa-bars {
        font-size: 2em;
    } 
    .top-menu{
      height: 7vh;
    }
    .barre{
      top:7vh;
    }
    .burnav ul{
      font-size: 1.5rem;
    }
    .form-control{
      font-size: 1rem;
    }
    .btn{
      font-size: 1rem;
    }
}

@media screen and (min-width: 1024px) {
  main{
      padding-top:unset
    }
}
</style>

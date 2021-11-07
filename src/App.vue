<template>
  <header>
    <div id="nav" class="d-none d-lg-flex flex-column">
      <div class="logo-desktop">
        <router-link to="/"
          ><img class="col-12" src="@/assets/logo.svg" alt="logo.svg"
        /></router-link>
      </div>
      <form
        class="d-flex m-3"
        @submit.prevent="search(searched)"
        @submit="isOpen = !isOpen"
      >
        <input
          class="form-control"
          type="search"
          v-model="searched"
          placeholder="Recherche..."
          aria-label="Search"
        />
        <button class="bouton-recherche" type="submit">Rechercher</button>
      </form>
      <ul>
        <li>
          <router-link to="/">Accueil</router-link>
        </li>
        <li>
          <router-link v-if="token == null" to="/login"
            >Se connecter</router-link
          >
          <a class="logout-btn" v-else @click="logout">Se déconnecter</a>
        </li>
        <li v-if="token">
          <router-link to="/cart" @click="setPath('cart')"
            >Panier <i class="fas fa-shopping-cart"></i
          ></router-link>
        </li>
        <li v-if="token">
          <router-link to="/myAccount" @click="setPath('accountDefault')">
            Mon compte</router-link
          >
        </li>
        <li v-if="role == 'ROLE_ADMIN'">
          <router-link to="/admin" @click="setPath('adminDefault')"
            >Admin</router-link
          >
        </li>
        <li>Catégories :</li>
        <div class="cat-container scrollbar-y">
          <li class="catDesk" v-for="(cat, key) in Categories" :key="key">
            <router-link :to="{ name: 'category', params: { id: cat.id } }">{{
              cat.name
            }}</router-link>
          </li>
        </div>
      </ul>
    </div>

    <div class="top-menu col-12 d-flex d-lg-none flex-column align-items-center">
      <div class="d-flex col-12 align-items-center mb-2">
        <i v-if="!isOpen" @click="isOpen = !isOpen" class="fas fa-bars burger"></i>
        <i v-else @click="isOpen = !isOpen" class="fas fa-times"></i>
      <router-link class="logo-link" to="/"
        ><img class="col-12" src="@/assets/logo.svg" alt="logo.svg"
      /></router-link>
      </div>
      <div class="barre d-lg-none"></div>
    </div>

    
    <nav class="burnav d-lg-none" :class="{ open: isOpen }">
      <form
        class="d-flex"
        @submit.prevent="search(searched)"
        @submit="isOpen = !isOpen"
      >
        <input
          class="form-control me-2"
          type="search"
          v-model="searched"
          placeholder="Recherche..."
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">
          Rechercher
        </button>
      </form>
      <ul>
        <li @click="isOpen = !isOpen">
          <router-link to="/">Accueil</router-link>
        </li>
        <li @click="isOpen = !isOpen" v-if="token == null">
          <router-link to="/login">Se connecter</router-link>
        </li>
        <li @click="isOpen = !isOpen" v-else>
          <a href="#" @click="logout"> Se déconnecter</a>
        </li>
        <li @click="isOpen = !isOpen" v-if="token">
          <router-link to="/cart" @click="setPath('cart')"
            >Panier<i class="fas fa-shopping-cart"></i
          ></router-link>
        </li>
        <li @click="isOpen = !isOpen" v-if="token">
          <router-link to="/myAccount" @click="setPath('accountDefault')"
            >Mon compte</router-link
          >
        </li>
        <li @click="isOpen = !isOpen" v-if="role == 'ROLE_ADMIN'">
          <router-link to="/admin" @click="setPath('adminDefault')"
            >Admin</router-link
          >
        </li>
        <li>Catégories :</li>
        <div class="overflow-scroll">
          <li
            class="cats"
            @click="isOpen = !isOpen"
            v-for="(cat, key) in Categories"
            :key="key"
          >
            <router-link :to="{ name: 'category', params: { id: cat.id } }">{{
              cat.name
            }}</router-link>
          </li>
        </div>
      </ul>
    </nav>
  </header>
  <div class="main-container">
    <router-view />
    <pied />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import configHelper from "@/helpers/configHeader";
import pied from "@/components/footer.vue";

export default {
  name: "App",
  components: {
    pied,
  },
  data() {
    return {
      isOpen: false,
      Categories: [],
      searched: "",
    };
  },
  mounted() {
    axios.get(configHelper.domain + "/api/categoriesNames").then((data) => {
      this.Categories = data.data["hydra:member"];
    });
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    ...mapActions(["setPath"]),
    search(searched) {
      this.$router.push({ name: "search", params: { search: searched } });
    },
  },
  computed: {
    ...mapGetters({
      token: "getToken",
      role: "getRole",
    }),
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Arvo&display=swap");
#app {
  font-family: Arvo, Helvetica, Arial, sans-serif;
}
.fas.fa-bars {
  font-size: 2em;
  color: #fa8072;
  margin: 0 1rem;
}
.fas.fa-times{
  font-size: 2em;
  color: #fa8072;
  margin: 0 1.2rem;
}
.logo-link {
  width: 35vw;
  margin: auto;
}
.burnav {
  position: fixed;
  left: 0;
  top: 7vh;
  width: 85vw;
  height: 93vh;
  background-color: #fff3dd;
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
  transition: 0.3s;
}
.barre {
  height: 2vh;
  width: 100%;
  background-color: wheat;

  z-index: 10;
}
.top-menu {
  width: 100%;
  background-color: white;
  position: fixed;
  z-index: 10;
}

.main-container {
  padding-top: 7vh;
  width: 100%;
  background-color: #fff3dd;
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

.cats {
  font-size: 1.2rem;
  margin-left: 18vw;
}

@media screen and (min-width: 768px) {
  .main-container {
    padding-top: 8vh;
  }
  .logo-link {
    width: 27vw;
  }
  .burnav {
    top: 7vh;
    width: 50vw;
  }
  .fas.fa-bars {
    font-size: 2em;
  }
  
  .barre {
    top: 7vh;
  }
  .burnav ul {
    font-size: 1.5rem;
  }
  .form-control {
    font-size: 1rem;
  }
  .btn {
    font-size: 1rem;
  }
}
@media screen and (min-width: 568px) and (max-height: 540px) {
  .burnav{
    height: 90vh;
    top:12vh
  }
  .burnav ul{
    font-size: 1rem;
  }
  .cats{
    font-size: 1rem;
  }
}
@media screen and (min-width: 568px) and (max-height: 440px) {
  .burnav{
      height: 82vh;
      top:18vh
    }
  .burnav ul{
    font-size: 1rem;
  }
  .cats{
    font-size: 1rem;
  }
}
@media screen and (min-width: 568px) and (max-height: 360px) {
.burnav{
      height: 82vh;
      top:18vh
    }
.burnav ul{
    font-size: 1rem;
  }
  .cats{
    font-size: 1rem;
  }
}
@media screen and (min-width: 992px) {
  .main-container {
    padding-top: unset;
  }
  #nav {
    width: 20vw;
    position: fixed;
    top: 0;
    background-color: wheat;
    height: 100vh;
    /* overflow-y: scroll; à ajouter avec la class .scrollbar-y si jamais le contenu dépasse */
  }
  #nav form .form-control {
    font-size: 0.8rem;
    padding: 0.1rem;
  }
  #nav form button {
    border: none;
    background-color: #03989e;
    color: white;
    font-size: 0.8em;
    border-radius: 0 5px 5px 0;
  }
  #nav ul {
    list-style-type: none;
    font-size: 1rem;
  }
  #nav ul li {
    padding: 1.5vh 0;
  }
  #nav ul li a {
    text-decoration: none;
    color: black;
  }
  .logout-btn{
    cursor: pointer;
  }
  .catDesk {
    margin-left: 3rem;
  }
  .cat-container {
    overflow-y: scroll;
    max-height: 25vh;
    scrollbar-width: thin;
    scrollbar-color: #7f7f7f transparent; /* thumb and track color */
  }
  .scrollbar-y::-webkit-scrollbar {
    width: 0.3em;
  }
  .scrollbar-y::-webkit-scrollbar-thumb {
    background: #03989e;
    border-radius: 1em;
  }
  .logo-desktop {
    background-color: white;
    padding: 2rem 0;
  }
  .main-container {
    margin-left: 20vw;
    width: 80vw;
  }
}

@media screen and (min-width: 1024px) {
  .main-container {
    padding-top: unset;
  }
  #nav form .form-control {
    font-size: 1rem;
    padding: 0.375rem 0.75rem;
  }
}
</style>

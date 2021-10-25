<template>
  <div id="nav">
    <router-link to="/">Home |</router-link>
    <router-link v-if="token==null" to="/login"> Login |</router-link>
    <a v-else @click="logout"> Logout |</a>
    <router-link to="/about"> About |</router-link>
    <router-link v-if="token" to="/cart"> Panier <i class="fas fa-shopping-cart"></i> |</router-link>
    <router-link v-if="token" to="/myAccount"> Mon compte |</router-link>
    <router-link v-if="role == 'ROLE_ADMIN'" to="/admin"> Admin |</router-link>
  </div>
  <router-view/>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data(){
    return{
      
    }
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

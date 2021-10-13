import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from 'axios'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginModule: {
      state:{
        posts: [],
        me:"",
        token: localStorage.getItem('token'),
        role:[],
        cart:"",
      },
      getters:{
        getCart: state=>state.cart,
      },
      mutations:{
        SET_ROLE(state,role){
          state.role = role
        },
        RESET_ROLE(state,role){
          state.role = role
        },
        SET_CART(state,cart){
          state.cart = cart
        }
      },
      actions:{
        connexion({commit},user){
          let config = {
            Headers: {
                'Content-type': 'application/json'
            }
        };
          axios.post('https://127.0.0.1:8000/api/login',user, config)
                        .then(res=>{
                          console.log(res.data);
                          let role = res.data.data['roles'][0];
                          let cart = res.data.data['cart']  
                          localStorage.setItem( 'token',res.data.token );
                          this.state.token = localStorage.getItem('token');
                          commit('SET_CART',cart)
                          commit('SET_ROLE',role);
                          })
        },
        test({commit}){
          let config = {
            headers:{
              Authorization: 'Bearer ' + this.state.token
          }
          }
          
          axios.get('https://127.0.0.1:8000/api/me', config)
              .then(res=>{
                console.log(res.data.roles)
                let role = res.data.roles[0]  
                commit('SET_ROLE',role)
              })
        },
        logout({commit}){
          localStorage.removeItem('token')
          this.state.token = null
          let role = []
          commit('RESET_ROLE',role)
        },
      }
    } //fin login module
  },
  plugins: [createPersistedState()],
})

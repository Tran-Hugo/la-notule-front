import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from 'axios'
import router from '../router';

export default createStore({
  state: {
    path:null,
  },
  getters:{
    getPath:state=>state.path,
  },
  mutations: {
    SET_PATH(state,path){
      state.path = path
    }
  },
  actions: {
    setPath({commit},path){
      commit('SET_PATH',path);
    }
  },
  modules: {
    loginModule: {
      state:{
        token: localStorage.getItem('token'),
        role:[],
        id:'',
        cart:'',
        refreshToken:'',
      },
      getters:{
        getId:state=>state.id,
        getCart: state=>state.cart,
        getToken: state=>state.token,
        getRole: state=>state.role,
      },
      mutations:{
        SET_ID(state,id){
          state.id = id
        },
        SET_ROLE(state,role){
          state.role = role
        },
        SET_CART(state,cart){
          state.cart = cart
        },
        RESET_TOKEN(state){
          state.token = null
        },
        RESET_CART(state){
          state.cart = ""
        },
        RESET_ROLE(state){
          state.role = []
        },
        SET_REFRESH_TOKEN(state,token){
          state.refreshToken = token
        },
        RESET_REFRESH_TOKEN(state){
          state.refreshToken = null
        },
        SET_TOKEN(state,token){
          state.token = token
        },
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
                          let role = res.data.data['roles'][0];
                          let cart = res.data.data['cart']
                          let userId = res.data.data.id
                          let refreshToken = res.data.refresh_token;
                          localStorage.setItem( 'token',res.data.token );
                          let token = localStorage.getItem('token')
                          commit('SET_ID',userId)
                          commit('SET_TOKEN',token)
                          commit('SET_CART',cart)
                          commit('SET_ROLE',role);
                          commit('SET_REFRESH_TOKEN',refreshToken);
                          router.push("/");
                          })
        },
        test({commit}){
          let config = {
            headers:{
              Authorization: 'Bearer ' + this.state.loginModule.token
          }
          }
          
          axios.get('https://127.0.0.1:8000/api/me', config)
              .then(res=>{
                let role = res.data.roles[0]  
                commit('SET_ROLE',role)
              })
              .catch(err=>{console.log(err)})
        },
        logout({commit}){
          localStorage.removeItem('token')
          commit('RESET_TOKEN')
          commit('RESET_CART')
          commit('RESET_ROLE')
          commit('RESET_REFRESH_TOKEN')
          router.push("/");
        },
      }
    }, //fin login module
  },
  plugins: [createPersistedState()],
})

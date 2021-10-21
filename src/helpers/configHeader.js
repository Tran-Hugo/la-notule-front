import store from '../store'
// Single responsability principle (SOLID)
export default {config : {
    headers:{
      Authorization: 'Bearer ' + store.getters.getToken
  }
  },
domain:'https://127.0.0.1:8000'
} 
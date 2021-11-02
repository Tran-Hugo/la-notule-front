import axios from 'axios'
import store from '../store'
import router from '../router';

export default
() =>{
    axios.interceptors.response.use(
    res => {
        return res
    },
    err=> {
        const originalConfig = err.config;
        if(originalConfig.url !== "https://127.0.0.1:8000/api/login") {
            if (err.response.status === 401 && err.response.data.message === "Expired JWT Token") {
                // console.log("easy")
                let refreshToken = {
                    refresh_token: store.state.loginModule.refreshToken
                }
                axios.post("https://127.0.0.1:8000/api/token/refresh", refreshToken)
                    .then(res=>{
                        console.log(res)
                        store.commit('SET_TOKEN',res.data.token)
                        localStorage.setItem('token',res.data.token)
                        if(router.currentRoute._value.fullPath.substring(0,6)=="/admin"){
                            alert('veuillez cliquer à nouveau s\'il vous plait')
                        } else {
                            // router.push(store.getters.getPath)
                            router.push({name:store.getters.getPath})
                        }
                    })
            }
        }
        return Promise.reject(err)
    }
)
}

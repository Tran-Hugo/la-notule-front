import axios from 'axios'
import store from '../store'

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
                        this.$router.go()
                    })
            }
        }
    }
)
}

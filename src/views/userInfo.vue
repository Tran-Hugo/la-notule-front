<template>
  <h1>Informations utilisateur :</h1>
    <h2>Email : {{user.email}} </h2>
    <p>Prénom : {{user.firstname}} </p>
    <p>Nom : {{user.lastname}} </p>
    <p>Adresse : {{user.adress}} </p>
</template>

<script>
import axios from "axios"
import configHelper from '../helpers/configHeader.js'
import {mapGetters} from 'vuex'

export default {
    name:'userInfo',
    data(){
        return{
            user:[],
        }
    },
    mounted(){
        axios.get(configHelper.domain+'/api/users/'+this.id,configHelper.config)
            .then(res=>{
                console.log(res)
                this.user=res.data
            })
    },
    computed: {
    ...mapGetters({
        id:'getId',
        })
  }
}
</script>

<style>

</style>
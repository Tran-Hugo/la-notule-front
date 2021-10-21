<template>
  <h4>Commandes</h4>
  <br>
  <div class="d-flex justify-content-center">
            <div class="col-10 ">
                <table class="table">
                    <br>

                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Client</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Gérer</th>
                        </tr>
                    </thead>
                    <tbody  v-for="(order,index) in orders" :key='index'>
                        <tr>
                        <th scope="row">{{order.id}}</th>
                        <td>{{order.User.email}}</td>
                        <td>{{order.price}}€</td>
                        <td>
                            <router-link :to="{ name: 'order', params: { id: order.id }}">
                                <button type="button" class="btn btn-success me-2">Détails</button>
                            </router-link>
                            <button type="button" @click="remove(order.id)" class="btn btn-danger me-2">Supprimer</button>
                        </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
</template>

<script>
import axios from "axios"
import configHelper from '../helpers/configHeader.js'

export default {
    name:'ordersAdmin',
    data(){
        return{
            orders:[],
        }
    },
    mounted(){
        axios.get(configHelper.domain+'/api/orders')
            .then(res=>{
                console.log(res.data["hydra:member"])
                this.orders = res.data["hydra:member"]
            })
    },
    methods:{
        remove(id){
            axios.delete(configHelper.domain+"/api/orders/"+id,configHelper.config)
                .then(res=>{
                    if(res.status==204){
                        this.$router.go()
                    }
                })
        }
    }
}
</script>

<style>

</style>
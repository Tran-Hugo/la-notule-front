<template>
  <h1>Orders list</h1>
  <div class="d-flex justify-content-center">
            <div class="col-10 ">
                <table class="table">
                    <br>

                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Client</th>
                        <th scope="col">Prix</th>
                        </tr>
                    </thead>
                    <tbody  v-for="(order,index) in orders" :key='index'>
                        <tr>
                        <th scope="row">{{order.id}}</th>
                        <td><router-link :to="{name:'order', params:{id: order.id}}">{{order.User.email}}</router-link></td>
                        <td>{{order.price}}€</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
</template>

<script>
import axios from "axios"
import configHelper from '../../helpers/configHeader.js'

export default {
    name:'userOrders',
    data(){
        return{
            orders:[],
        }
    },
    mounted(){
        axios.get(configHelper.domain+'/api/user/orders',configHelper.config())
            .then(res=>{
                console.log(res.data["hydra:member"])
                this.orders = res.data["hydra:member"]
            })
    },
}
</script>

<style>

</style>
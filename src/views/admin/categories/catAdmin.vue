<template>
  <h4 class="text-center p-2">Catégories</h4>
  <div class="d-flex justify-content-end col-10">
    <router-link :to="{ name: 'addCategory'}"><button type="button" class="btn btn-turquoise me-2">Ajouter une Catégorie</button></router-link>
  </div>
  <br>
        <div class="d-flex justify-content-center">
            <div class="col-10 ">
                <table class="table">
                    <br>

                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Gérer</th>
                        </tr>
                    </thead>
                    <tbody  v-for="(category,index) in categories" :key='index'>
                        <tr>
                        <th scope="row">{{category.id}}</th>
                        <td>{{category.name}}</td>
                        <td>
                            <router-link :to="{ name: 'category', params: { id: category.id }}">
                                <button type="button" class="btn btn-pastel-green me-2">voir</button>
                            </router-link>
                            <router-link :to="{ name: 'editCat', params: { id: category.id }}">
                                <button type="button" class="btn btn-pastel-yellow me-2">éditer</button>
                            </router-link>
                            <button type="button" @click="remove(category.id)" class="btn btn-pastel-red me-2">Supprimer</button>
                        </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
</template>

<script>
import axios from "axios"
import configHelper from '../../../helpers/configHeader.js'

export default {
    name:'categorieAdmin',
    data(){
        return{
            categories:[],
        }
    },
    mounted(){
        axios.get(configHelper.domain+'/api/categories')
            .then(res=>{
                console.log(res.data["hydra:member"])
                this.categories = res.data["hydra:member"]
            })
    },
    methods:{
        remove(id){
            axios.delete(configHelper.domain+"/api/categories/"+id,configHelper.config())
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
@import '../../../assets/css/btn-colors.css';

</style>
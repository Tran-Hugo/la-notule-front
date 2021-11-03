<template>
  <h4>Books</h4>
        <div class="d-flex justify-content-end col-10">
            <router-link :to="{ name: 'addBook'}"><button type="button" class="btn btn-primary me-2">Ajouter un livre</button></router-link>
        </div>
        <br>
        <div class="d-flex justify-content-end col-10">
            <form class="d-flex" @submit.prevent="search">
                <input class="form-control me-2" type="search" placeholder="Search" v-model="searched" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
        <br>
        <div class="d-flex justify-content-center">
            <div class="overflow-hidden">
                <div class="col-12 overflow-auto">
                <table class="table">
                    <br>

                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Catégories</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Gérer</th>
                        </tr>
                    </thead>
                    <tbody  v-for="(book,index) in books" :key='index'>
                        <tr>
                        <th scope="row">{{book.id}}</th>
                        <td>{{book.title}}</td>
                        <td>{{book.author}}</td>
                        <td><span v-for="(cat,key) in book.category" :key='key'>{{cat.name}}, </span></td>
                        <td>{{book.quantity}}</td>
                        <td>{{book.price}}€</td>
                        <td>
                            <router-link :to="{ name: 'book', params: { id: book.id }}">
                                <button type="button" class="btn btn-success me-2">voir</button>
                            </router-link>
                            <router-link :to="{ name: 'editBook', params: { id: book.id }}">
                                <button type="button" class="btn btn-warning me-2">éditer</button>
                            </router-link>
                            <button type="button" @click="remove(book.id)" class="btn btn-danger me-2">Supprimer</button>
                        </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            </div>
            
        </div>
        
        
</template>

<script>
import axios from "axios"
import configHelper from '../../../helpers/configHeader.js'

export default {
    name:'bookAdmin',
    data(){
        return{
            books:[],
            searched:'',
        }
    },
    mounted(){
        axios.get(configHelper.domain+'/api/books')
            .then(res=>{
                console.log(res.data["hydra:member"])
                this.books = res.data["hydra:member"]
            })
    },
    methods:{
        remove(id){
            axios.delete(configHelper.domain+"/api/books/"+id,configHelper.config())
                .then(res=>{
                    if(res.status==204){
                        this.$router.go()
                    }
                })
        },
        search(){
            let search = {
                "search": this.searched
            }
            axios.post(configHelper.domain+'/api/books/search',search)
                .then(res=>{
                    console.log(res.data)
                    this.books = res.data
                })
        }
    },
}
</script>

<style>

</style>
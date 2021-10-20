<template>
  <h4>Books</h4>
        <router-link :to="{ name: 'addBook'}"><button type="button" class="btn btn-primary me-2">Add Book</button></router-link>
        <br>
        <br>
        <div class="d-flex justify-content-center">
            <div class="col-10 ">
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
        
        
</template>

<script>
import axios from "axios"
import configHelper from '../helpers/configHeader.js'

export default {
    name:'bookAdmin',
    data(){
        return{
            books:[],
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
            axios.delete(configHelper.domain+"/api/books/"+id,configHelper.config)
        }
    },
}
</script>

<style>

</style>
<template>
<div class="d-flex justify-content-center">
    <form class="col-6" @submit.prevent="addBook">
                <div class="mb-3">
                    <label class="form-label">Titre</label>
                    <input type="text" v-model="title" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Auteur</label>
                    <input type="text" v-model="author" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                      <textarea class="form-control" v-model="description"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Prix</label>
                    <input type="number" v-model="price" class="form-control" step="0.01">
                </div>
                <div class="mb-3">
                    <label class="form-label">Quantité</label>
                    <input type="number" v-model="quantity" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Catégorie</label>
                    <select class="form-select" aria-label="Default select example"  v-model="key">
                        <option value="1">Catégories</option>
                        <option v-for="(cat,index) in Categories" :key="index" :value="cat['id']">{{cat.name}}</option>
                    </select>    
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Image</label>
                    <input class="form-control" type="file" id="formFile">
                </div>                
                
                <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
</div>
  
</template>

<script>
import axios from 'axios'
import headerApiProject from '../helpers/configHeader'


export default {
    name:'addBook',
    data(){
        return {
            Categories:[],
            title:'',
            author:'',
            description:'',
            price:'',
            quantity:'',
            key:"1" //1 parce que v-model ignore le selected et met la valeur que l'on rentre ici comme selected
        }
    },
    mounted(){
        axios.get(headerApiProject.domain+"/api/categories")
        .then(data => {
            console.log(data.data['hydra:member'])
            this.Categories = data.data['hydra:member']
        })
    },
    methods:{
        addBook(){
            let files = document.querySelector('#formFile').files
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('author', this.author);
            formData.append('description', this.description);
            formData.append('price', this.price);
            formData.append('quantity', this.quantity);
            formData.append('category', this.key);
            formData.append('file', files[0]);

            axios.post(headerApiProject.domain+'/api/books/new', formData,headerApiProject.config)
                .then(res=>{
                    console.log(res)
                })


        }
    },
}
</script>

<style>

</style>
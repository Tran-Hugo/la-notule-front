<template>
<div class="d-flex justify-content-center">
    {{key}}
    <form class="col-6" @submit.prevent="editBook(id)">
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
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Catégories
                    </button>
                    <br>
                    <br>
                    <div class="collapse" id="collapseExample">
                        <div class="card card-body d-flex">
                            <div v-for="(cat,index) in Categories" :key="index">
                                <label class="form-check-label me-3" for="flexCheckIndeterminate">
                                {{cat.name}}
                            </label>
                            <input type="checkbox" class="form-check-input mb-2" v-model="key" :value="cat['id']"> 
                            </div>
                            
                        </div>
                    </div>
                     
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Image</label>
                    <img v-if="fileUrl == null" :src="domain+'/images/no-image.jpg'" alt="..." class="col-12">
                    <img v-else :src="domain+fileUrl" alt="" class="col-12">
                    <br>
                    <br>
                    <input class="form-control" type="file" id="formFile">
                </div>                
                
                <button type="submit" class="btn btn-primary">éditer</button>
        </form>
</div>
</template>

<script>
import axios from 'axios'
import configHelper from '../helpers/configHeader'

export default {
    name:'editBook',
    data(){
        return{
            Categories:[],
            title:'',
            author:'',
            description:'',
            price:'',
            quantity:'',
            key:[],
            domain:configHelper.domain,
            fileUrl:null,
            id:this.$route.params.id,
        }
    },
    mounted(){
        axios.get(configHelper.domain+"/api/categories")
        .then(data => {
            console.log(data.data['hydra:member'])
            this.Categories = data.data['hydra:member']
        })
        axios.get(configHelper.domain+'/api/books/'+this.id)
            .then(res=>{
                console.log(res.data)
                this.title = res.data.title
                this.author = res.data.author
                this.description = res.data.description
                this.price = res.data.price
                this.quantity = res.data.quantity
                this.fileUrl = res.data.fileUrl
                res.data.category.forEach(element => {
                    this.key.push(element.id)
                });
            })
    },
    methods:{
        editBook(id){
            let files = document.querySelector('#formFile').files
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('author', this.author);
            formData.append('description', this.description);
            formData.append('price', this.price);
            formData.append('quantity', this.quantity);
            formData.append('categories', this.key);
            formData.append('file', files[0]);

            axios.post(configHelper.domain+"/api/books/edit/"+id,formData,configHelper.config)
                .then(res=>{
                    console.log(res)
                })
        },
    },
}
</script>

<style>

</style>
<template>
<div class="d-flex justify-content-center">
    <form class="col-6" @submit.prevent="addCategory">
                <div class="mb-3">
                    <label class="form-label">Nom de la catégorie</label>
                    <input type="text" v-model="name" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
</div>
</template>

<script>
import axios from 'axios'
import configHelper from '../../../helpers/configHeader'

export default {
    name:'addCategory',
    data(){
        return{
            name:'',
        }
    },
    methods:{
        addCategory(){
            let category = {
                "name": this.name
            }
            axios.post(configHelper.domain+'/api/categories',category,configHelper.config)
                .then(res=>{
                    console.log(res)
                    if(res.status == 201){
                        alert('Catégorie ajoutée')
                    }
                })
        }
    }

}
</script>

<style>

</style>
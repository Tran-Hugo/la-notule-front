<template>
  <div class="d-flex justify-content-center">
    <form class="col-6" @submit.prevent="editCategory">
                <div class="mb-3">
                    <label class="form-label">Nom de la catégorie</label>
                    <input type="text" v-model="name" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary">éditer</button>
    </form>
</div>
</template>

<script>
import axios from 'axios'
import configHelper from '../helpers/configHeader'

export default {
    name:'editCategory',
    data(){
        return{
            id:this.$route.params.id,
            name:'',
        }
    },
    mounted(){
        axios.get(configHelper.domain+'/api/categories/'+this.id)
            .then(res=>{
                this.name=res.data.name
            })
    },
}
</script>

<style>

</style>
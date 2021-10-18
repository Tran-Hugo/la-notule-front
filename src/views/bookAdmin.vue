<template>
  <div><h4>Books</h4></div>
        <router-link :to="{ name: 'addBook'}"><button type="button" class="btn btn-primary me-2">Add Book</button></router-link>
</template>

<script>
import axios from "axios"
export default {
    mounted(){
        axios.get('https://127.0.0.1:8000/api/orders')
            .then(res=>{
                console.log(res.data["hydra:member"])
            })
    }
}
</script>

<style>

</style>
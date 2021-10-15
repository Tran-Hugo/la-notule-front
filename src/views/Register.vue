<template>
<body>
    <h1>Inscrivez-vous !</h1>
    <div class="d-flex justify-content-center">
        <form class="col-6" @submit.prevent="submit">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Adresse Email</label>
                    <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
                    <input type="password" v-model="password" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"> Confirmez votre mot de passe</label>
                    <input type="password" v-model="confirmPassword" class="form-control" v-bind:class="{'is-invalid' : emailInvalid}">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Prénom</label>
                    <input type="text" v-model="firstName" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Nom</label>
                    <input type="text" v-model="lastName" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Adresse postale</label>
                    <input type="text" v-model="adress" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary">S'inscrire</button>
        </form>
    </div>
</body>
</template>

<script>
import axios from 'axios'

export default {
    name:'register',
    data(){
        return{
            email:'',
            password:'',
            confirmPassword:'',
            firstName:'',
            lastName:'',
            adress:'',
            emailInvalid:false,
        }
    },
    methods:{
        
        submit(){
            let user = {
                "email": this.email,
                "password": this.password,
                "firstname": this.firstName,
                "lastname": this.lastName,
                "adress": this.adress,
                "cart": {
                    "owner": this.lastName,
                    "total": 0
                }
            }
            if(this.password === this.confirmPassword){
                axios.post('https://127.0.0.1:8000/api/users',user)
            }
        },
        testEmail(){
            if(this.regEmail.test(this.email)==false){
                this.emailInvalid = true;
            } else {
                this.emailInvalid = false;
            }
    }
    }
}
</script>

<style>

</style>
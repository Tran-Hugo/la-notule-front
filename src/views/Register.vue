<template>
<main>
    <div class="d-flex justify-content-center justify-content-lg-start align-items-center principale">

    <div class="d-flex justify-content-center log-container">
        <form class="col-10 d-flex flex-column" @submit.prevent="submit">
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
                <div class="d-flex flex-column flex-lg-row">
                        <div class="mb-3 col-lg-6 me-lg-2">
                        <label for="exampleInputPassword1" class="form-label">Prénom</label>
                        <input type="text" v-model="firstName" class="form-control">
                    </div>
                    <div class="mb-3 col-lg-6">
                    <label for="exampleInputPassword1" class="form-label">Nom</label>
                    <input type="text" v-model="lastName" class="form-control">
                </div>
                </div>
                
                
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Adresse postale</label>
                    <input type="text" v-model="adress" class="form-control">
                </div>
                <button type="submit" class="btn-re btn align-self-end">S'inscrire</button>
        </form>
    </div>
    </div>
</main>
</template>

<script>
import axios from 'axios'
import configHelper from '../helpers/configHeader'

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
                axios.post(configHelper.domain+'/api/users',user)
                    .then(res=>{
                        if(res.status == 201)
                        {
                            this.$router.push('/login');
                        }
                    })
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

<style scoped>

main{
  background-image: url('../assets/register.jpg');
  background-size: cover;
}

.log-container{
  background-color: rgba(255, 243, 221, 0.63);
  padding: 1rem;
  border-radius: 5px;
  width: 77%;
  margin: 1rem;
}
.btn-re{
  background-color: rgba(3, 152, 158, 0.79);
  color: white;
}

@media screen and (min-width: 768px) {
    .principale{
        min-height: 40rem;
    }
}
@media screen and (min-width: 992px) {
    main{
        padding-top:6vh;
    }
    .principale{
        min-height: 50rem;
    }
    .log-container{
        max-width: 35%;
    }
}
</style>
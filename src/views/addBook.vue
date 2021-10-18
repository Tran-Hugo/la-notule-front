<template>
<div class="d-flex justify-content-center">
    <form class="col-6">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Adresse Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
                    <input type="password" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"> Confirmez votre mot de passe</label>
                    <input type="password" class="form-control" v-bind:class="{'is-invalid' : emailInvalid}">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Prénom</label>
                    <input type="text" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Nom</label>
                    <input type="text" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Adresse postale</label>
                    <input type="text" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary">S'inscrire</button>
        </form>
</div>
  
</template>

<script>
export default {

}
</script>

<style>

</style>
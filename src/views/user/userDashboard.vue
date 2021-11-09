<template>
  <h1 class="text-center">Mon compte</h1>
  <div class="d-flex justify-content-center">
    <router-link :to="{ name: 'userInfo' }"
      ><button type="button" class="btn btn-primary me-2">
        Utilisateur
      </button></router-link
    >
    <router-link :to="{ name: 'ordersList' }"
      ><button type="button" class="btn btn-success me-2">
        Commandes
      </button></router-link
    >
  </div>
  <router-view />
</template>

<script>
export default {
  name: "userDashboard",
};
</script>

<style></style>

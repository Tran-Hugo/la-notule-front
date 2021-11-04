<template>
  <h1>Mon compte</h1>
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
  <router-view />
</template>

<script>
export default {
  name: "userDashboard",
};
</script>

<style></style>

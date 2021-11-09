<template>
  <main>
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
  </main>
</template>

<script>
export default {
  name: "userDashboard",
};
</script>

<style scoped>
@media screen and (min-width: 992px) {
  main {
    padding-top: 15vh;
  }
}
</style>

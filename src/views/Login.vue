<template>
  <main>
    <div
      class="home d-flex align-items-center justify-content-center justify-content-lg-start"
    >
      <div
        class="log-container col-8 col-md-6 col-lg-4 col-xl-3 d-flex flex-column"
      >
        <form class="d-flex flex-column">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Adresse Email</label
            >
            <input
              type="email"
              class="form-control"
              v-model="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Mot de passe</label
            >
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button
            type="submit"
            @click.prevent="connectUser"
            class="btn-co btn col-9"
          >
            Connexion
          </button>
        </form>
        <br />
        <router-link to="/register" class="text-center"
          ><button class="btn btn-re col-9">
            Créer un compte
          </button></router-link
        >
        <br />
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src

import { mapState, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    connectUser() {
      this.user = {
        username: this.email,
        password: this.password,
      };

      this.$store.dispatch("connexion", this.user);
    },
  },

  computed: {
    ...mapState(["token"]),
    ...mapGetters({
      cart: "getCart",
    }),
  },
};
</script>

<style scoped>
main {
  min-height: 26rem;
  background-image: url("../assets/connexion.jpg");
  background-size: cover;
  background-position: bottom;
}
.home {
  min-height: 26rem;
}
.log-container {
  background-color: rgba(255, 243, 221, 0.63);
  padding: 1rem;
  border-radius: 5px;
}
.form-label {
  font-size: 1.1em;
}
.btn-co {
  background-color: rgba(245, 222, 179, 0.9);
  font-size: 1.1em;
}
.btn-re {
  background-color: rgba(3, 152, 158, 0.79);
  color: white;
}
.btn:hover {
  color: white !important;
}

@media screen and (min-width: 768px) {
  .home {
    min-height: 42rem;
  }
}
@media screen and (min-width: 992px) {
  main {
    background-position: center;
  }
  .home {
    min-height: 52rem;
  }
  .log-container {
    margin-left: 5rem;
  }
}
</style>

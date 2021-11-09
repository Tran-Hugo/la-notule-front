<template>
  <h1>Informations utilisateur :</h1>
  <h2>Email : {{ user.email }}</h2>
  <form>
    <p>
      Prénom : <span v-if="!edit">{{ firstname }}</span
      ><input type="text" v-else v-model="firstname" />
    </p>
    <p>
      Nom : <span v-if="!edit">{{ lastname }}</span
      ><input type="text" v-else v-model="lastname" />
    </p>
    <p>
      Adresse : <span v-if="!edit">{{ adress }}</span
      ><input type="text" v-else v-model="adress" />
    </p>
    <button v-if="!edit" class="btn btn-pastel-green" @click="edit = !edit">
      modifier
    </button>
    <button v-else class="btn btn-pastel-red" @click="edit = !edit">
      annuler
    </button>
    <button v-if="edit" class="btn btn-pastel-blue" @click.prevent="submit">
      sauvegarder
    </button>
  </form>
</template>

<script>
import axios from "axios";
import configHelper from "../../helpers/configHeader.js";
import { mapGetters } from "vuex";

export default {
  name: "userInfo",
  data() {
    return {
      user: [],
      firstname: null,
      lastname: null,
      adress: null,
      edit: false,
    };
  },
  mounted() {
    axios
      .get(configHelper.domain + "/api/users/" + this.id, configHelper.config())
      .then((res) => {
        console.log(res);
        this.user = res.data;
        this.firstname = res.data.firstname;
        this.lastname = res.data.lastname;
        this.adress = res.data.adress;
      });
  },
  computed: {
    ...mapGetters({
      id: "getId",
    }),
  },
  methods: {
    async submit() {
      let data = {
        firstname: this.firstname.length > 1 ? this.firstname : null,
        lastname: this.lastname.length > 1 ? this.lastname : null,
        adress: this.adress.length > 1 ? this.adress : null,
      };
      let res = await axios.patch(
        configHelper.domain + "/api/user/edit",
        data,
        configHelper.config()
      );
      if (res.status == 200) {
        alert("informations modifiées");
      }
    },
  },
};
</script>

<style></style>

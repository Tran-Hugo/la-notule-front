<template>
  <main>
    <div class="principale mt-3 d-lg-flex align-items-center">
      <div class="d-flex flex-column flex-lg-row text-center col-lg-6 p-1">
        <div class="col-lg-6">
          <h4 class="p-primaire">À propos</h4>
          <p>La notule</p>
          <p>9 Rue Marc Seguin,</p>
          <p>94015 Créteil, France</p>
          <p>Siret: 11111111111111</p>

          <h4 class="p-primaire">Contactez-nous</h4>
          <p><i class="fas fa-phone-alt"></i> 0101010101</p>
          <p><i class="far fa-envelope"></i> exemple@exemple.ex</p>
        </div>

        <div class="d-flex justify-content-center col-lg-6">
          <form class="col-9 col-lg-12" @submit.prevent="sendMail">
            <div>
              <label for="exampleFormControlInput1" class="form-label"
                >Votre adresse email</label
              >
              <input
                type="email"
                class="form-control"
                placeholder="nom@exemple.com"
                v-model="email"
              />
            </div>
            <label for="exampleFormControlInput1" class="form-label"
              >Ajouter un Objet</label
            >
            <input
              type="text"
              class="form-control"
              placeholder="Service après vente"
              v-model="subject"
            />
            <div class="mb-2">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Message</label
              >
              <textarea class="form-control" rows="2" v-model="text"></textarea>
            </div>
            <button class="btn btn-pastel-green">envoyer</button>
          </form>
        </div>
      </div>
      <div id="mapConteneur" class="col-12 col-lg-6 col-xl-4 d-flex jutify-content-center">
        <Map />
      </div>
    </div>
  </main>
</template>

<script>
import Map from "@/components/leaflet.vue";
import axios from "axios";
import configHelper from "../helpers/configHeader.js";

export default {
  name: "contact",
  data() {
    return {
      email: "",
      subject: "",
      text: "",
    };
  },
  components: {
    Map,
  },
  methods: {
    sendMail() {
      let mail = {
        email: this.email,
        subject: this.subject,
        text: this.text,
      };
      axios.post(configHelper.domain + "/api/mail", mail).then((res) => {
        if (res.status == 200) {
          alert("message envoyé");
        }
      });
    },
  },
};
</script>

<style scoped>
@import "../assets/css/polices-colors.css";
p {
  margin-bottom: 0.7rem;
}
</style>

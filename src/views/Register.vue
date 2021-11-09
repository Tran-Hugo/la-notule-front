<template>
  <main>
    <div
      class="d-flex justify-content-center justify-content-lg-start align-items-center principale"
    >
      <div class="d-flex justify-content-center log-container">
        <form class="col-10 d-flex flex-column" @submit.prevent="submit">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Adresse Email</label
            >
            <input
              type="email"
              @blur="testEmail"
              v-model="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-bind:class="{ 'is-invalid': emailInvalid }"
            />
            <p v-if="emailInvalid" class="text-danger">
              Veuillez entrer un email valide
            </p>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Mot de passe</label
            >
            <input
              type="password"
              @blur="testPassword"
              v-model="password"
              class="form-control"
              v-bind:class="{ 'is-invalid': passwordInvalid }"
            />
            <p v-if="passwordInvalid" class="text-danger">
              minimum 8 caractères, 1 Majuscule, 1 minuscule
            </p>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Confirmez votre mot de passe</label
            >
            <input
              type="password"
              v-model="confirmPassword"
              @blur="testConfirmPassword"
              class="form-control"
              v-bind:class="{ 'is-invalid': nonIdenticalPassword }"
            />
            <p v-if="nonIdenticalPassword" class="text-danger">
              Les mots de passe ne sont pas identiques
            </p>
          </div>
          <div class="d-flex flex-column flex-lg-row">
            <div class="mb-3 col-lg-6 me-lg-2">
              <label for="exampleInputPassword1" class="form-label"
                >Prénom</label
              >
              <input
                type="text"
                v-model="firstName"
                class="form-control"
                @blur="testFirstname"
                v-bind:class="{ 'is-invalid': firstnameInvalid }"
              />
              <p v-if="firstnameInvalid" class="text-danger">
                minimum 2 caractères
              </p>
            </div>
            <div class="mb-3 col-lg-6">
              <label for="exampleInputPassword1" class="form-label">Nom</label>
              <input
                type="text"
                v-model="lastName"
                class="form-control"
                @blur="testLastname"
                v-bind:class="{ 'is-invalid': lastnameInvalid }"
              />
              <p v-if="lastnameInvalid" class="text-danger">
                minimum 2 caractères
              </p>
            </div>
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Adresse postale</label
            >
            <input
              type="text"
              v-model="adress"
              class="form-control"
              @blur="testAdress"
              v-bind:class="{ 'is-invalid': adressInvalid }"
            />
            <p v-if="adressInvalid" class="text-danger">
              minimum 10 caractères
            </p>
          </div>
          <button type="submit" class="btn-re btn align-self-end">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import configHelper from "../helpers/configHeader";

export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      adress: "",
      regEmail: new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
      emailInvalid: false,
      regPassword: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})"),
      passwordInvalid: false,
      nonIdenticalPassword: false,
      firstnameInvalid: false,
      lastnameInvalid: false,
      adressInvalid: false,
    };
  },
  methods: {
    submit() {
      let user = {
        email: this.email.length > 0 ? this.email : null,
        password: this.password.length > 0 ? this.password : null,
        firstname: this.firstName.length > 0 ? this.firstName : null,
        lastname: this.lastName.length > 0 ? this.lastName : null,
        adress: this.adress.length > 0 ? this.adress : null,
        cart: {
          owner: this.lastName,
          total: 0,
        },
      };
      if (
        !this.emailInvalid &&
        !this.passwordInvalid &&
        !this.nonIdenticalPassword &&
        !this.firstnameInvalid &&
        !this.lastnameInvalid &&
        !this.adressInvalid &&
        this.email.length > 0 &&
        this.password.length > 0 &&
        this.firstName.length > 0 &&
        this.lastName.length > 0 &&
        this.adress.length > 0 &&
        this.confirmPassword.length > 0
      ) {
        axios
          .post(configHelper.domain + "/api/users", user)
          .then((res) => {
            if (res.status == 201) {
              this.$router.push("/login");
            }
          })
          .catch((err) => {
            alert(err.response.data["hydra:description"]);
          });
      }
    },
    testEmail() {
      if (this.regEmail.test(this.email) == false) {
        this.emailInvalid = true;
      } else {
        this.emailInvalid = false;
      }
    },
    testPassword() {
      if (this.regPassword.test(this.password) == false) {
        this.passwordInvalid = true;
      } else {
        this.passwordInvalid = false;
      }
    },
    testConfirmPassword() {
      if (this.password === this.confirmPassword) {
        this.nonIdenticalPassword = false;
      } else {
        this.nonIdenticalPassword = true;
      }
    },
    testFirstname() {
      if (this.firstName.length < 2) {
        this.firstnameInvalid = true;
      } else {
        this.firstnameInvalid = false;
      }
    },
    testLastname() {
      if (this.lastName.length < 2) {
        this.lastnameInvalid = true;
      } else {
        this.lastnameInvalid = false;
      }
    },
    testAdress() {
      if (this.adress.length < 10) {
        this.adressInvalid = true;
      } else {
        this.adressInvalid = false;
      }
    },
  },
};
</script>

<style scoped>
main {
  background-image: url("../assets/register.jpg");
  background-size: cover;
}

.log-container {
  background-color: rgba(255, 243, 221, 0.63);
  padding: 1rem;
  border-radius: 5px;
  width: 77%;
  margin: 1rem;
}
p {
  margin: 0;
}
.btn-re {
  background-color: rgba(3, 152, 158, 0.79);
  color: white;
}

@media screen and (min-width: 768px) {
  .principale {
    min-height: 42rem;
  }
}
@media screen and (min-width: 992px) {
  main {
    padding-top: 6vh;
  }
  .principale {
    min-height: 50rem;
    margin-left: 5rem;
  }
  .log-container {
    max-width: 35%;
  }
}
</style>

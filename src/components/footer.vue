<template>
  <footer>
    <div class="conteneur d-flex justify-content-between">
      <div class="d-flex flex-column flex-lg-row">
        <ul>
          <li>
            <router-link :to="{ name: 'contact' }"
              >Contact et infos</router-link
            >
          </li>
          <li><a>Moyens de paiement</a></li>
          <li><a>Livraison</a></li>
          <li><a>CGU</a></li>
        </ul>
        <ul>
          <li><a>Politique d'utilisation des cookies</a></li>
          <li><a>Confidentialité</a></li>
          <li><a>Copyright</a></li>
        </ul>
      </div>

      <div
        class="d-flex justify-content-around align-items-center col-6 col-md-3"
      >
        <a href="https://www.instagram.com/la_notule/?hl=fr"
          ><img
            class="icone"
            src="https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-instagram-new-logo-vector-download-13.png"
            alt="logo ig, instagram new logo vector download"
        /></a>
        <a href="https://www.facebook.com/Lanotule"
          ><img
            class="icone"
            src="https://www.freepnglogos.com/uploads/facebook-logo-13.png"
            alt="logo facebook download png"
        /></a>
        <a href="https://twitter.com/LNotule"
          ><img
            class="icone-twitter"
            src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png"
            alt="twitter bird symbols png logo"
        /></a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  background-color: wheat;
  padding: 3rem 0 2rem 0;
}
ul {
  margin: 0 0 1rem 0;
  list-style-type: none;
}
ul li a {
  text-decoration: none;
  color: black;
  cursor: pointer;
}
.icone {
  width: 2rem;
  height: 2rem;
}
.icone-twitter {
  width: 3rem;
  height: 3rem;
}
</style>

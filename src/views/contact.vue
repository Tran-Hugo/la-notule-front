<template>
    <main>
      <div class="principale mt-3 d-lg-flex align-items-center">
        <div class="d-flex flex-column text-center col-lg-5">
            <h4 class="p-primaire">À propos</h4>
            <p>La notule</p>
            <p>9 Rue Marc Seguin,</p>
            <p>94015 Créteil, France</p>
            <p>Siret: 11111111111111</p>
            <br>
            <h4 class="p-primaire">Contactez-nous</h4>
            <p><i class="fas fa-phone-alt"></i> 0101010101</p>
            <p><i class="far fa-envelope"></i> exemple@exemple.ex</p>
        </div>
        <div class="col-12 col-lg-6 col-xl-5">
            <Map/>
        </div>
      </div>
    </main>
</template>

<script>
import Map from '@/components/leaflet.vue'

export default {
    name:'contact',
    components:{
        Map
    },
}
</script>

<style>
@import '../assets/css/polices-colors.css';
</style>
<template>
    <div id="mapContainer"></div>
</template>

<script>
import L from "leaflet";

export default {
    data(){
        return {
            center: [48.78559445620188, 2.4353308306852246]
        }
    },
    methods: {
   setupLeafletMap: function () {
     const mapDiv = L.map("mapContainer").setView(this.center, 15);
     L.tileLayer(
       "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", // liens pour choisir des cartes "https://wiki.openstreetmap.org/wiki/Tiles#Servers" voire "https://leaflet-extras.github.io/leaflet-providers/preview/"
       {
         attribution:
           '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
         maxZoom: 18,
       }
     ).addTo(mapDiv);
        const marker = L.marker(this.center).addTo(mapDiv)
        marker.bindPopup("Afpa, 9 Rue Marc Seguin, 94015 Créteil").openPopup();
   },
 },
    mounted(){
        this.setupLeafletMap();
    }
}
</script>

<style scoped>
#mapContainer{
  width:100%;
  height: 30rem;
}
</style>
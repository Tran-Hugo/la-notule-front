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
       "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
       {
         attribution:
           'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
         maxZoom: 18,
         id: "mapbox/streets-v11",
         accessToken:"pk.eyJ1IjoiZnNramYiLCJhIjoiY2t2cTIyYnI3NjhydDJ0b2swbGxkcmhpZiJ9.CcNlP8ooLFOusSgW3b2JwQ",
       }
     ).addTo(mapDiv);
    const circle = L.circle(this.center, {
                                color: 'red',
                                fillColor: '#f03',
                                fillOpacity: 0.5,
                                radius: 20
                            }).addTo(mapDiv);
        circle.bindPopup("Afpa, 9 Rue Marc Seguin, 94015 Créteil").openPopup();
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
<template>
    <div v-if="geolocationPositionError" class="alert alert-danger m-3" role="alert">Problema de Geolocalización.
        Compruebe la red o si su ubicación está activa.
    </div>
    <div v-else data-set="data" ref="mapDiv" style="margin:.5em 0;width: 100%; height: 50vh; "></div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader";
//Lanzamiento asíncrona
/**
 * Función asíncrona que lanza el lodader 
 */
//let geolocationBool = ref(false);
const mapDiv = ref(null);

// const theLoader = new Loader({ apiKey: props.google_maps_api_key });
// let map, infoWindow, marker;



//Función callback anónima y lanzada automáticamente
// (async () => {
//     try {
//         // Inciamos loader de Google
//         if (!theLoader.loading)
//             await theLoader.load();
//         // Coordenadas actuales
//         let { lat, lng } = await getCoords();
//         //Cargamos los valores del formulario
//         location.latitude = lat;
//         location.longitude = lng;
//         //cargamos mapa y colocamos valores
//         map = new google.maps.Map(mapDiv.value, {
//             center: {
//                 lat: lat, lng: lng
//             },
//             zoom: 12,
//         });
//         //Cargamos marcador
//         marker = new google.maps.Marker({
//             map: map,
//             draggable: true,
//             animation: google.maps.Animation.DROP,
//             position: {
//                 lat: lat,
//                 lng: lng
//             },
//             icon: './googlemaps128x128.png',
//         });
//         // Agregamos el listener para capturar el click y movimiento del marcador
//         marker.addListener("click", function () {
//             if (marker.getAnimation() !== null) {
//                 marker.setAnimation(null);
//             } else {
//                 marker.setAnimation(google.maps.Animation.BOUNCE);
//             }
//         });
//         // Capturamos cuando la posición del marcador cambie y realizamos la acción que se requiera
//         google.maps.event.addListener(marker, "position_changed", function () {
//             var lat = marker.getPosition().lat();
//             var lng = marker.getPosition().lng();

//             // console.log('Latitude: ' + lat);
//             // console.log('Longitude: ' + lng);

//             //Pintamos en el formulario
//             location.latitude = lat;
//             location.longitude = lng;

//         });
//         infoWindow = new google.maps.InfoWindow();
//         infoWindow.setPosition({ lat, lng });
//         infoWindow.setContent(`Latitude: ${lat}|Lonxitude: ${lng}.<br> Despraze o marcador para un mellor axuste.`);
//         infoWindow.open(map);
//     } catch (error) {
//         console.log(error);
//         geolocationPositionError.value = true;
//     }
// })();
</script>
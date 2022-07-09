<template>
    <label for="latitud" class="form-label required">
        Latitude
        <span data-set="Campo obligatorio" class="text-danger">*</span>
    </label>
    <input id="latitud" required name="latitud" v-model.number="location.latitude" type="number" step="any"
        placeholder="43.5060736" class="field__control form-control" />
    <strong v-if="!location.latitude" class="alert alert-danger m-3" role="alert">Debe escoller unha latitude</strong>


    <label for="longitude" class="form-label required">
        Lonxitude
        <span data-set="Campo obligatorio" class="text-danger">*</span>
    </label>
    <input id="longitude" required name="longitude" v-model.number="location.longitude" step="any" type="number"
        placeholder="-8.2051072" class="field__control form-control" />
    <strong v-if="!location.longitude" class="alert alert-danger m-3" role="alert">Debe escoller unha lonxitude
    </strong>



    <input type="button" @click="onClickGetCoords" class="btn btn-primary mt-2"
        :value="loading ? 'Cargando...' : 'Reseteo ubicación'" :disabled="loading" />

    <strong v-if="errorStr.length" class="alert alert-danger m-3" role="alert">
        {{ errorStr }}
    </strong>
</template>

<script setup>

//Deependencias
import { ref, inject } from "vue";


const props = defineProps({
    google_maps_api_key: {
        type: String,
        value: "AIzaSyAIoIZPEpf-sWgO6z285Afba4FADowz5Xk",
        required: true,
    }
});

/**
 * @type {Object} location: { latitude: Number, longitude: Number }
 * @description Objeto con las propiedade de latitud y longitud para geolocalizar un elemento 
 */
const location = inject('location');

let errorStr = ref("");
let loading = ref(false);//loading para que el usuario sepa el tiempo de espera



/**
 * Obtención de coordenadas a través del objeto navigator.geolocation
 * Utilizamos una promesa para garantizar la espera de los datos antes de una llamada que tenga que esperar los datos
 * @return {Object} { lat: Number, lng: Number} Coordenadas de latitud y longitud
 */
const getCoords = async () => {

    const pos = await new Promise((resolve, reject) => {
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
         * Syntax:
         * getCurrentPosition(success)
         * getCurrentPosition(success, error)
         * getCurrentPosition(success, error, options)
         */
        navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
                maximumAge: 60000,
                timeout: 10000,
                enableHighAccuracy: true
            }
        );
    });
    return {
        lng: pos.coords.longitude,
        lat: pos.coords.latitude,
    };
}
/**
 * Método que nos devuelve las coordenadas.
 */
const onClickGetCoords = async () => {
    errorStr.value = '';
    if (!window.navigator.geolocation) {
        errorStr.value = "La Geolocalización no está disponible";
        return;
    }
    try {
        loading.value = true;
        // Coordenadas actuales
        let { lat, lng } = await getCoords();
        //Cargamos los valores del formulario
        location.latitude = lat;
        location.longitude = lng;

        // if (marker && marker.position) {
        //     let latlng = new google.maps.LatLng(lat, lng);
        //     marker.setPosition(latlng);
        // }

    } catch (error) {
        errorStr.value = error.message;
    } finally {
        loading.value = false;
    }
}
</script>
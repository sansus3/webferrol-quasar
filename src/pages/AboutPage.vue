<template>
    <q-page padding>
        <h1 class="text-h4 text-right q-mr-lg">Acerca de</h1>
        <pre>
            {{ form }}
        </pre>
        <the-geolocation google_maps_api_key="AIzaSyAIoIZPEpf-sWgO6z285Afba4FADowz5Xk"></the-geolocation>
    </q-page>
</template>

<script setup>
import { reactive, provide } from 'vue';
import TheGeolocation from 'src/components/TheGeolocation.vue';
const form = reactive({
    location: { latitude: 0, longitude: 0 }
})
provide('location', form.location);


</script>
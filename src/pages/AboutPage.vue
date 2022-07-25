<template>
    <q-page padding>
        <h1 class="text-h4 text-right q-mr-lg">Acerca de</h1>

        <div class="q-pa-md row items-start q-gutter-md">

            <q-card v-for="item of datos?.data" :key="item.id" dark bordered class="bg-grey-9 my-card">
                <q-card-section>
                    <div class="text-h6">{{ item.title }}</div>
                    <div class="text-subtitle2">{{ item.dateStart }}</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <pre>{{ datos }}</pre>
                </q-card-section>
            </q-card>
        </div>
        <q-pagination v-if="max" input v-model="$current" :max="max" :boundary-links="false" direction-links />
    </q-page>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useDB } from '../cloud.firestore';
const db = useDB('workExperience');
const { initPage, nextPage, previousPage, totalPages } = db;
const datos = ref(null);
const max = ref(0);//Número de páginas máximas que hay
const $current = ref(0);//página en la que nos encontramos actualmente
const perPage = 2;

//Datos imprescindibles al cargar la página
const start = async () => {
    try {
        max.value = await totalPages(perPage);
        $current.value = 1;
        //console.log(datos.value)
    } catch (error) {
        console.log('error-->', error)
    }

}
start()

// Ejecuta la función cuando cambia la variable reactiva $current.
// La función callback puede obtener el valor actual (current) y anterior (prev).
watch($current, async (current, prev) => {
    //console.log(`watch => current: ${current} prev: ${prev}`);
    if (current === 1) {
        datos.value = await initPage('dateEnd', perPage);
    }
    else if (current > prev)
        datos.value = await nextPage('dateEnd', datos.value.last, perPage);
    else
        datos.value = await previousPage('dateEnd', datos.value.last, perPage);
});

</script>
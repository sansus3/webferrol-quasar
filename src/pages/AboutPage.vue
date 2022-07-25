<template>
    <q-page padding>
        <h1 class="text-h4 text-right q-mr-lg">Acerca de</h1>
        <q-pagination v-if="max" input v-model="$current" :max="max" :boundary-links="false" direction-links />
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card v-for="item of datos?.data" :key="item.id" bordered>
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">{{ item.title }}</div>
                    <div class="text-subtitle2">{{ getDayMonthFullYear(item.dateEnd) }}</div>
                </q-card-section>

                <q-card-section>
                    <q-list>
                        <q-item-section>
                            <q-item-label>{{ item.title }}</q-item-label>
                            <q-item-label>{{ item.place }}</q-item-label>
                            <q-item-label>{{ item.jobTitle }}</q-item-label>
                            <q-item-label>{{ item.code }}</q-item-label>
                        </q-item-section>
                    </q-list>
                    <!-- <pre>{{ datos }}</pre> -->
                </q-card-section>
            </q-card>
        </div>
        <q-ajax-bar ref="bar" position="bottom" color="accent" size="10px" skip-hijack />
    </q-page>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useDB } from '../cloud.firestore';
import { getDayMonthFullYear } from '../functions'
const db = useDB('workExperience');
const { initPage, nextPage, previousPage, totalPages } = db;
const bar = ref(null);
const datos = ref(null);
const max = ref(0);//Número de páginas máximas que hay
const $current = ref(0);//página en la que nos encontramos actualmente
const perPage = 4;

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
    const barRef = bar.value;
    barRef.start()
    //console.log(`watch => current: ${current} prev: ${prev}`);
    if (current === 1) {
        datos.value = await initPage('dateEnd', perPage);
    }
    else if (current > prev)
        datos.value = await nextPage('dateEnd', datos.value.last, perPage);
    else
        datos.value = await previousPage('dateEnd', datos.value.last, perPage);
    barRef.stop()
});
</script>
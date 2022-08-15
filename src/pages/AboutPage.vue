<template>
    <q-page padding>
        <h1 class="text-h4 text-right q-mr-lg">Acerca de</h1>
        <q-pagination v-if="max" input v-model="$current" :max="max" :boundary-links="false" direction-links />
        <div class="q-pa-md row items-start q-gutter-md">
            <skeleton-card v-if="loading" style="display:flex;gap: 1rem; flex-wrap: wrap"></skeleton-card>
            <div v-else style="display:flex; gap: 1rem; flex-wrap: wrap">
                <q-card v-for="item of datos?.data" :key="item.id" bordered style="width: 300px">

                    <q-card-section class="bg-primary text-white">
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-item-label><span class="text-subtitle1">{{ item.title
                                    }}</span></q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-badge color="orange" :label="getDayMonthFullYear(item.dateStart)">
                                    </q-badge>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label><span class="text-subtitle2">{{ item.code }}</span></q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                    <q-card-section>
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-item-label>Lugar</q-item-label>
                                    <q-item-label caption>{{ item.place }}</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-badge color="teal" :label="item.province">
                                        <q-icon name="location_on" size="14px" class="q-ml-xs" />
                                    </q-badge>
                                </q-item-section>
                            </q-item>
                            <q-separator spaced inset></q-separator>
                            <q-item>
                                <q-item-section>
                                    <q-item-label>Puesto</q-item-label>
                                    <q-item-label caption>{{ item.jobTitle }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-separator spaced inset></q-separator>
                            <q-item>
                                <q-item-section>
                                    <div class="experience text-body1" v-html="item.comments"></div>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <!-- <pre>{{ datos.data }}</pre> -->
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <q-ajax-bar ref="bar" position="bottom" color="accent" size="10px" skip-hijack />
    </q-page>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useDB } from '../cloud.firestore';
import { getDayMonthFullYear } from '../functions'
import SkeletonCard from '../components/skeletons/SkeletonCard.vue';

const db = useDB('workExperience');
const { initPage, nextPage, previousPage, totalPages } = db;
const loading = ref(false);
const bar = ref(null);
const datos = ref(null);
const max = ref(0);//Número de páginas máximas que hay
const $current = ref(0);//página en la que nos encontramos actualmente
const perPage = 8;

//Datos imprescindibles al cargar la página
const start = async () => {
    try {
        loading.value = true;
        max.value = await totalPages(perPage);
        $current.value = 1;
        //console.log(datos.value)
    } catch (error) {
        console.log('error-->', error)
    } finally {
        loading.value = false;
    }

}
start()

// Ejecuta la función cuando cambia la variable reactiva $current.
// La función callback puede obtener el valor actual (current) y anterior (prev).
watch($current, async (current, prev) => {
    const barRef = bar.value;
    barRef.start()
    try {
        if (current === 1) {
            datos.value = await initPage('dateStart', perPage);
        }
        else if (current > prev)
            datos.value = await nextPage('dateStart', datos.value.last, perPage);
        else
            datos.value = await previousPage('dateStart', datos.value.last, perPage);
    } catch (error) {
        console.log(error)
    } finally {
        barRef.stop()
    }
});
</script>
<style lang="scss">
.experience {
    a {
        color: $red-10;
    }
}
</style>
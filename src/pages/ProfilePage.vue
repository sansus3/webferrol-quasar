<template>
    <div class="q-pa-md">
        <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div v-show="showSimulatedReturnData">
                <q-carousel swipeable animated arrows v-model="slide" v-model:fullscreen="fullscreen" infinite>
                    <q-carousel-slide v-for="file of store.portfolio" :key="file.index" :name="file.index" :img-src="file.url" />
                    <template v-slot:control>
                        <q-carousel-control position="bottom-right" :offset="[18, 18]">
                            <q-btn push round dense color="white" text-color="primary"
                                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                                @click="fullscreen = !fullscreen" />
                        </q-carousel-control>
                    </template>
                </q-carousel>
            </div>
        </transition>
        <q-inner-loading :showing="visible">
            <q-spinner-gears size="xl" color="primary" />
        </q-inner-loading>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { useStoreProfile } from 'src/stores/profile';
import { ref } from 'vue'
const slide = ref(1);
const fullscreen = ref(false)
const files = ref([]);
const showSimulatedReturnData = ref(true);
const visible = ref(false);
const store = useStoreProfile();

const $q = useQuasar();


(async () => {
    try {
        showSimulatedReturnData.value = false;
        visible.value = true;
        files.value = await store.setPortfolio();
        if (!store.portfolio.length)
            throw new Error("No se encontraron imágenes del Proyecto")
    } catch (error) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: `${error.message}`
        })
        console.log("Error--->", error)
    } finally {
        showSimulatedReturnData.value = true;
        visible.value = false;
    }

    //console.log(files.value)
})();
</script>
<template>
    <div class="q-pa-md">
        <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div v-show="showSimulatedReturnData">
                <q-carousel swipeable animated arrows v-model="slide" v-model:fullscreen="fullscreen" infinite>
                    <q-carousel-slide v-for="file of files" :key="file.index" :name="file.index" :img-src="file.url" />
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
import { ref } from 'vue'
import { useNotify } from '../hooks/TheNotify';
import { listAllUrls } from '../storage';
const slide = ref(1);
const fullscreen = ref(false)
const files = ref([]);
const showSimulatedReturnData = ref(true);
const visible = ref(false);
const { error } = useNotify();

(async () => {
    try {
        showSimulatedReturnData.value = false;
        visible.value = true;
        files.value = await listAllUrls('proyectos');
        if (!files.value.length)
            throw new Error("No se encontraron imágenes del Proyecto")
    } catch (err) {
        ok(err.message);
    } finally {
        showSimulatedReturnData.value = true;
        visible.value = false;
    }
})();
</script>
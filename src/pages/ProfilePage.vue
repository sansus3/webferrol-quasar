<template>
    <div class="q-pa-md">
        <q-carousel swipeable animated arrows v-model="slide" v-model:fullscreen="fullscreen" infinite>
            <q-carousel-slide v-for="file of files" :key="file.index" :name="file.index" :img-src="file.url" />

            <template v-slot:control>
                <q-carousel-control position="bottom-right" :offset="[18, 18]">
                    <q-btn push round dense color="white" text-color="primary"
                        :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="fullscreen = !fullscreen" />
                </q-carousel-control>
            </template>
        </q-carousel>
    </div>
</template>

<script setup>
import { listAllUrls } from '../storage';
import { ref } from 'vue'
const slide = ref(1);
const fullscreen = ref(false)
const files = ref([]);


(async () => {
    files.value = await listAllUrls('proyectos');
    //console.log(files.value)
})();
</script>
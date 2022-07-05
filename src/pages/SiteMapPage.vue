<template>
    <q-page padding>
        <div class="q-pa-md row justify-center">
            <div class="col">
                <div class="q-pa-md q-gutter-sm">
                    <q-btn label="Ver routes.js" color="primary" @click="alert = true" />
                    <q-dialog v-model="alert">
                        <q-card>
                            <q-card-section>
                                <div class="text-h6">Ver routes.js</div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                {{ routes[0].children }}
                            </q-card-section>

                            <q-card-actions align="right">
                                <q-btn flat label="OK" color="primary" v-close-popup />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                </div>
                <q-list bordered separator>
                    <q-item v-for="(item, index) of routes[0].children" :key="index" clickable v-ripple>
                        <q-item-section @click="handleRoute(item?.path)">
                            <q-item-label>{{ item?.meta?.title ?? 'Inicio' }}</q-item-label>
                            <q-item-label caption>{{ item?.path }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { routes } from '../router/routes'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const alert = ref(false);

const handleRoute = route => {
    route = route.length ? route : '/';
    router.push(route);
}
</script>

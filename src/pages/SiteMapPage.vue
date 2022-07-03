<template>
    <q-page padding>
        <div class="q-pa-md row justify-center">
            <div class="col">
                <h1 class="text-h5">
                    Mapa del sitio {{ routes[0].children }}
                </h1>
                <q-list bordered separator>
                    <q-item v-for="(item, index) of routes[0].children" :key="index" clickable v-ripple>
                        <q-item-section @click="go(item?.path)">
                            <q-item-label>{{ item?.name }}</q-item-label>
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
const router = useRouter();

const go = route => {
    route = route.length ? route : '/';
    router.push(route);
}
</script>

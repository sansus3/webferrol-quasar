<template>
    <q-layout view="hHh lpR fFf">

        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    Title
                </q-toolbar-title>

                <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
            </q-toolbar>

            <q-tabs align="left">
                <q-route-tab to="/page1" label="Page One" />
                <q-route-tab to="/page2" label="Page Two" />
                <q-route-tab to="/about" label="Acerca de" />
            </q-tabs>
        </q-header>

        <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
            <!-- drawer content -->
            {{ store.user?.email }}
            <!-- botón ejemplo -->
            <q-btn :loading="loading" color="primary" @click="simulateProgress()" style="width: 150px">
                Button
                <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Loading...
                </template>
            </q-btn>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer elevated class="bg-grey-8 text-white">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    <div>Title</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>

    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useStoreUsers } from 'src/stores/users';
const store = useStoreUsers();
const rightDrawerOpen = ref(false)
const loading = ref(false)
const toggleRightDrawer = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value
}
const simulateProgress = async () => {
    try {
        // we set loading state
        loading.value = true
        store.loginOut();
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}
</script>
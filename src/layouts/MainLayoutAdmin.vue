<template>
    <q-layout view="hHh lpR fFf" v-if="store.user">
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
                <q-route-tab to="/admin" label="Inicio" />
                <q-route-tab to="/admin/profile" label="Perfil" />
                <q-route-tab to="/sitemap" label="Zona Pública" />
            </q-tabs>
        </q-header>

        <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
            <!-- drawer content -->
            <q-card class="my-card" flat bordered>
                <q-item>
                    <q-item-section avatar>
                        <q-avatar rounded>
                            <img :src="store.user?.photoURL ?? 'https://cdn.quasar.dev/img/boy-avatar.png'">
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>{{ store.user?.displayName ?? '' }}</q-item-label>
                        <q-item-label caption>
                            {{ store.user?.email ?? '' }}
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-card-actions>
                    <q-avatar flat icon="login" />
                    <q-badge outline text-color="blue-grey-13">
                        <span class="text-subtitle2">{{ store.getLastLoginAt ?? '' }}</span>
                    </q-badge>
                    <q-btn @click="simulateProgress()" flat color="negative">
                        Logout
                    </q-btn>
                </q-card-actions>
            </q-card>
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
import { useRouter } from 'vue-router';
const store = useStoreUsers();
const router = useRouter();
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
        router.push('/');
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}
</script>
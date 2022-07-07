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
                <q-route-tab to="/admin" label="Inicio" />
                <q-route-tab to="/sitemap" label="Zona Pública" />
                <q-route-tab to="/admin/profile" label="Perfil" />
            </q-tabs>
        </q-header>

        <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
            <!-- drawer content -->
            <q-card class="my-card" flat bordered>
                <q-item>
                    <q-item-section avatar>
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>Title</q-item-label>
                        <q-item-label caption>
                            {{ store.user?.email }}
                        </q-item-label>
                    </q-item-section>
                </q-item>

                <q-separator />

                <q-card-section horizontal>
                    <q-card-section>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis numquam nesciunt porro
                        eveniet non vitae obcaecati doloribus natus eum consequuntur, rem voluptas autem maiores
                        provident quisquam magnam nulla quasi placeat!
                    </q-card-section>

                    <q-separator vertical />

                    <q-card-section class="col-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </q-card-section>
                </q-card-section>
                <q-separator />
                <q-card-actions>
                    <q-btn flat round icon="event" />
                    <q-btn flat>
                        7:30PM
                    </q-btn>
                    <q-btn @click="simulateProgress()" flat color="primary">
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
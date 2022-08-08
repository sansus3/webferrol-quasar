<script setup>
import { useStoreUsers } from '../stores/users';
const user = useStoreUsers();
const getFullYear = () => new Date().getFullYear();
</script>
<template>
    <q-layout view="hHh lpR fFf">

        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title>
                    <router-link class="text-white" style="text-decoration:none" :to="{
                        name: 'Home',
                    }">
                        WebFerrol
                    </router-link>
                </q-toolbar-title>
                <q-btn-group flat push v-if="!user.user">
                    <q-btn text-color="white" :outline="$route.name === 'SignIn'" label="Login" icon="login"
                        :to="{ name: 'SignIn' }" />
                    <q-btn text-color="white" :outline="$route.name === 'Register'" label="Registro"
                        :to="{ name: 'Register' }" />
                </q-btn-group>
                <q-btn v-else :to="{
                    name: 'Admin'
                }" flat round dense icon="admin_panel_settings" />
            </q-toolbar>

            <q-tabs align="left">
                <!-- <q-tab name="images" label="Images" />
                <q-tab name="videos" label="Videos" /> -->
                <q-route-tab :to="{
                    name: 'Rooms'
                }" label="Salas" />
            </q-tabs>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer bordered class="bg-grey-8 text-white">
            <q-toolbar>
                <q-toolbar-title>
                    <div class="text-subtitle1">WebFerrol © {{ getFullYear() }} por Xurxo González Tenreiro</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>

    </q-layout>
</template>
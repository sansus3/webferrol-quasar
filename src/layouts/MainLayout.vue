<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          WebFerrol
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          {{ $route.name }}
        </q-item-label>
        <!-- v-if="link.meta?.authRoute" -->
        <div v-for="link of essentialLinks" :key="link.name">
          <EssentialLink v-if="!link.meta?.authRoute || (!store.user && link.meta?.authRoute)"
            :title="link.meta?.title ?? 'Home'" :caption="link.name" :link="link?.path.length ? link?.path : '/'"
            :icon="link.meta?.icon ?? ''" />
        </div>
        <EssentialLink title="Admin" caption="Zona administrativa" link="/admin" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { routes } from '../router/routes'
import EssentialLink from 'components/EssentialLink.vue'
import { useStoreUsers } from '../stores/users';

const store = useStoreUsers();
const essentialLinks = [...routes[0].children];
essentialLinks.shift();
//console.log(essentialLinks)
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

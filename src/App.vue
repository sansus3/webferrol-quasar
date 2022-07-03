<template>
  <router-view />
</template>

<script setup>
import { useStoreUsers } from './stores/users';
const store = useStoreUsers();

(async () => {
  await store.onAuthState()
})()

// import { defineComponent } from 'vue'

// export default defineComponent({
//   name: 'App'
// })
</script>

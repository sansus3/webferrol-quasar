<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form class="q-gutter-md">
      <q-input v-model="store.user.email" label="Cuenta de Usuario*" :disable="true" />

      <q-input fill-mask="''" v-model.trim="store.user.displayName" filled label="Nombre"
        hint="Nombre y apellidos del usuario" />






    </q-form>


    <div class="q-pa-md">
      <q-uploader :factory="factoryFn" style="max-width: 300px" accept="image/jpeg" />
    </div>

  </div>
</template>

<script setup>
import { useStoreUsers } from 'src/stores/users';
const store = useStoreUsers();


const factoryFn = (files) => {
  console.log(files)
}
</script>
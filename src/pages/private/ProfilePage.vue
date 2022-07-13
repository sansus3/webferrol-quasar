<template>
  <div class="q-pa-md row">
    <div class="col-12 col-sm-6">
      <div class="q-pa-md">
        <q-form class="q-gutter-md" @submit="onSubmit">
          <q-input v-model="store.user.email" label="Cuenta de Usuario*" :disable="true" />
          <q-input v-model.trim="store.user.displayName" filled label="Nombre" hint="Nombre y apellidos del usuario"
            lazy-rules :rules="[
            value => value.length > 3 || 'Introduzca por lo menos 4 caracteres']" />
          <q-btn :disable="disabled" label="Actualizar" type="submit" color="primary" />
        </q-form>
      </div>
    </div>
    <div class="col-12 col-sm-6 q-pa-md">
      <q-list>
        <q-item>
          <q-uploader label="Foto de perfil" @failed="handleFailed" :factory="onUpload" accept="image/jpeg" />

        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img :src="store.user?.photoURL ?? 'https://cdn.quasar.dev/img/boy-avatar.png'">
            </q-avatar>
          </q-item-section>
          <q-item-section>Imagen del perfil</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useStoreUsers } from 'src/stores/users';
const store = useStoreUsers();
const $q = useQuasar();
const disabled = ref(false);



const onSubmit = async () => {
  try {
    disabled.value = true;
    await store.onUpdateProfile({ displayName: store.user.displayName });
    $q.notify({
      color: 'green-5',
      textColor: 'white',
      icon: 'check',
      message: `Perfil de usuario actualizado`
    })
  } catch (error) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: `${error.message}`
    })
  } finally {
    disabled.value = false;
  }

}

const onUpload = async (files) => {
  if (files) {
    try {
      await store.onUploadProfile(files[0]);
      $q.notify({
        color: 'green-5',
        textColor: 'white',
        icon: 'check',
        message: `Foto de imagen subida`
      })
    }
    catch (error) {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: `${error.message}`
      })
    }
  }
}



const handleFailed = error => {
  $q.notify({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message: `${error}`
  })
}
</script>
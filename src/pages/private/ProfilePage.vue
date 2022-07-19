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
          <q-uploader :label="`Foto de perfil (max: ${maxFileSize} bytes)`" @failed="handleFailed"
            @rejected="handleRejected" :factory="onUpload" accept="image/jpeg" :max-file-size="maxFileSize" />

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
const maxFileSize = ref(150000);
const $q = useQuasar();
const disabled = ref(false);

/**
 * @description Emitted after files are picked and some do not pass the validation props (accept, max-file-size, max-total-size, filter, etc)
 * @param {*} rejectedEntries 
 */
const handleRejected = rejectedEntries => {
  $q.notify({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message: `${rejectedEntries.length} imagen(es) no pasa(n) las restricciones: 1. Tamaño máximo (${maxFileSize.value} bytes)`
  })
}

// Actualización del campo displayName del usuario Authentication de Firebase
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
// Subida de la foto de de usuario al Storage de firestore y guardando la ruta en Authentication
const onUpload = (files) => {
  if (files && files.length) {
    try {
      files.forEach(async file => {
        await store.onUploadProfile(file);
      });

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
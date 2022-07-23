<template>
  <div class="q-pa-md row">
    <div class="col-12 col-sm-6">
      <div class="q-pa-md">
        <q-form class="q-gutter-md" @submit="onSubmit">
          <!-- Email -->
          <div>
            <div class="text-h6">Correo electrónico</div>
            <div>
              <q-toggle @change="emailDisable = !emailDisable" v-model="emailDisable" checked-icon="check" color="red"
                label="Editar Correo" unchecked-icon="clear" />
            </div>
            <div>

              <q-input v-model="form.email" label="Email de Usuario*" :disable="!emailDisable" lazy-rules
                :rules="[isValidEmail]" />
            </div>
          </div>
          <!-- End Email -->
          <!-- Perfil de usuario -->
          <div>
            <div class="text-h6">Nombre de perfil</div>
            <q-input v-model.trim="form.displayName" filled label="Nombre" hint="Nombre y apellidos del usuario"
              :disable="emailDisable" lazy-rules :rules="[
              value => value.length > 3 || 'Introduzca por lo menos 4 caracteres']" />
          </div>
          <!-- End perfil de usuario -->
          <q-btn :disable="btnUpdateDisable" label="Actualizar" type="submit" color="primary" />
        </q-form>
      </div>
    </div>
    <div class="col-12 col-sm-6 q-pa-md">
      <!-- password -->
      <div class="q-mb-sm">
        <q-form class="q-gutter-md" @submit="handlePassword" @reset="handleReset">
          <div class="text-h6">Cambio de contraseña</div>
          <q-input v-model.trim="form.password" outlined label="Nueva contraseña*"
            :rules="[value => (value.length < 1 || value.length > 5) || 'La contraseña debe de tener por lo menos 6 caracteres']"
            type="password">
            <template v-slot:prepend>
              <q-icon name="password" color="teal" />
            </template>
          </q-input>

          <q-input v-model.trim="form.passwordRepeat" outlined label="Repita contraseña*" type="password"
            :rules="[passwordValidate]">
            <template v-slot:prepend>
              <q-icon name="password" color="teal" />
            </template>
          </q-input>
          <div>
            <q-btn :disable="btnUpdateDisable" label="Cambiar" type="submit" color="primary" />
            <q-btn label="Reseteo" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
      <!-- End password -->
      <!-- Foto perfil de usuario -->
      <div class="q-mt-xl">
        <div class="text-h6">Foto de perfil del usuario</div>
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
      <!-- End Foto perfil de usuario -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStoreUsers } from 'src/stores/users';
import { isValidEmail } from '../../functions';
import { useNotify } from '../../hooks/TheNotify';

const store = useStoreUsers();
const { error, ok } = useNotify();
const maxFileSize = ref(150000);
const btnUpdateDisable = ref(false);
const emailDisable = ref(false);
const form = ref({
  displayName: store.user.displayName,
  email: store.user.email,
  password: '',
  passwordRepeat: ''
}
);

/**
 * Función que comprueba si las contaseñas son coincidentes
 * @param {String} value Texto introducido en el control del formulario passwordRepeat
 */
const passwordValidate = value => {
  return value === form.value.password || 'Las contraseñas no coinciden'
}
/**
 * Función que resetean los controles del formulario de las contraseñas
 */
const handleReset = () => {
  form.value.passwordRepeat = '';
  form.value.password = '';
}

const handlePassword = async () => {
  try {
    btnUpdateDisable.value = true;
    if (!form.value.password.length)
      throw new Error('Debe introducir una contraseña nueva');
    await store.onUpdatePassword(form.value.password);
    ok(`Cambio de contraseña realizada`);
  } catch (err) {
    error(err.message);
  } finally {
    btnUpdateDisable.value = false;
  }
}

/**
 * @description Emitted after files are picked and some do not pass the validation props (accept, max-file-size, max-total-size, filter, etc)
 * @param {*} rejectedEntries 
 */
const handleRejected = rejectedEntries => {
  error(`${rejectedEntries.length} imagen(es) no pasa(n) las restricciones: 1. Tamaño máximo (${maxFileSize.value} bytes)`);
}

// Actualización del campo displayName del usuario Authentication de Firebase
const onSubmit = async () => {
  let message = '';
  try {
    btnUpdateDisable.value = true;
    ;
    if (emailDisable.value) {
      if (form.value.email === store.user.email)
        throw new Error('El campo correo no ha sido modificado');
      await store.onUpdateEmail(form.value.email);
      store.user.email = form.value.email;
      message = `El correo de ${store.user.displayName} ha sido actualizado.`;
    } else {
      if (form.value.displayName === store.user.displayName)
        throw new Error('El campo perfil de usuario no ha sido modificado');
      await store.onUpdateProfile({ displayName: form.value.displayName })
      store.user.displayName = form.value.displayName;
      message = 'Nombre del perfil de usuario actualizado.';
    }
    //Si todo va bien lo notificamos
    ok(message);
  } catch (err) {
    error(err.message);
  } finally {
    btnUpdateDisable.value = false;
  }

}
// Subida de la foto de de usuario al Storage de firestore y guardando la ruta en Authentication
const onUpload = (files) => {
  if (files && files.length) {
    try {
      files.forEach(async file => {
        await store.onUploadProfile(file);
      });
      ok(`Foto de imagen subida`);
    }
    catch (err) {
      error(err.message);
    }
  }
}


//Notificación de error en caso de algún tipo de fallo de subida de imagen
const handleFailed = err => {
  error(err.message);
}
</script>
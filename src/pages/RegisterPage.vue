<template>
    <q-page padding>
        <h1 class="text-h5">Registro de usuarios</h1>
        <div class="q-pa-md">
            <q-form @submit="handleSubmit" @reset="handleReset">

                <q-input class="q-ma-md" v-model="form.email" outlined label="Correo electrónico*" type="text"
                    lazy-rules :rules="[isValidEmail]">
                    <template v-slot:append>
                        <q-icon name="email" color="teal" />
                    </template>
                </q-input>

                <q-input class="q-ma-md" v-model.trim="form.password" outlined label="Contraseña*"
                    :rules="[value => value.length > 5 || 'La contraseña debe de tener por lo menos 6 caracteres']"
                    type="password">
                    <template v-slot:prepend>
                        <q-icon name="password" color="teal" />
                    </template>
                </q-input>

                <q-input class="q-ma-md" v-model.trim="form.passwordRepeat" outlined label="Repita contraseña"
                    type="password" :rules="[pass]">
                    <template v-slot:prepend>
                        <q-icon name="password" color="teal" />
                    </template>
                </q-input>

                <div>
                    <q-btn label="Acceder" type="submit" color="primary" />
                    <q-btn label="Reseteo" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
        </div>

    </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useStoreUsers } from 'src/stores/users';
import { isValidEmail } from 'src/functions';

const store = useStoreUsers();
const router = useRouter();
const $q = useQuasar();

const form = ref({
    email: 'homegoma@gmail.com',
    password: '',
    passwordRepeat: '',
});


const pass = value => {
    return value === form.value.password || 'Las contraseñas no coinciden'
}


const handleSubmit = async () => {
    try {
        await store.onCreateUserWithEmailAndPassword(form.value);
        router.push({
            name: 'Admin'
        });
    } catch (error) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: error.message
        });
        //console.log(error)
    }
}
const handleReset = () => {
    form.value.email = '';
    form.value.password = '';
}
</script>
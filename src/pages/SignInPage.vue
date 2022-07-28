<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStoreUsers } from 'src/stores/users';
import { isValidEmail } from 'src/functions';
import { useNotify } from '../hooks/TheNotify';

const email = ref('');
const password = ref('');
const accept = ref(false);
const loading = ref(false);
const router = useRouter();
const { error, ok } = useNotify();

//Envíamos un correo de Reseteo de password de email en caso de que no se acuerde de ella
const handleSendPasswordResetEmail = async () => {
    try {
        if (!email.value.length)
            throw new Error('No hay correo seleccionado');
        const store = useStoreUsers();
        await store.onSendPasswordResetEmail(email.value);
        ok(`Sigue las instrucciones en tu correo ${email.value} para restablecer la contraseña.`);
    } catch (err) {
        error(err.message);
    }
}

//Validación de formulario y en caso de éxito de acceso redirección
const onSubmit = async () => {
    const store = useStoreUsers();
    try {
        if (accept.value !== true)
            throw new Error('Primero debe aceptar la licencia y los términos');
        await store.signIn({ email: email.value, password: password.value })
        router.push('/admin');
    } catch (err) {
        error(err.message);
    }
}
//Limpieza de campos del formulario
const onReset = () => {
    email.value = null
    password.value = null
    accept.value = false
}
</script>

<template>
    <q-page padding>
        <h1 class="text-h5">Sign in</h1>
        <div class="q-pa-md" style="max-width: 400px">

            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input filled v-model.trim="email" label="Su email *" hint="Correo electrónico" lazy-rules
                    :rules="[isValidEmail]" />

                <q-input filled type="password" v-model="password" label="Su contraña *" lazy-rules :rules="[
                    val => val && val.length > 0 || 'Escriba su contraseña'
                ]" />

                <q-toggle v-model="accept" label="Acepto la licencia y los términos" />

                <div>
                    <q-btn label="Acceder" type="submit" color="primary" />
                    <q-btn label="Borrar" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
            <q-btn class="q-mt-sm" @click="handleSendPasswordResetEmail" :loading="loading" flat style="color: #FF0080"
                label="¿Olvidaste la contraseña?" />
        </div>
    </q-page>
</template>
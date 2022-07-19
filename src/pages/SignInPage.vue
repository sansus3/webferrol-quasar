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
                    <q-btn label="Reseteo" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>

        </div>
    </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStoreUsers } from 'src/stores/users';
import { isValidEmail } from 'src/functions';

const $q = useQuasar();
const router = useRouter();

const email = ref('gonzaleztenreiro@gmail.com');
const password = ref('Tq0xuxvBMs27042304()');
const accept = ref(false);




const onSubmit = async () => {
    if (accept.value !== true) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Primero debe aceptar la licencia y los términos'
        })
    }
    else {
        const store = useStoreUsers();
        try {
            await store.signIn({ email: email.value, password: password.value })
            router.push('/admin');
        } catch (error) {
            $q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: `${error.message}`
            })
        }

    }
}

const onReset = () => {
    email.value = null
    password.value = null
    accept.value = false
}
</script>
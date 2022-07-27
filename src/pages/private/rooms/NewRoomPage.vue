<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStoreRooms } from '../../../stores/rooms';
import { useNotify } from '../../../hooks/TheNotify';
const form = reactive({
    name: '',
    description: '',
});
const router = useRouter();
const disable = ref(false);
const store = useStoreRooms();
const { error, ok } = useNotify();
const onSubmit = async () => {
    try {
        disable.value = true;
        await store.setRoom(form);
        ok('Sala creada de forma correcta')
        setTimeout(() => {
            router.push({
                name: 'Rooms'
            });
        }, 1000);
    } catch (err) {
        error(err.message);
    } finally {
        disable.value = false;
    }
}
const onReset = () => {
    form.name = '';
}
</script>
<template>
    <div>
        <q-page padding>
            <h1 class="text-h4">
                Nueva Sala
            </h1>
            <div class="row justify-center">
                <div class="col-10 col-sm-6">
                    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                        <q-input filled v-model="form.name" label="Sala *" hint="Nombre de la sala" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Por favor escriba algo']" />
                        <div class="q-mt-xl">
                            <q-editor placeholder="Descripción de la sala" v-model="form.description"
                                min-height="5rem" />
                        </div>
                        <div>
                            <q-btn :disable="disable" label="Submit" type="submit" color="primary" />
                            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                </div>
            </div>
        </q-page>
    </div>
</template>
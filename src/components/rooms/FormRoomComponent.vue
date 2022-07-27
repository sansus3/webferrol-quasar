<script setup>
import { inject } from 'vue';

const emits = defineEmits(['onSubmit']);
defineProps({
    btnSubmit: {
        type: String,
        default: 'Nueva Sala',
    }
});

const form = inject('form');
const disable = inject('disable');

const onReset = () => {
    form.name = '';
    form.description = '';
}

const onSubmit = () => {
    emits('onSubmit');
}
</script>
<template>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="form.name" label="Sala *" hint="Nombre de la sala" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor escriba algo']" />
        <div class="q-mt-xl">
            <q-editor placeholder="Descripción de la sala" v-model="form.description" min-height="5rem" />
        </div>
        <div>
            <q-btn :disable="disable" :label="btnSubmit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    </q-form>
</template>
<script setup>
import { inject } from 'vue';

const emits = defineEmits(['onSubmit']);
const props = defineProps({
    btnSubmit: {
        type: String,
        default: 'Nueva Sala',
    },
    room: {
        type: Object,
        default: () => ({ name: '', displayName: '', description: '' })
    }
});

const form = inject('form');
const disable = inject('disable');

const onReset = () => {
    form.name = props.room?.name ?? '';
    form.description = props.room?.description ?? '';
}

const onSubmit = () => {
    emits('onSubmit');
}
</script>
<template>
    <div>
        <h2 class="q-mb-xl text-h5 text-primary">{{ room.displayName }}</h2>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="form.name" label="Sala *" hint="Nombre de la sala" lazy-rules
                :rules="[val => val && val.length > 0 || 'Por favor escriba algo']" />
            <div class="q-mt-xl">
                <q-editor placeholder="Descripción de la sala" v-model="form.description" min-height="5rem" />
            </div>
            <div>
                <q-btn :disable="disable" :loading="disable" :label="btnSubmit" type="submit" color="primary" />
                <q-btn label="Reiniciar" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>
    </div>
</template>
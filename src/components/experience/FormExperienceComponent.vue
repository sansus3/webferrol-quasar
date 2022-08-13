<script setup>
import { ref } from 'vue';

const form = ref({
    code: '123456789',
    title: '',
    jobTitle: '',
    dateStart: null,
    dateEnd: null,
    place: '',
    province: '',
    comments: '',
});



const props = defineProps({
    data: {
        type: Object,
    },
    btn: {
        type: Object,
        default: () => ({
            text: 'Añadir',
            icon: 'add',
        })
    },
    disable: {
        type: Boolean,
        default: false,
    }

});


const setData = () => {
    form.value.code = props.data?.code ?? '';
    form.value.title = props.data?.title ?? '';
    form.value.jobTitle = props.data?.jobTitle ?? '';
    form.value.dateStart = props.data?.dateStart.toDate().toISOString().split('T')[0] ?? '';
    form.value.dateEnd = props.data?.dateEnd.toDate().toISOString().split('T')[0] ?? '';
    form.value.place = props.data?.place ?? '';
    form.value.province = props.data?.province ?? '';
    form.value.comments = props.data?.comments ?? '';
}
setData();//carga del formulario por defecto y reseto del mismo si se solicita


const emits = defineEmits(['handleSubmit']);

const handleSubmit = () => {
    emits('handleSubmit', form.value)
}
const handleReset = () => {
    setData();
}
</script>
<template>
    <div>
        <q-form autofocus @reset="handleReset" @submit.prevent="handleSubmit">
            <q-input label="Código *" v-model="form.code" name="code"
                :rules="[val => val && val.length > 2 || 'Por lo un mínimo de tres caracteres']">
                <template v-if="form.code" v-slot:append>
                    <q-icon name="cancel" @click.stop.prevent="form.code = null" class="cursor-pointer" />
                </template>
            </q-input>

            <q-input label="Título *" v-model="form.title" name="title"
                :rules="[val => val && val.length > 2 || 'Por lo un mínimo de tres caracteres']">
                <template v-if="form.code" v-slot:append>
                    <q-icon name="cancel" @click.stop.prevent="form.title = null" class="cursor-pointer" />
                </template>
            </q-input>

            <q-input label="Cargo *" v-model="form.jobTitle" name="title"
                :rules="[val => val && val.length > 2 || 'Por lo un mínimo de tres caracteres']">
                <template v-if="form.jobTitle" v-slot:append>
                    <q-icon name="cancel" @click.stop.prevent="form.jobTitle = null" class="cursor-pointer" />
                </template>
            </q-input>

            <q-input type="date" v-model="form.dateStart" stack-label label="Fecha de inicio *"
                :rules="[val => !!val || 'Campo requerido']" />

            <q-input type="date" v-model="form.dateEnd" stack-label label="Fecha de finalización" />

            <q-input label="Lugar" v-model="form.place" name="place">
                <template v-if="form.place" v-slot:append>
                    <q-icon name="cancel" @click.stop.prevent="form.place = ''" class="cursor-pointer" />
                </template>
            </q-input>

            <q-input list="provinces" label="Provincia" v-model="form.province" name="province">
                <template v-if="form.province" v-slot:append>
                    <q-icon name="cancel" @click.stop.prevent="form.province = ''" class="cursor-pointer" />
                </template>
            </q-input>
            <datalist id="provinces">
                <option value="Coruña" />
                <option value="Lugo" />
                <option value="Orense" />
                <option value="Pontevedra" />
            </datalist>

            <div class="q-mt-xl">
                <q-editor placeholder="Unos breves comentarios" content-class="bg-amber-3" v-model="form.comments"
                    min-height="5rem" />
            </div>

            <q-btn-group push class="q-mt-xl">
                <q-btn :icon="btn.icon" :loading="disable" :disable="disable" :label="btn.text" type="submit"
                    color="primary" />
                <q-btn icon="restart_alt" label="Reiniciar" type="reset" color="secondary" />
            </q-btn-group>
        </q-form>
    </div>
</template>
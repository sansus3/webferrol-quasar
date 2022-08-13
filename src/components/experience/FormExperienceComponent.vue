<script setup>
import { ref } from 'vue';

const form = ref(null);
const codeRef = ref(null);
const disable = ref(false);
form.value = props.data;

const props = defineProps({
    data: {
        type: Object,
    }
});
const emits = defineEmits(['onSubmit']);

const handleSubmit = () => {
    alert('hola')
    emits('onSubmit', form)
}
const handleReset = () => {

}
</script>
<template>
    <div>
        <q-form autofocus @reset="handleReset" @submit.prevent="handleSubmit">
            <q-input label="Código *" ref="codeRef" v-model="form.code" name="code"
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
                <q-btn icon="add" :loading="disable" :disable="disable" label="Crear" type="submit" color="primary" />
                <q-btn icon="restart_alt" label="Reiniciar" type="reset" color="secondary" />
            </q-btn-group>
        </q-form>
    </div>
</template>
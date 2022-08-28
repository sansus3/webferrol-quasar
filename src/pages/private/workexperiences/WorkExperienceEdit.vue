<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreExperiences } from '../../../stores/experiences';
import { useNotify } from '../../../hooks/TheNotify';
import FormExperience from '../../../components/experience/FormExperienceComponent.vue';


const route = useRoute();
const store = useStoreExperiences();
const { error } = useNotify();
const disable = ref(false);
const loading = ref(false);//No cargaremos el formulario hasta recibir todos los datos
const form = ref(null); //Almacenaremos los datos del store



/**
 * 
 * @param {Object} data datos del formulario obtenidos por el emit del componente
 */
const handleSubmit = async () => {
    try {
        disable.value = true;
        await store.updateExperience(route.params.idDoc, { ...store.experience, ...form.value });//Hacemos el famoso Spread {...object}
    } catch (err) {
        error(err);
    } finally {
        disable.value = false;
    }

}


(async () => {
    try {
        await store.setupExperience(route.params.idDoc);
        form.value = { ...store.experience };
        form.value.dateStart = store.experience.dateStart.toDate().toISOString().split('T')[0];
        form.value.dateEnd = store.experience.dateEnd.toDate().toISOString().split('T')[0]
        if (!store.experience)
            throw new Error(`Identificador no existente: ${route.params.idDoc}`);

    } catch (err) {
        error(err.message);
    } finally {
        loading.value = true;
    }
})()

const handleReset = () => {
    form.value = { ...store.experience };
    form.value.dateStart = store.experience.dateStart.toDate().toISOString().split('T')[0];
    form.value.dateEnd = store.experience.dateEnd.toDate().toISOString().split('T')[0]
}
</script>

<template>
    <q-page padding>
        <h1 class="text-h5">Editar experiencia</h1>
        <q-form autofocus @reset="handleReset" @submit.prevent="handleSubmit" v-if="loading">
            <FormExperience v-model:code="form.code" v-model:title="form.title" v-model:jobTitle="form.jobTitle"
                v-model:dateStart="form.dateStart" v-model:dateEnd="form.dateEnd" v-model:place="form.place"
                v-model:province="form.province" v-model:comments="form.comments">
            </FormExperience>
            <q-btn-group push class="q-mt-xl">
                <q-btn icon="edit" :loading="disable" :disable="disable" label="Modificar experiencia" type="submit"
                    color="primary" />
                <q-btn icon="restart_alt" label="Reiniciar" type="reset" color="secondary" />
            </q-btn-group>
        </q-form>
    </q-page>
</template>
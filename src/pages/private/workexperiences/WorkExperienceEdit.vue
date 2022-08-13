<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreExperiences } from '../../../stores/experiences';
import { useNotify } from '../../../hooks/TheNotify';
import FormExperienceComponent from '../../../components/experience/FormExperienceComponent.vue';


const route = useRoute();
const store = useStoreExperiences();
const { error } = useNotify();
const disable = ref(false);

/**
 * 
 * @param {Object} data datos del formulario obtenidos por el emit del componente
 */
const handleSubmit = async data => {
    try {
        disable.value = true;
        await store.updateExperience({ ...store.experience, ...data })
    } catch (err) {
        error(err);
    } finally {
        disable.value = false;
    }

}


(async () => {
    try {
        await store.setupExperience(route.params.idDoc);
        if (!store.experience)
            throw new Error(`Identificador no existente: ${route.params.idDoc}`);
    } catch (err) {
        error(err.message);
    }
})()
</script>

<template>
    <q-page padding>
        <h1 class="text-h5">Editar experiencia</h1>
        <FormExperienceComponent v-if="store.experience" :btn="{ text: 'Modificar', icon: 'edit' }"
            :data="store.experience" @handle-submit="handleSubmit" :disable="disable">
        </FormExperienceComponent>
    </q-page>
</template>
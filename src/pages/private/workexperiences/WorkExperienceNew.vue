<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotify } from '../../../hooks/TheNotify';
import { useStoreExperiences } from '../../../stores/experiences';
import FormExperience from '../../../components/experience/FormExperienceComponent.vue';

const store = useStoreExperiences();
const router = useRouter();
const { error } = useNotify();
const disable = ref(false);

const data = {
    code: '',
    title: '',
    jobTitle: '',
    dateStart: '',
    dateEnd: '',
    place: '',
    province: '',
    comments: '',
}

const form = ref({ ...data })


const handleReset = () => {
    form.value = { ...data };
}

const handleSubmit = async () => {
    try {
        disable.value = true;
        await store.addExperience({ ...store.experience, ...form.value });
        router.push({
            name: 'WorkExperiences'
        })
    } catch (err) {
        //console.log(error);
        error(err);
    } finally {
        disable.value = false;
    }

}
</script>
<template>
    <q-page padding>
        <h1 class="text-h5">Nueva experiencia</h1>
        <q-form autofocus @reset="handleReset" @submit.prevent="handleSubmit">
            <FormExperience v-model:code="form.code" v-model:title="form.title" v-model:jobTitle="form.jobTitle"
                v-model:dateStart="form.dateStart" v-model:dateEnd="form.dateEnd" v-model:place="form.place"
                v-model:province="form.province" v-model:comments="form.comments">
            </FormExperience>
            <q-btn-group push class="q-mt-xl">
                <q-btn icon="add" :loading="disable" :disable="disable" label="Nueva experiencia" type="submit"
                    color="primary" />
                <q-btn icon="restart_alt" label="Reiniciar" type="reset" color="secondary" />
            </q-btn-group>
        </q-form>
    </q-page>
</template>
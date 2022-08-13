<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Timestamp } from '@firebase/firestore';
import { useNotify } from '../../../hooks/TheNotify';
import { useStoreExperiences } from '../../../stores/experiences';
import FormExperienceComponent from '../../../components/experience/FormExperienceComponent.vue';

const store = useStoreExperiences();
const router = useRouter();
const { error } = useNotify();
const disable = ref(false);

const form = ref({
    code: '',
    title: '',
    jobTitle: '',
    dateStart: Timestamp.fromDate(new Date()),
    dateEnd: Timestamp.fromDate(new Date()),
    place: '',
    province: '',
    comments: '',
})


const handleSubmit = async (data) => {
    try {
        disable.value = true;
        await store.addExperience({ ...store.experience, ...data });
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
        <FormExperienceComponent :data="form" @handle-submit="handleSubmit" :disable="disable">
        </FormExperienceComponent>
    </q-page>
</template>
<script setup>
import { reactive, ref, provide } from 'vue';
import { useRoute } from 'vue-router';
import FormRoomComponent from '../../../components/rooms/FormRoomComponent.vue';
import { useStoreRooms } from '../../../stores/rooms';
import { useNotify } from '../../../hooks/TheNotify';
import { useRouter } from 'vue-router';
// Provide
const form = reactive({
    name: '',
    description: '',
});
const disable = ref(false);
provide('form', form);
provide('disable', disable);
//End Provide

const store = useStoreRooms();
const route = useRoute();
const router = useRouter();
const { error, ok } = useNotify();

const onSubmit = async () => {
    try {
        disable.value = true;
        await store.updateRoom(store.room.idDoc, form);
        ok('Sala actualizada');
    } catch (err) {
        error(err.message);
    } finally {
        disable.value = false;
    }
}

//Carga de datos
(async () => {
    try {
        await store.getRoom(route.params.idDoc);
        if (store.room) {
            form.name = store.room.name;
            form.description = store.room.description;
        } else
            throw new Error('Esa sala no existe');
    } catch (err) {
        error(err.message);
        setTimeout(() => {
            router.push({
                name: 'Rooms'
            });
        }, 1000);
    }

})()
</script>
<template>
    <q-page padding>
        <h1 class="text-h4">Editar Sala</h1>
        <div class="row justify-center">
            <div class="col-10 col-sm-6">
                <form-room-component @on-submit="onSubmit" btn-submit="Editar Sala"></form-room-component>
            </div>
        </div>
    </q-page>
</template>
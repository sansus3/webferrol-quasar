<script setup>
import { reactive, ref, provide } from 'vue';
import { useRouter } from 'vue-router';
import { useStoreRooms } from '../../../stores/rooms';
import { useNotify } from '../../../hooks/TheNotify';
import FormRoomComponent from '../../../components/rooms/FormRoomComponent.vue';

// Provide
const form = reactive({
    name: '',
    description: '',
});
const disable = ref(false);
provide('form', form);
provide('disable', disable);
//End Provide

const router = useRouter();
const store = useStoreRooms();
const { error, ok } = useNotify();
const onSubmit = async () => {
    try {
        disable.value = true;
        await store.insertRoom(form);
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
</script>
<template>
    <div>
        <q-page padding>
            <h1 class="text-h4">
                Nueva Sala
            </h1>
            <div class="row justify-center">
                <div class="col-10 col-sm-6">
                    <form-room-component @on-submit="onSubmit"></form-room-component>
                </div>
            </div>
        </q-page>
    </div>
</template>
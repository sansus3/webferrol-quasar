<script setup>
import { useStoreRooms } from '../../../stores/rooms';
import { useNotify } from '../../../hooks/TheNotify';
import RoomComponent from '../../../components/rooms/RoomComponent.vue'


const store = useStoreRooms();
const { error } = useNotify();

//Carga previa
(async () => {
    try {
        await store.setRooms();
    } catch (err) {
        error(err.message);
    }
})()
</script>
<template>
    <q-page padding>

        <div class="row justify-between items-center">
            <h1 class="text-h4">Rooms</h1>
            <q-btn to="/admin/new-room" color="primary" label="Nueva sala" />
        </div>

        <div>
            <div v-if="store.rooms.length">
                <!-- End pagination -->
                <div class="q-pa-md row items-start q-gutter-md">
                    <room-component v-for="room of store.rooms" :key="room.idDoc" :room="room">
                    </room-component>
                </div>
            </div>
        </div>
    </q-page>
</template>
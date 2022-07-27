<script setup>
import { watch, ref } from 'vue';
import { useStoreRooms } from '../../../stores/rooms';
import { useNotify } from '../../../hooks/TheNotify';
import RoomComponent from '../../../components/RoomComponent.vue'

const $current = ref(1);
const store = useStoreRooms();
const { error } = useNotify();

//Carga previa
const onNav = async ($pagination = 'init', $refresh = true) => {
    try {
        if ($refresh)
            await store.setMax();
        await store.setRooms($pagination);
    } catch (err) {
        error(err.message);
    }
}
onNav();

// Ejecuta la función cuando cambia la variable reactiva $current.
// La función callback puede obtener el valor actual (current) y anterior (prev).
watch($current, async (current, prev) => {
    if (current === 1)
        await onNav('init', false);
    else if (current > prev)
        onNav('next', false);
    else
        onNav('previous', false);
});
</script>
<template>
    <q-page padding>
        <h1 class="text-h4">
            Rooms
        </h1>
        <div>
            <div v-if="store.rooms.length">
                <!-- pagination -->
                <q-pagination v-if="store.max" input v-model="$current" :max="store.max" :boundary-links="false"
                    direction-links />
                <!-- End pagination -->
                <div class="q-pa-md row items-start q-gutter-md">
                    <room-component style="min-height: 9em;width:15em" v-for="room of store.rooms" :key="room.idDoc"
                        :room="room">
                    </room-component>
                </div>
            </div>
        </div>
    </q-page>
</template>
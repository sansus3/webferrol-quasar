<script setup>
import { ref } from 'vue';
import { useNotify } from '../../hooks/TheNotify';
import { useStoreRooms } from '../../stores/rooms';
const props = defineProps({
    room: {
        type: Object,
        required: true,
    }
});
const { error } = useNotify();
const store = useStoreRooms();
const prompt = ref(false);
const idDocRepeat = ref('');

const onDelete = async () => {
    try {
        if (props.room.idDoc !== idDocRepeat.value)
            throw new Error(`Claves no coincidendes. (${props.room.idDoc}!=${idDocRepeat.value})`);
        await store.deleteRoom(props.room.idDoc);
        prompt.value = false;
    } catch (err) {
        error(err.message);
    }
}
</script>


<template>
    <q-card class="my-card" flat bordered>
        <q-item>
            <q-item-section avatar>
                <q-avatar>
                    <img :src="room?.photoURL ?? 'https://cdn.quasar.dev/img/boy-avatar.png'">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label>{{ room?.name ?? 'Title' }}</q-item-label>
                <q-item-label caption>
                    {{ room?.displayName ?? 'Nombre perfil' }}
                </q-item-label>
            </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
            <q-card-section>
                <div v-html="room?.description"></div>
            </q-card-section>
        </q-card-section>
        <q-separator />

        <q-card-actions>
            <q-btn flat :to="{
                name: 'EditRoom',
                params: {
                    'idDoc': room?.idDoc
                }
            }">Editar</q-btn>
            <q-btn flat @click="prompt = true">Eliminar</q-btn>
        </q-card-actions>
    </q-card>
    <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">{{ room.name }}</div>
                Para eliminar esta sala repita el código que viene a continuación:
                <div>
                    {{ room.idDoc }}
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input dense v-model="idDocRepeat" autofocus @keyup.enter="prompt = false" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancelar" v-close-popup />
                <q-btn flat label="Aceptar" @click="onDelete" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<style lang="scss" scoped>
.my-card {
    width: 100%;
    max-width: 250px;
}
</style>
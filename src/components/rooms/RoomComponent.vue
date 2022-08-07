<script setup>
import { ref } from 'vue';
import { copyToClipboard } from 'quasar'
import { useNotify } from '../../hooks/TheNotify';
import { useStoreRooms } from '../../stores/rooms';
const props = defineProps({
    room: {
        type: Object,
        required: true,
    },
    btnVisible: {
        type: Boolean,
        default: false,
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

const onCopyToClipboard = async () => {
    try {
        await copyToClipboard(props.room.idDoc);
    } catch (err) {
        error(err.message)
    }
}
</script>


<template>
    <q-card class="my-card" flat bordered>
        <q-item>
            <q-item-section avatar>
                <q-avatar>
                    <img :src="room?.photoURL ? room?.photoURL : 'https://cdn.quasar.dev/img/boy-avatar.png'">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label>
                    <router-link class="text-blue-6 text-bold text-capitalize" style="text-decoration:none" :to="{
                        name: 'Room',
                        params: {
                            idDoc: room.idDoc,
                        }
                    }">
                        {{ room?.name ?? 'Title' }}
                    </router-link>
                </q-item-label>


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

        <q-card-actions v-if="btnVisible">
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
                <div>
                    <q-list bordered class="rounded-borders" style="max-width: 600px">
                        <q-item-label header>Para eliminar repita el código que viene a continuación</q-item-label>

                        <q-item>

                            <q-item-section top>
                                <q-item-label lines="1">
                                    <span class="text-weight-medium">{{ room.idDoc }}</span>
                                </q-item-label>
                            </q-item-section>

                            <q-item-section top side>
                                <div class="text-grey-8 q-gutter-xs">
                                    <q-btn @click="onCopyToClipboard" title="Copiar al portapapeles" class="gt-xs"
                                        size="12px" flat dense round icon="content_copy" />
                                </div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                    <!-- End Copy to Clipboard -->
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
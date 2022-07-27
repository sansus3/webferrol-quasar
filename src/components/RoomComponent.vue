<script setup>
defineProps({
    room: {
        type: Object
    }
});
</script>
<template>
    <q-card class="my-card" flat bordered>
        <q-item>
            <q-item-section avatar>
                <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
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
    </q-card>
</template>
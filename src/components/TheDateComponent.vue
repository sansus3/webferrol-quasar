<template>
    <q-input type="date" :value="date" stack-label :label="label" :rules="[val => !!val || 'Campo requerido']"
        @input="$emit('update:date', $event.target.value)" />
</template>

<script setup>
defineProps({
    date: {
        type: String,
    },
    label: {
        type: String,
        default: "Fecha de inicio *",
    },
});
</script>
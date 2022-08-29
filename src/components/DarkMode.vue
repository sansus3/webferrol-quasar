<script setup>
import { computed, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const mode = ref('light');

//Texto del q-toggle con la primera letra mayúscula. Resultado: Light | Dark
const label = computed(() => `Modo ${mode.value.charAt(0).toUpperCase()}${mode.value.slice(1)}`);

/**
 * 
 * @param {String} value Modo del esquema del color. Dos opciones dark|light
 */
const toggle = (value) => {

    if (value === 'dark') {
        $q.dark.set(true);
        mode.value = localStorage.theme = 'dark';
    }
    else {
        $q.dark.set(false);
        mode.value = localStorage.theme = 'light';
    }
}

onMounted(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        mode.value = 'dark';
    } else {
        mode.value = 'light';
    }
    toggle(mode.value)
});
</script>

<template>
    <q-toggle :label="label" false-value="light" true-value="dark" v-model="mode" @update:model-value="toggle" />
</template>
<script setup>
import { onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreMessages } from '../../../stores/messages';
import { useNotify } from '../../../hooks/TheNotify';
import { useStoreUsers } from '../../../stores/users';

const message = ref('');
const div_messages = ref(0);
const click = ref('Nuevo mensaje')
const route = useRoute();
const store = useStoreMessages();
const storeUser = useStoreUsers();
const { error } = useNotify();




const handleMessage = async () => {
    try {

        await store.createMessage({ idRoom: route.params.idDoc, message: message.value });
        message.value = '';
    } catch (err) {
        error(err.message);
        //console.log(err.message)
    }

}
//Al abandonar la sala dejaremos de escuchar
onUnmounted(() => {
    const store = useStoreMessages();
    store.setMessagesListener(null);
});

//Calculamos la altura para desplarnos hasta el último mensaje
watch(div_messages, (oldVal, newVal) => {
    window.scrollTo({
        top: oldVal.scrollHeight,
        behavior: 'smooth',
    });
    //console.log(oldVal.scrollHeight, newVal)
});



(async () => {
    try {
        const route = useRoute();
        const store = useStoreMessages();
        await store.getMessages(route.params.idDoc);
    } catch (err) {
        //console.log(err);
        error(err.message)
    }
})()
</script>
<template>
    <q-page padding>
        <h1 class="text-h4">Hola {{ storeUser.user.displayName }} 💘</h1>
        <div class="q-pa-md row justify-center">

            <div v-if="store.messages.length" style="width: 100%; max-width: 400px;" ref="div_messages">
                <!-- <pre>
                {{ store.messages }}
            </pre> -->
                <div v-for="(item, key) in store.messages" :key="key">
                    <q-chat-message :sent="item?.uid === storeUser.user.uid" :name="item?.displayName ?? 'Anónimo'"
                        :avatar="item?.photoURL ?? 'https://cdn.quasar.dev/img/boy-avatar.png'"
                        :text="[item?.message]" />
                </div>
            </div>
        </div>
        <!-- Insert -->
        <div class="q-pa-md">
            <div class="cursor-pointer">
                <q-chip square>
                    <q-avatar icon="bookmark" color="red" text-color="white" />
                    {{ click }}
                </q-chip>

                <q-popup-edit v-model="message" :validate="val => val.length > 0" v-slot="scope">
                    <q-input autofocus dense v-model="scope.value" :model-value="scope.value" hint="Tu mensaje" :rules="[
                        val => scope.validate(val) || 'More than 1 chars required'
                    ]">
                        <template v-slot:after>
                            <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel" />

                            <q-btn flat dense color="positive" icon="check_circle" @click.stop.prevent="scope.set"
                                @click="handleMessage"
                                :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                        </template>
                    </q-input>
                </q-popup-edit>
            </div>
        </div>
        <!-- End Insert -->
    </q-page>
</template>
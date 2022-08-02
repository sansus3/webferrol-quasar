<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreMessages } from '../../../stores/messages';
import { useNotify } from '../../../hooks/TheNotify';
import { useStoreUsers } from '../../../stores/users';

const message = ref('');
const click = ref('Nuevo mensaje')
const route = useRoute();
const store = useStoreMessages();
const storeUser = useStoreUsers();
const { error } = useNotify();


const handleMessage = async () => {
    try {

        await store.createMessage({ idRoom: route.params.idDoc, message: message.value });
    } catch (err) {
        error(err.message);
        //console.log(err.message)
    }

}

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
    <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px" v-if="store.messages.length">
            <!-- <pre>
                {{ store.messages }}
            </pre> -->
            <q-chat-message :sent="item?.uid === storeUser.user.uid" v-for="(item, key) in store.messages" :key="key"
                :name="item?.displayName ?? 'Anónimo'"
                :avatar="item?.photoURL ?? 'https://cdn.quasar.dev/img/boy-avatar.png'" :text="[item?.message]" />
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
</template>
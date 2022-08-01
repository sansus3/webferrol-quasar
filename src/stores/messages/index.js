import { defineStore } from "pinia";
import { query, onSnapshot, collection, orderBy, doc, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useStoreUsers } from "../users";

export const useStoreMessages = defineStore({
    /**
     * Propiedad que es un identificador solicitado por Pinia para la definción del store
     * @type {String} id - Identificador
     */
    id: 'messages',
    state: () => ({
        /**
         * @type {Array} portfolio - Rutas url de imágenes del bucket proyectos
         */
        messages: [],
        handleMessagesListener: () => { }
    }),
    actions: {
        setMessages(messages) {
            this.messages = messages;
        },
        setMessage(message) {
            this.messages.push(message);
        },
        setMessagesListener(listener) {
            if (listener)
                this.handleMessagesListener = listener;
            else
                this.handleMessagesListener();
        },
        //Getters cloud firestore
        //https://firebase.google.com/docs/firestore/query-data/listen
        async getMessages($room) {
            //Accedemos a la subcolección messages
            const q = query(collection(db, `rooms/${$room}/messages`), orderBy('createdAt'));
            this.messages = [];
            const unsubscribe = onSnapshot(q, (snapshot) => {

                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        //console.log("New: ", change.newIndex, change.oldIndex, change.doc.data());
                        this.messages.push(change.doc.data())
                    }
                    if (change.type === "modified") {
                        console.log("Modified: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        this.messages = [];
                        console.log("Removed: ", change.doc.data());
                    }
                });
                console.log(this.messages)
            });

            this.setMessagesListener(unsubscribe);
            //this.handleMessagesListener();
        },
        //Añadimos esta conversación
        async createMessage({ idRoom, message }) {
            const store = useStoreUsers();
            const docRef = await addDoc(collection(db, `rooms/${idRoom}/messages`), {
                idRoom,
                message,
                uid: store.user.uid,
                displayName: store.user.displayName,
                photoURL: store.user.photoURL,
                createdAt: Date.now()
            });
            return docRef.id;
        }
    },
});
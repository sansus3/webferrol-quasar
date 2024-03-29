import { defineStore } from "pinia";
import { query, where, onSnapshot, collection, collectionGroup, orderBy, doc, setDoc, getDocs, writeBatch } from "firebase/firestore";
import { db } from "../../firebase";
import { useStoreUsers } from "../users";
import { useStoreRooms } from "../rooms";

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
        handleMessagesListener: () => { } //Nuestro escuchador del método onSnapshot de firestore
    }),
    actions: {
        /**
         * 
         * @param {Function} listener Evento capturado de onSnapshot de firestores
         */
        setMessagesListener(listener) {
            if (listener)
                this.handleMessagesListener = listener;
            else
                this.handleMessagesListener(); //Si el método no recibe parámetro realizamos un Stop listening
        },
        setMessage($data) {
            const index = this.messages.findIndex(message => message.idDoc === $data.idDoc);
            if (index === -1) {
                this.messages.push($data);
            }
        },
        /**
         * Obtenemos la sala seleccionada de la colección "rooms"
         * @param {String} $room Identfificador de la sala
         */
        async getMessages($room) {
            //Accedemos a la subcolección messages            
            this.messages = [];
            const q = query(collection(db, `rooms/${$room}/messages`), orderBy('createdAt'));
            //https://firebase.google.com/docs/firestore/query-data/listen
            const unsubscribe = onSnapshot(q, (snapshot) => {

                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        this.setMessage(change.doc.data())
                    }
                    if (change.type === "modified") {
                        console.log("Modified: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        this.messages = [];
                        console.log("Removed: ", change.doc.data());
                    }
                });
            });
            //Almacenamos la llamada del método onSnapshot para poder después detener este listening cuando hagamos por ejemplo logout y ampliar nuestro ancho de banda
            this.setMessagesListener(unsubscribe); //Lo almacenamos en la propiedad handleMessagesListener para ejecutralos sólo hay que ejecutar: this.handleMessagesListener();
        },
        //Añadimos esta conversación
        async createMessage({ idRoom, message }) {
            const store = useStoreUsers();
            // Creamos una referencia de documento con un ID generado automáticamente
            const docRef = doc(collection(db, `rooms/${idRoom}/messages`));
            const data = {
                idDoc: docRef.id,
                idRoom,
                message,
                uid: store.user.uid,
                displayName: store.user.displayName,
                photoURL: store.user.photoURL,
                createdAt: Date.now()
            }
            await setDoc(docRef, data);
            this.setMessage(data);
            return data;
        },
        /**
         * 
         * @param {String} $uid Identificador del usuario
         * @param {Object} profile {displaName,photoURL}
         * @param {*} $collection {Colección de firestore}
         */
        async updateProfileMessages($uid, profile, $collection = 'messages') {
            const q = query(collectionGroup(db, $collection), where('uid', '==', $uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
                // Get a new write batch
                const batch = writeBatch(db);
                batch.update(doc.ref, profile);
                await batch.commit();
            });
            if ($collection === 'rooms') {
                const store = useStoreRooms();
                store.rooms = [];
            }

        }
    },
});
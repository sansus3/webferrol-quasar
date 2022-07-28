import { defineStore } from "pinia";
import { useStoreUsers } from "../users";
import { useDB } from "../../cloud.firestore";

export const useStoreRooms = defineStore({
    /**
     * Propiedad que es un identificador solicitado por Pinia para la definción del store
     * @type {String} id - Identificador
     */
    id: 'rooms',
    state: () => ({
        /**
         * @type {Array} portfolio - Rutas url de imágenes del bucket proyectos
         */
        rooms: [],
        room: null,
        perPage: 3,
        last: 0,
        max: 0,
    }),
    actions: {
        /**
         * 
         * @param {String} idDoc Identificador de un documento del Cloud Firestore
         * @returns //Document o False si no se encuentra
         */
        async getRoom(idDoc) {
            const { getDocument } = useDB('rooms');
            this.room = await getDocument(idDoc);
        },
        /**
         * 
         * @param {String} idDoc 
         * @param {Object} data 
         */
        async updateRoom(idDoc, data) {
            const { updateDocument } = useDB('rooms');
            await updateDocument(idDoc, data);
            const index = this.rooms.findIndex(room => room.idDoc === idDoc);
            if (index > 0) {
                this.rooms[index].name = data.name;
                this.rooms[index].description = data.description;
            }
        },
        /**
        * Función que carga en Cloud Firestore una nueva sala
        * @param {Objeto} form Objeto con los datos de la nueva sala/room
        */
        async setRoom(form) {
            const { setDocument } = useDB('rooms');
            const store = useStoreUsers();
            const data = { ...form, user: store.user.uid, displayName: store.user.displayName, photoURL: store.user.photoURL };
            this.rooms.push(await setDocument(data));
        },
        async deleteRoom(idDoc) {
            const { deleteDocument } = useDB('rooms');
            await deleteDocument(idDoc);
            const index = this.rooms.findIndex(room => room.idDoc === idDoc);
            if (index > -1) {
                this.rooms.splice(index, 1);
            }
        },
        /**
         * Salas/Rooms
         */
        async setRooms() {
            if (this.rooms.length)
                return;
            const { getDocsOrderBy } = useDB('rooms');
            const data = await getDocsOrderBy('createdAt');
            if (data)
                this.rooms = data;
        }
    },
});
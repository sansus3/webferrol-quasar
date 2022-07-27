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
        },
        /**
        * Función que carga en Cloud Firestore una nueva sala
        * @param {Objeto} form Objeto con los datos de la nueva sala/room
        */
        async setRoom(form) {
            const { setDocument } = useDB('rooms');
            const store = useStoreUsers();
            const data = { ...form, user: store.user.uid, displayName: store.user.displayName, photoURL: store.user.photoURL };
            //console.log(data)
            await setDocument(data);
        },
        /**
         * Paginación de Salas/Rooms
         */
        async setRooms($state = 'init') {
            let pages = null;
            switch ($state) {
                case 'init':
                    const { initPage } = useDB('rooms');
                    pages = await initPage('createdAt', this.perPage);
                    if (pages.data.length) {
                        this.rooms = pages.data;
                        this.last = pages.last;
                    }
                    break;
                case 'next':
                    const { nextPage } = useDB('rooms');
                    pages = await nextPage('createdAt', this.last, this.perPage);
                    if (pages.data.length) {
                        this.rooms = pages.data;
                        this.last = pages.last;
                    }
                    break;
                case 'previous':
                    const { previousPage } = useDB('rooms');
                    pages = await previousPage('createdAt', this.last, this.perPage);
                    if (pages.data.length) {
                        this.rooms = pages.data;
                        this.last = pages.last;
                    }
                    break;
            }

        },
        /**
         * Total de página para la paginación
         */
        async setMax() {
            const { totalPages } = useDB('rooms');
            this.max = await totalPages(this.perPage);
        },
    },
});
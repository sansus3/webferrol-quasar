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
    }),
    actions: {
        /**
         * Cargamos una room
         */
        async setRoom(form) {
            const { setDocument } = useDB('rooms');
            const store = useStoreUsers();
            const data = { ...form, user: store.user.uid };
            console.log(data)
            await setDocument(data);
        },
    },
});
import { defineStore } from "pinia";
import { listAllUrls,deleteFile } from '../../storage';

export const useStoreProfile = defineStore({
    /**
     * Propiedad que es un identificador solicitado por Pinia para la definción del store
     * @type {String} id - Identificador
     */
    id: 'profile',
    state: () => ({
        /**
         * @type {Array} portfolio - Rutas url de imágenes del bucket proyectos
         */
        portfolio: [],
    }),
    actions: {
        /**
         * Cargamos en la propieda portfolio las urls de las imágenes que se encuentran en Cloud Store de la ruta "proyectos"
         */
        async setPortfolio() {
            if (this.portfolio.length === 0)
                this.portfolio = await await listAllUrls('proyectos');
        },
        async deletePortfolio(ref){
            await deleteFile(ref);
        },       
    },   
});
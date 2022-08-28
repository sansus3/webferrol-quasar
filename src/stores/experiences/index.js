import { defineStore } from "pinia";
import { Timestamp } from "firebase/firestore";
import { useDB } from "../../cloud.firestore";

export const useStoreExperiences = defineStore({
    id: 'experiences',
    state: () => ({
        experiences: [],
        experience: null,
    }),
    actions: {
        async getExperiences() {
            if (this.experiences.length)
                return;
            const { getDocsOrderBy } = useDB('workExperience');
            this.experiences = await getDocsOrderBy('dateStart');
        },
        async setupExperience(p_idDoc) {
            this.experience = this.experiences.find(el => el.idDoc === p_idDoc);
            if (this.experience)
                return;
            const { getDocument } = useDB('workExperience');
            this.experience = await getDocument(p_idDoc);
        },
        async updateExperience(p_idDoc, p_data) {
            //Cargamos cloud firestore
            const { updateDocument } = useDB('workExperience');
            //Reconstuímos el objeto para almacenar sólo los datos que nos interesan
            let { code, title, jobTitle, province, place, comments, dateStart, dateEnd } = p_data;
            const $data = { code, title, jobTitle, province, place, comments, dateStart, dateEnd };
            //Preparamos el formato de fecha para us almacenamiento            
            const $dateStart = new Date($data.dateStart);//Convertimos String (dd-mm-aaaa) a Date
            p_data.dateStart = $data.dateStart = Timestamp.fromDate($dateStart);
            const $dateEnd = new Date(p_data.dateEnd);
            p_data.dateEnd = $data.dateEnd = Timestamp.fromDate($dateEnd);
            //Actualización de los campos
            await updateDocument(p_idDoc, $data);
            const index = this.experiences.findIndex(el => el.idDoc === p_idDoc);
            if (index > -1)
                this.experiences[index] = p_data;

        },
        async addExperience(p_data) {
            const { setDocument } = useDB('workExperience');
            const $dateStart = new Date(p_data.dateStart); //String to Date --> Ej: 1973-04-06 to "Fri Apr 06 1973 01:00:00 GMT+0100 (hora estnew Date(p_data.dateEnd)ándar de Europa central)"
            const $dateEnd = new Date(p_data.dateEnd);
            //Timestamp.fromDate --> Creamos un Timestamp a partir de un Date
            this.experiences.push(await setDocument({ ...p_data, dateStart: Timestamp.fromDate($dateStart), dateEnd: Timestamp.fromDate($dateEnd) }));
        },
        async deleteExperience(p_idDoc) {
            const { deleteDocument } = useDB('workExperience');
            await deleteDocument(p_idDoc);
            const index = this.experiences.findIndex(el => el.idDoc === p_idDoc);
            if (index > -1) {
                this.experiences.splice(index, 1);
            }
        }
    },
    getters: {
        getExperiencesOrderByDateStart(state) {
            return state.experiences.sort((a, b) => b.dateStart - a.dateStart)
        }
    }
});
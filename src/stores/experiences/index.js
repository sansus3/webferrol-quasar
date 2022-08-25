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
            this.experience = null; //Vacíamos por si tenía datos previos
            const { getDocument } = useDB('workExperience');
            this.experience = await getDocument(p_idDoc);
        },
        async updateExperience(p_data) {
            const { updateDocument } = useDB('workExperience');
            const idDoc = p_data.idDoc;
            const $dateStart = new Date(p_data.dateStart);
            p_data.dateStart = Timestamp.fromDate($dateStart);
            const $dateEnd = new Date(p_data.dateEnd);
            p_data.dateEnd = Timestamp.fromDate($dateEnd);
            await updateDocument(idDoc, p_data);
            const index = this.experiences.findIndex(el => el.idDoc === p_data.idDoc);
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
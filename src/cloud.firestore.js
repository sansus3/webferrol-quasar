import { db } from "./firebase";
import { collection, doc, setDoc, getDocs, getDoc, query, orderBy, limit, startAfter, endBefore, limitToLast } from "firebase/firestore";

export const useDB = ($collection) => {
    /**
     * @describe Insertamos un documento nuevo a una colección en Firestore
     * @param {String} $collection Ruta absoluta referida a una colección
     * @param {Object} $data Datos (propieda,valor) que se desean almacenar como docmento
     */
    const setDocument = async ($data = {}) => {
        // Creamos una referencia de documento con un ID generado automáticamente
        const docRef = doc(collection(db, $collection));
        await setDoc(docRef, { idDoc: docRef.id, createdAt: Date.now(), ...$data });
    }
    /**
     * 
     * @param {String} $field - Campo por el que se ordenará la consulta
     * @param {Number} $perPage - Número de registros a mostrar por página 
     * @returns query - Creates a new immutable instance of Query that is extended to also include additional query constraints.
     */
    const initPage = async ($field, $perPage) => {
        const tmp = {
            data: [],//Array de documentos a mostrar
            last: null,//Último documento de la listas anterior
        }
        const $q = await getDocs(query(
            collection(db, $collection),
            orderBy($field),
            limit($perPage)));
        const tam = $q.docs.length;
        if (tam) {
            tmp.data = $q.docs.map(doc => doc.data());
            tmp.last = $q.docs[tam - 1].id;
        }
        return tmp;
    }
    /**
     * 
     * @param {String} $field Campo por el que se ordenará la consulta
     * @param {String} $last Identificador del documento
     * @param {*} $perPage Número de registros a mostrar por página
     * @returns 
     */
    const nextPage = async ($field, $last, $perPage) => {
        const tmp = {
            data: [],//Array de documentos a mostrar
            last: null,//Último documento de la listas anterior
        }
        const docRef = doc(db, $collection, $last);
        const docSnap = await getDoc(docRef);
        const $q = await getDocs(query(
            collection(db, $collection),
            orderBy($field),
            startAfter(docSnap),
            limit($perPage)));
        const tam = $q.docs.length;
        if (tam) {
            tmp.data = $q.docs.map(doc => doc.data());
            tmp.last = $q.docs[tam - 1].id;
        }
        return tmp;
    }
    /**
     * 
     * @param {String} $field Campo por el que se ordenará la consulta
     * @param {String} $last Identificador del documento
     * @param {*} $perPage Número de registros a mostrar por página
     * @returns 
     */
    const previousPage = async ($field, $last, $perPage) => {
        const tmp = {
            data: [],//Array de documentos a mostrar
            last: null,//Último documento de la listas anterior
        }
        const docRef = doc(db, $collection, $last);
        const docSnap = await getDoc(docRef);
        const $q = await getDocs(query(
            collection(db, $collection),
            orderBy($field),
            endBefore(docSnap),
            limitToLast($perPage)));
        const tam = $q.docs.length;
        if (tam) {
            tmp.data = $q.docs.map(doc => doc.data());
            tmp.last = $q.docs[0].id;
        }
        return tmp;
    }
    const totalRecords = async () => {
        const q = query(collection(db, $collection));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    }
    const totalPages = async ($limit) => {
        const count = await totalRecords();
        return Math.ceil(count / $limit)
    }
    return {
        setDocument,
        initPage,
        nextPage,
        previousPage,
        totalRecords,
        totalPages,
    }
} 

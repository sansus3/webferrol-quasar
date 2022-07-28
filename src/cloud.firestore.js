import { db } from "./firebase";
import { collection, doc, setDoc, getDocs, getDoc, deleteDoc, updateDoc, query, orderBy, limit, startAfter, endBefore, limitToLast } from "firebase/firestore";

export const useDB = ($collection) => {
    /**
     * @describe Insertamos un documento nuevo a una colección en Firestore
     * @param {String} $collection Ruta absoluta referida a una colección
     * @param {Object} $data Datos (propieda,valor) que se desean almacenar como docmento
     * @return {Object} El objeto creado
     */
    const setDocument = async ($data = {}) => {
        // Creamos una referencia de documento con un ID generado automáticamente
        const docRef = doc(collection(db, $collection));
        await setDoc(docRef, { idDoc: docRef.id, createdAt: Date.now(), ...$data });
        return { idDoc: docRef.id, createdAt: Date.now(), ...$data };
    }
    /**
     * 
     * @param {String} $idDoc Identificador del documento
     * @param {Objet} $objectData {property:value,property:value,...}
     */
    const updateDocument = async ($idDoc, $objectData) => {
        await updateDoc(doc(db, $collection, $idDoc), $objectData);
    }
    /**
     * @descrition Obtención de un documento de Cloud Firestore
     * @param {String} $idDoc Identificador del documento de Cloud de Firestore
     * @returns {Object|false} Objeto de datos di encuentra el documento o false si no hay resultados
     */
    const getDocument = async ($idDoc) => {
        const docRef = doc(db, $collection, $idDoc);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists())
            return docSnap.data();
        return false;
    }
    /**
     * 
     * @param {String} $idDoc Referencia de un documento a eliminar
     */
    const deleteDocument = async $idDoc => {
        await deleteDoc(doc(db, $collection, $idDoc));
    }
    /**
     * @description Obtención de una colección de documentos
     * @param {String} $field Campo por la que ordenar la query
     * @returns {Array|Boolean} Array de objetos de la consulta o false si no encuentra nada
     */
    const getDocsOrderBy = async ($field) => {
        const $q = await getDocs(query(
            collection(db, $collection),
            orderBy($field)));
        if ($q.docs.length)
            return $q.docs.map(doc => doc.data());
        return false;
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
     * @param {Object} $last El último docSnap o documento de firestore de la consulta
     * @param {*} $perPage Número de registros a mostrar por página
     * @returns 
     */
    const nextPage = async ($field, $last, $perPage) => {
        const tmp = {
            data: [],//Array de documentos a mostrar
            last: null,//Último documento de la lista anterior
        }
        const docRef = doc(db, $collection, $last);
        const docSnap = await getDoc(docRef);
        const $q = await getDocs(query(
            collection(db, $collection),
            orderBy($field),
            startAfter(docSnap),//Empiea a listar después del docSnap $last
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
     * @param {Object} $last El último docSnap o documento de firestore de la consulta
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
            limitToLast($perPage)));//limitToLast() a fin de establecer una cantidad máxima de elementos secundarios que se sincronicen en un evento determinado.
        const tam = $q.docs.length;
        if (tam) {
            tmp.data = $q.docs.map(doc => doc.data());
            tmp.last = $q.docs[0].id;
        }
        return tmp;
    }
    /**
     * Función que retorna el número de registros de una colección
     * @returns Number 
     */
    const totalRecords = async () => {
        const q = query(collection(db, $collection));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    }
    /**
     * Función que retorn el total de páginas en un sistema de paginación
     * @param {Number} $limit Número de registros que queremos ver por consulta/página
     * @returns {Number}
     */
    const totalPages = async ($limit) => {
        const count = await totalRecords();
        return Math.ceil(count / $limit)
    }
    return {
        setDocument,
        updateDocument,
        getDocument,
        deleteDocument,
        getDocsOrderBy,
        initPage,
        nextPage,
        previousPage,
        totalRecords,
        totalPages,
    }
}

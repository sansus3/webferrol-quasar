import { defineStore } from 'pinia';
import { date } from 'quasar';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, updateEmail, sendPasswordResetEmail, updatePassword, signOut } from "firebase/auth";
import { uploadBlobFile, getURL } from 'src/storage';
import { auth } from '../../firebase';
import { useStoreRooms } from '../rooms';
import { useStoreMessages } from '../messages';

export const useStoreUsers = defineStore({
    id: 'users',
    state: () => ({
        /**
         * Propiedad donde se almacena el objeto persona que viene de firebase
         * @type {Object|null} user - The user object has basic properties such as display name, email, etc. 
         * user:{uid,email,emailVerified,isAnonymous,providerData,stsTokenManager,createdAt,lastLoginAt,apiKey,appName}. La propiedad "providerData" contiene a su vez un array con la siguiente información  [ { "providerId", "uid", "displayName", "email", "phoneNumber", "photoURL" } ]
         * @link https://firebase.google.com/docs/auth/web/manage-users?hl=es&authuser=0
         */
        user: null,
        /**
         * Variable que se carga y descarga en el intervalo en que se carga la sesión del usuario para realizar acciones por ejemplo en TheMenu.vue
         * @type {Boolean} loadingSession
         */
        loadingSession: false
    }),
    actions: {
        setUser(user) {
            this.user = {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                metadata: user.metadata,
            }
            //console.log(user)
        },
        /**
         * Método que nos permite autentificar un usuario en la api 
Autenticación de Firebase
         * @param {Object}  - Se trata de un objeto desestructurado donde se nos pasa el usuario y la contraseña
         * @link https://firebase.google.com/docs/auth/web/password-auth?hl=es&authuser=0
         */
        async signIn({ email, password }) {
            //console.log(email,password)
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            this.setUser(userCredential.user);
        },
        /**
         * Método que nos permite dar de alta en Firebase authentication un usuario vía email y conraseña
         * @param {Object} Objeto con las propiedades string email y password
         *  
         */
        async onCreateUserWithEmailAndPassword({ email, password }) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            this.setUser(userCredential.user);
        },
        /**
         * Método que nos permite cerrar sesión de un usuario. Ver autentificación en el enlace de abajo.
         * @link https://firebase.google.com/docs/auth/web/password-auth?hl=es&authuser=0
         */
        unsubscribeRoom() {
            const storeRooms = useStoreRooms();
            const storeMessages = useStoreMessages();
            storeRooms.rooms = [];
            storeMessages.messages = [];
            storeMessages.handleMessagesListener();
        },
        async loginOut() {
            await signOut(auth);
            this.unsubscribeRoom();
            this.user = null;
        },
        /**
         * @description Updates a user's profile data.
         * @param {Object} profile The profile's displayName and photoURL to update.
         */
        async onUpdateProfile(profile = { displayName, photoURL }) {
            //console.log(profile)
            await updateProfile(auth.currentUser, profile);
            this.user = { ...this.user, ...profile };
            //Actualizamos mediante transacción bien el displayName o photURL de las Rooms o messages
            const store = useStoreMessages();
            await store.updateProfileMessages(this.user.uid, profile, 'rooms');
            await store.updateProfileMessages(this.user.uid, profile, 'messages');
        },
        /**
         * Función que actualiza el correo de un ausuarion autentificado
         * @param {String} email 
         */
        async onUpdateEmail(email) {
            await updateEmail(auth.currentUser, email);
        },
        /**
         * Función para cambiar la contraseña de usuario
         * @param {String} password 
         */
        async onUpdatePassword(password) {
            await updatePassword(auth.currentUser, password);
        },
        /**
         * Subida de fichero al Cloud Storage
         * @param {Object} file 
         */
        async onUploadProfile(file) {
            const response = await uploadBlobFile(file, `profiles/${this.user.uid}`);
            const url = await getURL(`profiles/${this.user.uid}`);
            const profile = { photoURL: url };
            await this.onUpdateProfile(profile);
            this.user = { ...this.user, ...profile };
        },
        /**
         * Función para enviar un correo electrónico de restablecimiento de contraseña a un usuario
         * @param {String} email 
         */
        async onSendPasswordResetEmail(email) {
            await sendPasswordResetEmail(auth, email)
        },
        /**
         * Método que nos permite recargar la propiedad "user" del state en caso de refrescar la página.
         * @returns {null} -Retornamos null, es decir salimos del método en caso de que la propiedad user se encuentre cargada
         */
        async onAuthState() {
            if (this.user !== null)
                return;
            return new Promise(
                (resolve, reject) => {
                    const subscribe = onAuthStateChanged(auth, (user) => {
                        if (user) {
                            // User is signed in, see docs for a list of available properties
                            // https://firebase.google.com/docs/reference/js/firebase.User
                            //console.log(user)
                            // ...
                            this.setUser(user);
                            resolve(user)
                        } else {
                            // User is signed out
                            // ...

                            this.loadingSession = false;
                            resolve(null);
                            this.unsubscribeRoom();
                        }
                    },
                        error => reject(error));
                    subscribe();
                }
            );
        }
    },
    getters: {
        getLastLoginAt: state => {
            const timeStamp = Number(state.user.metadata.lastLoginAt)
            return date.formatDate(timeStamp, 'DD-MM-YYYY HH:mm:ss');
        },
        getLastSignInTime: state => {
            const timeStamp = Number(state.user.metadata.lastSignInTime)
            return date.formatDate(timeStamp, 'DD-MM-YYYY HH:mm:ss');
        }
    }
});
import { useQuasar } from 'quasar';
/**
 * Con este Objeto exportamos funciones de muestra de mensaje en caso error o acierto y así poder reutiliar el código
 * @returns Funciones con mensajes de error/acierto
 */
export const useNotify = () => {

    const $q = useQuasar();
    const error = message => $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: `${message}`
    });
    const ok = message => $q.notify({
        color: 'green-5',
        textColor: 'white',
        icon: 'done',
        message: `${message}`
    });

    return {
        error,
        ok
    }
}
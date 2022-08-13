/**
 * Función que valida un correo a través de una expresión regular
 * @param {String} email - Supuestamente un dirección de correo electrónico
 * @returns {Bool|String} - Verdadero si pasa el test o String(Mensaje si no lo pasa)
 */
const isValidEmail = email => {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(email) || `La dirección de correo "${email}" no es válida`;
}

/**
 * @description toDate ( ) : Date Convert a Timestamp to a JavaScript Date object. This conversion causes a loss of precision since Date objects only support millisecond precision.
 * @param {Object} timestamp - new Timestamp ( seconds :  number ,  nanoseconds :  number ) : Timestamp. Este parámetro es de Firebase.
 * @returns {String} El método toDate de Firebase retorna "JavaScript Date object representing the same point in time as this Timestamp, with millisecond precision". Obtenemos el día, mes y año con cuatro dígitos.
 * @link https://firebase.google.com/docs/reference/node/firebase.firestore.Timestamp
 * @link https://day.js.org/
 */
const getDayMonthFullYear = (timestamp, separator = '/') => {
    if (!timestamp || typeof timestamp.toDate !== 'function') return '';
    const date = new Date(timestamp.toDate());
    return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}${separator}${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}${separator}${date.getFullYear()}`;
}


export { isValidEmail, getDayMonthFullYear }
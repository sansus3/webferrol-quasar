/**
 * Función que valida un correo a través de una expresión regular
 * @param {String} email - Supuestamente un dirección de correo electrónico
 * @returns {Bool|String} - Verdadero si pasa el test o String(Mensaje si no lo pasa)
 */
const isValidEmail = email => {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(email) || `La dirección de correo "${email}" no es válida`;
}

export { isValidEmail }
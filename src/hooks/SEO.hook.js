import { useMeta } from 'quasar'

/**
 * 
 * @param {String} p_title Title del Header
 * @param {*} p_description Atributo Description de la etiqueta meta 
 * @param {*} p_keywords    Atributo Keyword del la etiqueta meta
 */
export const useHookMeta = (p_title = 'WebFerrol', p_description = 'WebFerrol es un nombre que representa un interés personal por la formación y educación en la programación en el ámbito de las páginas y aplicaciones Web.', p_keywords = 'Programación WEB') => {
    const metaData = {
        title: p_title,
        meta: {
            description: {
                name: 'description', content: p_description
            },
            keywords: { name: 'keywords', content: p_keywords },
        },
        // <noscript> tags
        noscript: {
            default: 'This is content for browsers with no JS (or disabled JS)'
        }
    }

    useMeta(metaData);

}
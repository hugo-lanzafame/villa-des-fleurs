import {LanguageProvider} from "../contexts/LanguageProvider"

/**
 * Convert keys in an object to camelCase format.
 *
 * @param {Object} obj - The object to convert.
 * @returns {Object} The object with keys converted to camelCase.
 */
const changeToCamelCase = (obj) => {
    const newObj = {};
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
            newObj[camelCaseKey] = obj[key];
        }
    }
    return newObj;
};

const handleRequiredField = (value, setError) => {
    if ((value instanceof String && value === '') || (value instanceof Array && value.length === 0)) {
        setError(LanguageProvider.translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
        return true;
    }

    setError("");
    return false;
}

export {changeToCamelCase, handleRequiredField}
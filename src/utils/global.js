import {LanguageProvider} from "../contexts/LanguageProvider"

/**
 * Converts the column of a table from snake_case to entity with camelCase.
 *
 * @param {Object} table - The table with snake_case column.
 * @returns {Object} - The entity with camelCase.
 */
const convertTableToEntity = (table) => {
    const result = {};

    for (const [key, value] of Object.entries(table)) {
        const camelKey = key.toLowerCase()
            .replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
        result[camelKey] = value && typeof value === 'object' && !Array.isArray(value)
            ? convertTableToEntity(value) // Recursively handle nested objects
            : value;
    }

    return result;
};

const handleRequiredField = (value, setError) => {
    if ((value instanceof String && value === '') || (value instanceof Array && value.length === 0)) {
        setError(LanguageProvider.translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
        return true;
    }

    setError("");
    return false;
}

export {convertTableToEntity, handleRequiredField}
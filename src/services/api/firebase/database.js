import app from './config';
import {getDatabase, push, ref, set, get, remove} from 'firebase/database';
import PropTypes from 'prop-types';

const database = getDatabase(app);

/**
 * Add a new property in the database.
 *
 * @param {string} propertyName - The name of the property.
 * @returns {Promise<string>} A promise indicating the key of the property.
 * @throws {Error} If there is an error during the creation process.
 */
const addProperty = async (propertyName) => {
    try {
        const propertyThenableRef = push(ref(database, "properties"));

        await set(propertyThenableRef, {
            name: propertyName,
        })

        return propertyThenableRef.key;
    } catch (error) {
        throw error;
    }
}
addProperty.propTypes = {
    propertyName: PropTypes.string.isRequired,
};

/**
 * Get properties from the database and filter them by name.
 *
 * @param {string?} propertyName - The property name to use for sorting.
 * @returns {Promise<Array>} A promise that resolves to an array of properties.
 * @throws {Error} If there is an error during the getting process.
 */
const getPropertiesByFilters = async (propertyName) => {
    try {
        const propertyRef = ref(database, "properties");
        const properties = [];

        const snapshot = await get(propertyRef);
        snapshot.forEach((childSnapshot) => {
            properties.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
            });
        });

        if (propertyName) {
            properties.sort((a, b) => (a[propertyName] < b[propertyName] ? -1 : 1));
        }

        return properties;
    } catch (error) {
        throw error;
    }
};
getPropertiesByFilters.propTypes = {
    propertyName: PropTypes.string,
};

/**
 * Deletes a property from the database by its ID.
 *
 * @param {string} propertyId - The ID of the property to be deleted.
 * @returns {Promise<void>} A promise indicating the success or failure of the deletion.
 * @throws {Error} If there is an error during the deletion process.
 */
const deletePropertyById = async (propertyId) => {
    try {
        const propertyRef = ref(database, `properties/${propertyId}`);

        await remove(propertyRef);
    } catch (error) {
        throw error;
    }
};
deletePropertyById.propTypes = {
    propertyId: PropTypes.string.isRequired,
};

export {addProperty, getPropertiesByFilters, deletePropertyById, database}

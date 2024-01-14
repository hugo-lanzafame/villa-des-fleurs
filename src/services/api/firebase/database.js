import app from './config';
import {getDatabase, push, ref, set, get} from 'firebase/database';
import PropTypes from 'prop-types';

const database = getDatabase(app);
const PROPERTIES_REF = ref(database, "properties");

/**
 * Create a new property in the database.
 *
 * @param {string} propertyName - The name of the property.
 * @returns {Promise<string>} A promise indicating the success or failure of creating the property.
 */
const addProperty = async (propertyName) => {
    try {
        const propertyThenableRef = push(PROPERTIES_REF);

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
 * Get properties from the database and order them by name.
 *
 * @param {string?} propertyName - The property name to use for sorting.
 * @returns {Promise<Array>} A promise that resolves to an array of properties.
 */
const getProperties = async (propertyName) => {
    try {
        const snapshot = await get(PROPERTIES_REF);
        const properties = [];

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
getProperties.propTypes = {
    propertyName: PropTypes.string,
};

export {addProperty, getProperties, database}

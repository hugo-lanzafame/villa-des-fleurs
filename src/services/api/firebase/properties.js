import app from './config';
import {get, getDatabase, push, ref, remove, set} from 'firebase/database';
import PropTypes from 'prop-types';
import {DATABASE} from "../../../constants/database";

const database = getDatabase(app);

/**
 * Add a new property.
 *
 * @param {Property} property - The property object to create.
 * @returns {Promise<string>} A promise indicating the key of the property.
 * @throws {Error} If there is an error during the creation process.
 */
const addProperty = async (property) => {
    try {
        const propertyThenableRef = push(ref(database, DATABASE.PROPERTIES.TABLE));

        await set(propertyThenableRef, {
            [DATABASE.PROPERTIES.COLUMN_NAME]: property.name,
            [DATABASE.PROPERTIES.COLUMN_TYPE]: property.type,
        })

        return propertyThenableRef.key;
    } catch (error) {
        throw error;
    }
}
addProperty.propTypes = {
    property: PropTypes.array.isRequired,
};

/**
 * Update a property.
 *
 * @param {Property} property - The updated property object (with ID).
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @throws {Error} If there is an error during the update process.
 */
const updateProperty = async (property) => {
    try {
        const propertyRef = ref(database, DATABASE.PROPERTIES.TABLE + "/" + property.id);

        await set(propertyRef, {
            [DATABASE.PROPERTIES.COLUMN_NAME]: property.name,
            [DATABASE.PROPERTIES.COLUMN_TYPE]: property.type,
        })
    } catch (error) {
        throw error;
    }
};
updateProperty.propTypes = {
    property: PropTypes.array.isRequired,
};

/**
 * Get a property by ID.
 *
 * @param {string} propertyId - The ID of the property to retrieve.
 * @returns {Promise<Property>} A promise that resolves to the property.
 * @throws {Error} If there is an error during the getting process.
 */
const getPropertyById = async (propertyId) => {
    try {
        const propertyRef = ref(database, DATABASE.PROPERTIES.TABLE + "/" + propertyId);
        const snapshot = await get(propertyRef);

        if (snapshot.exists()) {
            const propertyData = snapshot.val();

            return {
                id: snapshot.key,
                ...propertyData,
            };
        } else {
            new Error(`Property with ID ${propertyId} not found`);
        }
    } catch (error) {
        throw error;
    }
};
getPropertyById.propTypes = {
    propertyId: PropTypes.string.isRequired,
};

/**
 * Get all properties.
 *
 * @returns {Promise<Property>} A promise that resolves to an array of properties.
 * @throws {Error} If there is an error during the getting process.
 */
const getAllProperties = async () => {
    try {
        const propertyRef = ref(database, DATABASE.PROPERTIES.TABLE);
        let properties = [];

        const snapshot = await get(propertyRef);
        snapshot.forEach((childSnapshot) => {
            properties.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
            });
        });
        properties.sort((a, b) => (a.name < b.name ? -1 : 1));

        return properties;
    } catch (error) {
        throw error;
    }
};


/**
 * Delete a property by its ID.
 *
 * @param {string} propertyId - The ID of the property to be deleted.
 * @returns {Promise<void>} A promise indicating the success or failure of the deletion.
 * @throws {Error} If there is an error during the deletion process.
 */
const deletePropertyById = async (propertyId) => {
    try {
        const propertyRef = ref(database, DATABASE.PROPERTIES.TABLE + "/" + propertyId);

        await remove(propertyRef);
    } catch (error) {
        throw error;
    }
};
deletePropertyById.propTypes = {
    propertyId: PropTypes.string.isRequired,
};

export {addProperty, updateProperty, getPropertyById, getAllProperties, deletePropertyById}

import app, {convertTableToEntity} from './config';
import {get, getDatabase, push, ref, remove, set} from 'firebase/database';
import PropTypes from 'prop-types';
import {getCurrentUser} from './auth';
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
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.PROPERTIES.TABLE;
        const propertyThenableRef = push(ref(database, tablePath));

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
    property: PropTypes.object.isRequired,
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
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.PROPERTIES.TABLE;
        const propertyRef = ref(database, tablePath + "/" + property.id);

        await set(propertyRef, {
            [DATABASE.PROPERTIES.COLUMN_NAME]: property.name,
            [DATABASE.PROPERTIES.COLUMN_TYPE]: property.type,
        })
    } catch (error) {
        throw error;
    }
};
updateProperty.propTypes = {
    property: PropTypes.object.isRequired,
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
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.PROPERTIES.TABLE;
        const propertyRef = ref(database, tablePath + "/" + propertyId);
        const snapshot = await get(propertyRef);

        if (snapshot.exists()) {
            const propertyData = snapshot.val();

            return {
                id: snapshot.key,
                ...convertTableToEntity(propertyData),
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
 * @returns {Promise<Property[]>} A promise that resolves to an array of properties.
 * @throws {Error} If there is an error during the getting process.
 */
const getAllProperties = async () => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.PROPERTIES.TABLE;
        const propertyRef = ref(database, tablePath);
        let properties = [];

        const snapshot = await get(propertyRef);
        snapshot.forEach((childSnapshot) => {
            properties.push({
                id: childSnapshot.key,
                ...convertTableToEntity(childSnapshot.val()),
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
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.PROPERTIES.TABLE;
        const propertyRef = ref(database, tablePath + "/" + propertyId);

        await remove(propertyRef);
    } catch (error) {
        throw error;
    }
};
deletePropertyById.propTypes = {
    propertyId: PropTypes.string.isRequired,
};

export {addProperty, updateProperty, getPropertyById, getAllProperties, deletePropertyById}

import app from './config';
import {getDatabase, push, ref, set} from 'firebase/database';
import PropTypes from 'prop-types';

// Get a reference to the database
const database = getDatabase(app);

/**
 * Create a new property in the database.
 *
 * @param {string} buildingName - The name of the property.
 * @returns {Promise<string>} A promise indicating the success or failure of creating the property.
 */
const createBuilding = async (buildingName) => {
    const buildingRef = push(ref(database, 'buildings'));

    await set(buildingRef, {
        buildingName: buildingName,
    })

    return buildingRef.key;
}
createBuilding.propTypes = {
    buildingName: PropTypes.string.isRequired,
};


export {createBuilding, database}

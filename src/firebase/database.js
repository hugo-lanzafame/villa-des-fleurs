import app from './config';
import {getDatabase, push, ref, set} from 'firebase/database';
import PropTypes from 'prop-types';

// Get a reference to the database
const database = getDatabase(app);

/**
 * Create a new building in the database.
 *
 * @param {string} buildingName - The name of the building.
 * @returns {Promise<void>} A promise indicating the success or failure of creating the building.
 */
const createBuilding = async (buildingName) => {
    const buildingRef = push(ref(database, 'buildings'));

    await set(buildingRef, {
        buildingName: buildingName,
    });
}
createBuilding.propTypes = {
    buildingName: PropTypes.string.isRequired,
};


export {createBuilding, database}

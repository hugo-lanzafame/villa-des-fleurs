import app from './config';
import {get, getDatabase, push, ref, remove, set} from 'firebase/database';
import PropTypes from 'prop-types';
import {getCurrentUser} from "./auth";
import {DATABASE} from "../../../constants/database";
import {convertTableToEntity} from "../../../functions/global";

const database = getDatabase(app);

/**
 * Add a new rental.
 *
 * @param {Rental} rental - The rental object to create.
 * @returns {Promise<string>} A promise indicating the key of the rental.
 * @throws {Error} If there is an error during the creation process.
 */
const addRental = async (rental) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.RENTALS.TABLE;
        const rentalThenableRef = push(ref(database, tablePath));

        await set(rentalThenableRef, {
            [DATABASE.RENTALS.COLUMN_NAME]: rental.name,
            [DATABASE.RENTALS.COLUMN_START_DATE]: rental.startDate,
            [DATABASE.RENTALS.COLUMN_END_DATE]: rental.endDate ?? null,
            [DATABASE.RENTALS.COLUMN_RENT_PRICE]: rental.rentPrices,
            [DATABASE.RENTALS.COLUMN_CHARGES_PRICE]: rental.chargesPrices,
            [DATABASE.RENTALS.COLUMN_PROPERTY_ID]: rental.propertyId,
            [DATABASE.RENTALS.COLUMN_TENANT_IDS]: rental.tenantIds,
        })

        return rentalThenableRef.key;
    } catch (error) {
        throw error;
    }
}
addRental.propTypes = {
    rental: PropTypes.object.isRequired,
};

/**
 * Update a rental.
 *
 * @param {Rental} rental - The updated rental object (with ID).
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @throws {Error} If there is an error during the update process.
 */
const updateRental = async (rental) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.RENTALS.TABLE;
        const rentalRef = ref(database, tablePath + "/" + rental.id);

        await set(rentalRef, {
            [DATABASE.RENTALS.COLUMN_NAME]: rental.name,
            [DATABASE.RENTALS.COLUMN_START_DATE]: rental.startDate,
            [DATABASE.RENTALS.COLUMN_END_DATE]: rental.endDate ?? null,
            [DATABASE.RENTALS.COLUMN_RENT_PRICE]: rental.rentPrices,
            [DATABASE.RENTALS.COLUMN_CHARGES_PRICE]: rental.chargesPrices,
            [DATABASE.RENTALS.COLUMN_PROPERTY_ID]: rental.propertyId,
            [DATABASE.RENTALS.COLUMN_TENANT_IDS]: rental.tenantIds,
        })
    } catch (error) {
        throw error;
    }
};
updateRental.propTypes = {
    rental: PropTypes.object.isRequired,
};

/**
 * Get a rental by ID.
 *
 * @param {string} rentalId - The ID of the rental to retrieve.
 * @returns {Promise<Rental>} A promise that resolves to the rental.
 * @throws {Error} If there is an error during the getting process.
 */
const getRentalById = async (rentalId) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.RENTALS.TABLE;
        const rentalRef = ref(database, tablePath + "/" + rentalId);
        const snapshot = await get(rentalRef);

        if (snapshot.exists()) {
            return {
                id: snapshot.key,
                ...convertTableToEntity(snapshot.val()),
            };
        } else {
            new Error(`Rental with ID ${rentalId} not found`);
        }
    } catch (error) {
        throw error;
    }
};
getRentalById.propTypes = {
    rentalId: PropTypes.string.isRequired,
};

/**
 * Get all rentals.
 *
 * @returns {Promise<Rental[]>} A promise that resolves to an array of rentals.
 * @throws {Error} If there is an error during the getting process.
 */
const getAllRentals = async () => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.RENTALS.TABLE;
        const rentalRef = ref(database, tablePath);
        let rentals = [];

        const snapshot = await get(rentalRef);
        snapshot.forEach((childSnapshot) => {
            rentals.push({
                id: childSnapshot.key,
                ...convertTableToEntity(childSnapshot.val()),
            });
        });
        rentals.sort((a, b) => (a.name < b.name ? -1 : 1));

        return rentals;
    } catch (error) {
        throw error;
    }
};


/**
 * Delete a rental by its ID.
 *
 * @param {string} rentalId - The ID of the rental to be deleted.
 * @returns {Promise<void>} A promise indicating the success or failure of the deletion.
 * @throws {Error} If there is an error during the deletion process.
 */
const deleteRentalById = async (rentalId) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.RENTALS.TABLE;
        const rentalRef = ref(database, tablePath + "/" + rentalId);

        await remove(rentalRef);
    } catch (error) {
        throw error;
    }
};
deleteRentalById.propTypes = {
    rentalId: PropTypes.string.isRequired,
};

export {addRental, updateRental, getRentalById, getAllRentals, deleteRentalById}

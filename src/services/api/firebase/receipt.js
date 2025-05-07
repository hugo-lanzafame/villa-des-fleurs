import app from './config';
import {get, getDatabase, push, ref, remove, set} from 'firebase/database';
import PropTypes from 'prop-types';
import {getCurrentUser} from "./auth";
import {DATABASE} from "../../../constants/database";
import {convertTableToEntity} from "../../../functions/global";

const database = getDatabase(app);
const getTablePath = (rentalId) => "users/" + getCurrentUser().uid + "/" +
    DATABASE.RENTALS.TABLE +"/" + rentalId + "/" + DATABASE.RECEIPTS.TABLE;

/**
 * Add a new receipt for a specific rental.
 *
 * @param {string} rentalId - The rental ID of the receipt.
 * @param {Receipt} receipt - The receipt object to create.
 * @returns {Promise<string>} A promise indicating the key of the receipt.
 * @throws {Error} If there is an error during the creation process.
 */
const addReceipt = async (rentalId, receipt) => {
    try {
        const tablePath = getTablePath(rentalId);
        const receiptThenableRef = push(ref(database, tablePath));

        await set(receiptThenableRef, {
            [DATABASE.RECEIPTS.COLUMN_MONTH]: receipt.month,
            [DATABASE.RECEIPTS.COLUMN_RENT]: receipt.rent,
            [DATABASE.RECEIPTS.COLUMN_CHARGES]: receipt.charges,
            [DATABASE.RECEIPTS.COLUMN_MISCELLANEOUS_FEES]: receipt.miscellaneousFees,
            [DATABASE.RECEIPTS.COLUMN_PAYMENT]: receipt.payment,
            [DATABASE.RECEIPTS.COLUMN_DATE]: receipt.date,
            [DATABASE.RECEIPTS.COLUMN_COMMENTARY]: receipt.commentary ?? null,
        })

        return receiptThenableRef.key;
    } catch (error) {
        throw error;
    }
}
addReceipt.propTypes = {
    rentalId: PropTypes.string.isRequired,
    receipt: PropTypes.shape({
        month: PropTypes.string.isRequired,
        rent: PropTypes.number.isRequired,
        charges: PropTypes.number.isRequired,
        miscellaneousFees: PropTypes.number.isRequired,
        payment: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        commentary: PropTypes.string,
    }).isRequired,
};

/**
 * Update a receipt for a specific rental.
 *
 * @param {string} rentalId - The rental ID of the receipt.
 * @param {Receipt} receipt - The updated receipt object (with ID).
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @throws {Error} If there is an error during the update process.
 */
const updateReceipt = async (rentalId, receipt) => {
    try {
        const tablePath = getTablePath(rentalId);
        const receiptRef = ref(database, tablePath + "/" + receipt.id);

        await set(receiptRef, {
            [DATABASE.RECEIPTS.COLUMN_MONTH]: receipt.month,
            [DATABASE.RECEIPTS.COLUMN_RENT]: receipt.rent,
            [DATABASE.RECEIPTS.COLUMN_CHARGES]: receipt.charges,
            [DATABASE.RECEIPTS.COLUMN_MISCELLANEOUS_FEES]: receipt.miscellaneousFees,
            [DATABASE.RECEIPTS.COLUMN_PAYMENT]: receipt.payment,
            [DATABASE.RECEIPTS.COLUMN_DATE]: receipt.date,
            [DATABASE.RECEIPTS.COLUMN_COMMENTARY]: receipt.commentary ?? null,
        })
    } catch (error) {
        throw error;
    }
};
updateReceipt.propTypes = {
    rentalId: PropTypes.string.isRequired,
    receipt: PropTypes.shape({
        month: PropTypes.string.isRequired,
        rent: PropTypes.number.isRequired,
        charges: PropTypes.number.isRequired,
        miscellaneousFees: PropTypes.number.isRequired,
        payment: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        commentary: PropTypes.string,
    }).isRequired,
};

/**
 * Calculate the previous month in 'dd-mm-yyyy' format from a given month.
 *
 * @param {string} date - The current month in 'dd-mm-yyyy' format.
 * @returns {string} The previous month in 'dd-mm-yyyy' format.
 */
const getPreviousMonth = (date) => {
    const [day, month, year] = date.split('-').map(Number);
    let prevMonth = month - 1;
    let prevYear = year;

    if (prevMonth === 0) {
        prevMonth = 12;
        prevYear -= 1;
    }

    return '01-' + prevMonth.toString().padStart(2, '0') + '-' + prevYear;
}
getPreviousMonth.propTypes = {
    date: PropTypes.string.isRequired,
};

/**
 * Get receipts for a specific rental for a given month and the previous month.
 *
 * @param {string} rentalId - The rental ID of the receipts.
 * @param {string} month - The current month in 'dd-mm-yyyy' format.
 * @returns {Promise<Receipt[]>} A promise that resolves to an array of receipts for the current and previous months.
 * @throws {Error} If there is an error during the retrieval process.
 */
const getReceiptsByTenantIdAndMonth = async (rentalId, month) => {
    try {
        const tablePath = getTablePath(rentalId);
        const receiptsRef = ref(database, tablePath);

        const snapshot = await get(receiptsRef);
        const previousMonth = getPreviousMonth(month);
        const receipts = [];

        snapshot.forEach((childSnapshot) => {
            const receiptData = childSnapshot.val();

            if (
                receiptData[DATABASE.RECEIPTS.COLUMN_MONTH] === month ||
                receiptData[DATABASE.RECEIPTS.COLUMN_MONTH] === previousMonth
            ) {
                receipts.push({
                    id: childSnapshot.key,
                    ...convertTableToEntity(receiptData),
                });
            }
        });

        return receipts;
    } catch (error) {
        throw new Error(`Failed to get receipts for tenant: ${error.message}`);
    }
};
getReceiptsByTenantIdAndMonth.propTypes = {
    rentalId: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
};


/**
 * Delete a receipt by its ID for a specific rental.
 *
 * @param {string} rentalId - The rental ID of the receipt.
 * @param {string} receiptId - The ID of the receipt to be deleted.
 * @returns {Promise<void>} A promise indicating the success or failure of the deletion.
 * @throws {Error} If there is an error during the deletion process.
 */
const deleteReceiptById = async (rentalId, receiptId) => {
    try {
        const tablePath = getTablePath(rentalId);
        const receiptRef = ref(database, tablePath + "/" + receiptId);

        await remove(receiptRef);
    } catch (error) {
        throw error;
    }
};
deleteReceiptById.propTypes = {
    rentalId: PropTypes.string.isRequired,
    receiptId: PropTypes.string.isRequired,
};

export {addReceipt, updateReceipt, getReceiptsByTenantIdAndMonth, deleteReceiptById}
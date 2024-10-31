import app, {convertTableToEntity} from './config';
import {get, getDatabase, push, ref, remove, set} from 'firebase/database';
import PropTypes from 'prop-types';
import {getCurrentUser} from "./auth";
import {DATABASE} from "../../../constants/database";

const database = getDatabase(app);

/**
 * Add a new receipt.
 *
 * @param {Receipt} receipt - The receipt object to create.
 * @returns {Promise<string>} A promise indicating the key of the receipt.
 * @throws {Error} If there is an error during the creation process.
 */
const addReceipt = async (receipt) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.RECEIPTS.TABLE;
        const receiptThenableRef = push(ref(database, tablePath));

        await set(receiptThenableRef, {
            [DATABASE.RECEIPTS.COLUMN_RENTAL_ID]: receipt.rentalId,
            [DATABASE.RECEIPTS.COLUMN_MONTH]: receipt.month,
            [DATABASE.RECEIPTS.COLUMN_RENT]: receipt.rent,
            [DATABASE.RECEIPTS.COLUMN_CHARGES]: receipt.charges,
            [DATABASE.RECEIPTS.COLUMN_MISCELLANEOUS_FEES]: receipt.miscellaneousFees,
            [DATABASE.RECEIPTS.COLUMN_PAYMENT]: receipt.payment,
            [DATABASE.RECEIPTS.COLUMN_DATE]: receipt.date,
            [DATABASE.RECEIPTS.COLUMN_BALANCE]: receipt.balance,
            [DATABASE.RECEIPTS.COLUMN_COMMENTARY]: receipt.commentary ?? null,
        })

        return receiptThenableRef.key;
    } catch (error) {
        throw error;
    }
}
addReceipt.propTypes = {
    receipt: PropTypes.object.isRequired,
};

/**
 * Update a receipt.
 *
 * @param {Receipt} receipt - The updated receipt object (with ID).
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @throws {Error} If there is an error during the update process.
 */
const updateReceipt = async (receipt) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.RECEIPTS.TABLE;
        const receiptRef = ref(database, tablePath + "/" + receipt.id);

        await set(receiptRef, {
            [DATABASE.RECEIPTS.COLUMN_RENTAL_ID]: receipt.rentalId,
            [DATABASE.RECEIPTS.COLUMN_MONTH]: receipt.month,
            [DATABASE.RECEIPTS.COLUMN_RENT]: receipt.rent,
            [DATABASE.RECEIPTS.COLUMN_CHARGES]: receipt.charges,
            [DATABASE.RECEIPTS.COLUMN_MISCELLANEOUS_FEES]: receipt.miscellaneousFees,
            [DATABASE.RECEIPTS.COLUMN_PAYMENT]: receipt.payment,
            [DATABASE.RECEIPTS.COLUMN_DATE]: receipt.date,
            [DATABASE.RECEIPTS.COLUMN_BALANCE]: receipt.balance,
            [DATABASE.RECEIPTS.COLUMN_COMMENTARY]: receipt.commentary ?? null,
        })
    } catch (error) {
        throw error;
    }
};
updateReceipt.propTypes = {
    receipt: PropTypes.object.isRequired,
};

/**
 * Get a receipt by ID.
 *
 * @param {string} receiptId - The ID of the receipt to retrieve.
 * @returns {Promise<Receipt>} A promise that resolves to the receipt.
 * @throws {Error} If there is an error during the getting process.
 */
const getReceiptById = async (receiptId) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.RECEIPTS.TABLE;
        const receiptRef = ref(database, tablePath + "/" + receiptId);
        const snapshot = await get(receiptRef);

        if (snapshot.exists()) {
            const receiptData = snapshot.val();

            return {
                id: snapshot.key,
                ...convertTableToEntity(receiptData),
            };
        } else {
            new Error(`Receipt with ID ${receiptId} not found`);
        }
    } catch (error) {
        throw error;
    }
};
getReceiptById.propTypes = {
    receiptId: PropTypes.string.isRequired,
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

/**
 * Get receipts for a specific tenant for a given month and the previous month.
 *
 * @param {string} tenantId - The ID of the tenant.
 * @param {string} month - The current month in 'dd-mm-yyyy' format.
 * @returns {Promise<Receipt[]>} A promise that resolves to an array of receipts for the current and previous months.
 * @throws {Error} If there is an error during the retrieval process.
 */
const getReceiptsByTenantIdAndMonth = async (tenantId, month) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.RECEIPTS.TABLE;
        const currentMonth = month;
        const previousMonth = getPreviousMonth(month);

        const currentMonthRef = ref(database, tablePath
            + `?orderByChild=${DATABASE.RECEIPTS.COLUMN_RENTAL_ID}&equalTo=${tenantId}`);
        const previousMonthRef = ref(database, tablePath
            + `?orderByChild=${DATABASE.RECEIPTS.COLUMN_MONTH}&equalTo=${previousMonth}`);

        const [currentMonthSnapshot, previousMonthSnapshot] = await Promise.all([
            get(currentMonthRef),
            get(previousMonthRef)
        ]);

        let receipts = [];

        currentMonthSnapshot.forEach((childSnapshot) => {
            const receiptData = childSnapshot.val();
            if (receiptData[DATABASE.RECEIPTS.COLUMN_MONTH] === currentMonth) {
                receipts.push({
                    id: childSnapshot.key,
                    ...convertTableToEntity(receiptData),
                });
            }
        });

        previousMonthSnapshot.forEach((childSnapshot) => {
            const receiptData = childSnapshot.val();
            if (receiptData[DATABASE.RECEIPTS.COLUMN_MONTH] === previousMonth) {
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
    tenantId: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
};

/**
 * Get all receipts.
 *
 * @returns {Promise<Receipt[]>} A promise that resolves to an array of receipts.
 * @throws {Error} If there is an error during the getting process.
 */
const getAllReceipts = async () => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.RECEIPTS.TABLE;
        const receiptRef = ref(database, tablePath);
        let receipts = [];

        const snapshot = await get(receiptRef);
        snapshot.forEach((childSnapshot) => {
            receipts.push({
                id: childSnapshot.key,
                ...convertTableToEntity(childSnapshot.val()),
            });
        });
        receipts.sort((a, b) => (a.date < b.date ? -1 : 1));

        return receipts;
    } catch (error) {
        throw error;
    }
};


/**
 * Delete a receipt by its ID.
 *
 * @param {string} receiptId - The ID of the receipt to be deleted.
 * @returns {Promise<void>} A promise indicating the success or failure of the deletion.
 * @throws {Error} If there is an error during the deletion process.
 */
const deleteReceiptById = async (receiptId) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.RECEIPTS.TABLE;
        const receiptRef = ref(database, tablePath + "/" + receiptId);

        await remove(receiptRef);
    } catch (error) {
        throw error;
    }
};
deleteReceiptById.propTypes = {
    receiptId: PropTypes.string.isRequired,
};

export {addReceipt, updateReceipt, getReceiptById, getAllReceipts, deleteReceiptById}
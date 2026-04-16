import app from './config';
import { get, getDatabase, ref, remove, set } from 'firebase/database';
import { getCurrentUser } from "./auth";
import { DATABASE } from "../../../constants/database";

const database = getDatabase(app);
const getTablePath = (rentalId) => "users/" + getCurrentUser().uid + "/" +
    DATABASE.RENTALS.TABLE + "/" + rentalId + "/" + DATABASE.RECEIPTS.TABLE;

/**
 * Clean monthly data to prepare it for Firebase storage.
 * Converts undefined values to null and removes computed properties.
 * Applies decimal formatting to monetary values.
 * 
 * @param {Array} monthsData - Array of monthly data objects.
 * @returns {Object} Cleaned yearly data ready for Firebase.
 */
const prepareYearlyData = (monthsData) => {
    const yearlyData = {};
    
    monthsData.forEach(monthData => {
        if (monthData.isWithinRentalPeriod) {
            // Only save data for months within rental period
            const monthKey = monthData.monthNumber.toString().padStart(2, '0');
            
            // Clean up payment lines - convert undefined to null and remove display properties
            const cleanPaymentLines = monthData.paymentLines.map(line => ({
                [DATABASE.RECEIPTS.COLUMN_MISCELLANEOUS_FEES]: line.miscellaneousFees ? Math.round(line.miscellaneousFees * 100) / 100 : 0,
                [DATABASE.RECEIPTS.COLUMN_PAYMENT]: line.payment === undefined || line.payment === null ? null : Math.round(line.payment * 100) / 100,
                [DATABASE.RECEIPTS.COLUMN_DATE]: line.date || '',
                [DATABASE.RECEIPTS.COLUMN_COMMENTARY]: line.commentary || '',
                isAdditionalLine: line.isAdditionalLine || false
            }));
            
            yearlyData[monthKey] = {
                [DATABASE.RECEIPTS.COLUMN_MONTH_NUMBER]: monthData.monthNumber,
                [DATABASE.RECEIPTS.COLUMN_MISCELLANEOUS_FEES]: monthData.miscellaneousFees ? Math.round(monthData.miscellaneousFees * 100) / 100 : 0,
                [DATABASE.RECEIPTS.COLUMN_PAYMENT_LINES]: cleanPaymentLines
            };
        }
    });
    
    return yearlyData;
};

/**
 * Create yearly receipt data for a specific rental and year.
 *
 * @param {string} rentalId - The rental ID.
 * @param {number} year - The year for which to create the data.
 * @param {Array} monthsData - Array of monthly data objects.
 * @returns {Promise<void>} A promise that resolves when the creation is complete.
 * @throws {Error} If there is an error during the creation process.
 */
const createYearlyReceipts = async (rentalId, year, monthsData) => {
    try {
        const tablePath = getTablePath(rentalId);
        const yearPath = `${tablePath}/${year}`;

        // Check if data already exists
        const yearRef = ref(database, yearPath);
        const existingSnapshot = await get(yearRef);

        if (existingSnapshot.exists()) {
            throw new Error(`Yearly receipts for ${year} already exist. Use updateYearlyReceipts instead.`);
        }

        // Prepare the data to save
        const yearlyData = prepareYearlyData(monthsData);

        // Create the yearly data
        await set(yearRef, yearlyData);
    } catch (error) {
        throw new Error(`Failed to create yearly receipts: ${error.message}`);
    }
};

/**
 * Update yearly receipt data for a specific rental and year.
 *
 * @param {string} rentalId - The rental ID.
 * @param {number} year - The year for which to update the data.
 * @param {Array} monthsData - Array of monthly data objects.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @throws {Error} If there is an error during the update process.
 */
const updateYearlyReceipts = async (rentalId, year, monthsData) => {
    try {
        const tablePath = getTablePath(rentalId);
        const yearPath = `${tablePath}/${year}`;

        // Check if data exists
        const yearRef = ref(database, yearPath);
        const existingSnapshot = await get(yearRef);

        if (!existingSnapshot.exists()) {
            throw new Error(`Yearly receipts for ${year} do not exist. Use createYearlyReceipts instead.`);
        }

        // Prepare the data to save
        const yearlyData = prepareYearlyData(monthsData);

        // Update the yearly data
        await set(yearRef, yearlyData);
    } catch (error) {
        throw new Error(`Failed to update yearly receipts: ${error.message}`);
    }
};

/**
 * Save yearly receipt data for a specific rental and year (create or update).
 *
 * @param {string} rentalId - The rental ID.
 * @param {number} year - The year for which to save the data.
 * @param {Array} monthsData - Array of monthly data objects.
 * @returns {Promise<void>} A promise that resolves when the save is complete.
 * @throws {Error} If there is an error during the save process.
 */
const saveYearlyReceipts = async (rentalId, year, monthsData) => {
    try {
        const tablePath = getTablePath(rentalId);
        const yearPath = `${tablePath}/${year}`;

        // Check if data already exists
        const yearRef = ref(database, yearPath);
        const existingSnapshot = await get(yearRef);

        if (existingSnapshot.exists()) {
            // Data exists, update it
            await updateYearlyReceipts(rentalId, year, monthsData);
        } else {
            // Data doesn't exist, create it
            await createYearlyReceipts(rentalId, year, monthsData);
        }

    } catch (error) {
        throw new Error(`Failed to save yearly receipts: ${error.message}`);
    }
};

/**
 * Get yearly receipt data for a specific rental and year.
 *
 * @param {string} rentalId - The rental ID.
 * @param {number} year - The year for which to get the data.
 * @returns {Promise<Object|null>} A promise that resolves to the yearly data or null if not found.
 * @throws {Error} If there is an error during the retrieval process.
 */
const getYearlyReceipts = async (rentalId, year) => {
    try {
        const tablePath = getTablePath(rentalId);
        const yearPath = `${tablePath}/${year}`;
        const yearRef = ref(database, yearPath);

        const snapshot = await get(yearRef);

        if (snapshot.exists()) {
            return snapshot.val();
        }

        return null;
    } catch (error) {
        throw new Error(`Failed to get yearly receipts: ${error.message}`);
    }
};

/**
 * Delete yearly receipt data for a specific rental and year.
 *
 * @param {string} rentalId - The rental ID.
 * @param {number} year - The year for which to delete the data.
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 * @throws {Error} If there is an error during the deletion process.
 */
const deleteYearlyReceipts = async (rentalId, year) => {
    try {
        const tablePath = getTablePath(rentalId);
        const yearPath = `${tablePath}/${year}`;
        const yearRef = ref(database, yearPath);

        await remove(yearRef);
    } catch (error) {
        throw new Error(`Failed to delete yearly receipts: ${error.message}`);
    }
};

export { createYearlyReceipts, updateYearlyReceipts, saveYearlyReceipts, getYearlyReceipts, deleteYearlyReceipts }
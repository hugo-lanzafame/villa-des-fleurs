/**
 * Constants representing database-related information.
 *
 * @typedef {Object} DatabaseConstants
 * @property {PropertyConstants} PROPERTIES - Constants for the 'properties' table.
 * @property {TenantConstants} TENANTS - Constants for the 'tenants' table.
 * @property {RentalConstants} RENTALS - Constants for the 'rentals' table.
 * @property {ReceiptConstants} RECEIPTS - Constants for the 'receipts' table.
 */

/**
 * Object containing constants representing database-related information.
 *
 * @type {DatabaseConstants}
 * @readonly
 */
const DATABASE = {
    /**
     * Constants representing 'properties' database structure.
     *
     * @typedef {Object} PropertyConstants
     * @property {string} TABLE - The name of the 'properties' table.
     * @property {string} COLUMN_NAME - The column name for property names.
     * @property {string} COLUMN_TYPE - The column name for property types.
     * @property {string} COLUMN_TENANTS - The column name for property tenants.
     */

    /**
     * Object containing constants representing 'properties' database structure
     * @type {PropertyConstants}
     */
    PROPERTIES: {
        /**
         * The name of the 'properties' database.
         * @type {string}
         */
        TABLE: 'properties',

        /**
         * The column 'name' of the 'properties' database.
         * @type {string}
         */
        COLUMN_NAME: 'name',

        /**
         * The column 'type' of the 'properties' database.
         * @type {string}
         */
        COLUMN_TYPE: 'type',
    },

    /**
     * Constants representing 'tenants' database structure.
     *
     * @typedef {Object} TenantConstants
     * @property {string} TABLE - The name of the 'tenants' table.
     * @property {string} COLUMN_NAME - The column name for tenant names.
     * @property {string} COLUMN_PHONE - The column name for tenant phone numbers.
     * @property {string} COLUMN_EMAIL - The column name for tenant email addresses.
     */

    /**
     * Object containing constants representing 'tenants' database structure
     * @type {TenantConstants}
     */
    TENANTS: {
        /**
         * The name of the 'tenants' database.
         * @type {string}
         */
        TABLE: 'tenants',

        /**
         * The column 'name' of the 'tenants' database.
         * @type {string}
         */
        COLUMN_NAME: 'name',

        /**
         * The column 'phone' of the 'tenants' database.
         * @type {string}
         */
        COLUMN_PHONE: 'phone',

        /**
         * The column 'email' of the 'tenants' database.
         * @type {string}
         */
        COLUMN_EMAIL: 'email',
    },

    /**
     * Constants representing 'rentals' database structure.
     *
     * @typedef {Object} RentalConstants
     * @property {string} TABLE - The name of the 'rentals' table.
     * @property {string} COLUMN_START_DATE - The column name for rental start date.
     * @property {string} COLUMN_END_DATE - The column name for rental end date.
     * @property {string} COLUMN_RENT_PRICES - The column name for rental rent price.
     * @property {string} COLUMN_CHARGES_PRICES - The column name for rental charges price.
     * @property {string} COLUMN_PROPERTY_ID - The column name for rental property ID.
     * @property {string} COLUMN_TENANT_IDS - The column name for rental tenant IDs.
     */

    /**
     * Object containing constants representing 'rentals' database structure
     * @type {RentalConstants}
     */
    RENTALS: {
        /**
         * The name of the 'rentals' database.
         * @type {string}
         */
        TABLE: 'rentals',

        /**
         * The column 'name' of the 'rentals' database.
         * @type {string}
         */
        COLUMN_NAME: 'name',

        /**
         * The column 'start_date' of the 'rentals' database.
         * @type {string}
         */
        COLUMN_START_DATE: 'start_date',

        /**
         * The column 'end_date' of the 'rentals' database.
         * @type {string}
         */
        COLUMN_END_DATE: 'end_date',

        /**
         * The column 'rent_prices' of the 'rentals' database.
         * @type {[string, number]}
         */
        COLUMN_RENT_PRICES: "rent_prices",

        /**
         * The column 'charges_prices' of the 'rentals' database.
         * @type {[string, number]}
         */
        COLUMN_CHARGES_PRICES: "charges_prices",

        /**
         * The column 'property_id' of the 'rentals' database.
         * @type {string}
         */
        COLUMN_PROPERTY_ID: 'property_id',

        /**
         * The column 'tenant_ids' of the 'rentals' database.
         * @type {string}
         */
        COLUMN_TENANT_IDS: 'tenant_ids',
    },

    /**
     * Constants representing 'receipts' database structure.
     *
     * @typedef {Object} ReceiptConstants
     * @property {string} TABLE - The name of the 'receipts' table.
     * @property {string} COLUMN_MONTH_NUMBER - The column name for receipt month number.
     * @property {string} COLUMN_MISCELLANEOUS_FEES - The column name for receipt miscellaneous fees.
     * @property {string} COLUMN_YEAR - The column name for receipt year.
     * @property {string} COLUMN_PAYMENT_LINES - The column name for receipt payment lines.
     */

    /**
     * Object containing constants representing 'receipts' database structure
     * @type {ReceiptConstants}
     */
    RECEIPTS: {
        /**
         * The name of the 'receipts' database.
         * @type {string}
         */
        TABLE: 'receipts',

        // Legacy columns (for backward compatibility with old receipt structure)
        /**
         * The column 'month' of the 'receipts' database (legacy).
         * @type {string}
         * @deprecated Use COLUMN_MONTH_NUMBER instead
         */
        COLUMN_MONTH: 'month',

        /**
         * The column 'payment' of the 'receipts' database (legacy).
         * @type {string}
         * @deprecated Use COLUMN_PAYMENT_LINES instead
         */
        COLUMN_PAYMENT: 'payment',

        /**
         * The column 'date' of the 'receipts' database (legacy).
         * @type {string}
         * @deprecated Use COLUMN_PAYMENT_LINES instead
         */
        COLUMN_DATE: 'date',

        /**
         * The column 'commentary' of the 'receipts' database (legacy).
         * @type {string}
         * @deprecated Use COLUMN_PAYMENT_LINES instead
         */
        COLUMN_COMMENTARY: 'commentary',

        // Current columns used in the new receipt system
        /**
         * The column 'month_number' of the 'receipts' database.
         * @type {string}
         */
        COLUMN_MONTH_NUMBER: 'month_number',

        /**
         * The column 'miscellaneous_fees' of the 'receipts' database.
         * @type {string}
         */
        COLUMN_MISCELLANEOUS_FEES: 'miscellaneous_fees',

        /**
         * The column 'year' of the 'receipts' database.
         * @type {string}
         */
        COLUMN_YEAR: 'year',

        /**
         * The column 'payment_lines' of the 'receipts' database.
         * Contains array of payment objects with payment, date, commentary, etc.
         * @type {string}
         */
        COLUMN_PAYMENT_LINES: 'payment_lines',
    },
};

export {DATABASE};
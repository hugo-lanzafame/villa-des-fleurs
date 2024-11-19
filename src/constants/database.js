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
     * @property {string} COLUMN_RENT_PRICE - The column name for rental rent price.
     * @property {string} COLUMN_CHARGES_PRICE - The column name for rental charges price.
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
         * The column 'rent_price' of the 'rentals' database.
         * @type {string}
         */
        COLUMN_RENT_PRICE: 'rent_price',

        /**
         * The column 'charges_price' of the 'rentals' database.
         * @type {string}
         */
        COLUMN_CHARGES_PRICE: 'charges_price',

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
     * @property {string} COLUMN_MONTH - The column name for receipt month.
     * @property {string} COLUMN_RENT - The column name for receipt rent.
     * @property {string} COLUMN_CHARGES - The column name for receipt charges.
     * @property {string} COLUMN_MISCELLANEOUS_FEES - The column name for receipt miscellaneous fees.
     * @property {string} COLUMN_PAYMENT - The column name for receipt payment.
     * @property {string} COLUMN_DATE - The column name for receipt date of payment.
     * @property {string} COLUMN_COMMENTARY - The column name for receipt commentary.
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

        /**
         * The column 'month' of the 'receipts' database.
         * @type {string}
         */
        COLUMN_MONTH: 'month',

        /**
         * The column 'rent' of the 'receipts' database.
         * @type {string}
         */
        COLUMN_RENT: 'rent',

        /**
         * The column 'charges' of the 'receipts' database.
         * @type {string}
         */
        COLUMN_CHARGES: 'charges',

        /**
         * The column 'miscellaneous_fees' of the 'receipts' database.
         * @type {string}
         */
        COLUMN_MISCELLANEOUS_FEES: 'miscellaneous_fees',

        /**
         * The column 'payment' of the 'receipts' database.
         * @type {string}
         */
        COLUMN_PAYMENT: 'payment',

        /**
         * The column 'date' of the 'receipts' database.
         * @type {string}
         */
        COLUMN_DATE: 'date',

        /**
         * The column 'commentary' of the 'receipts' database.
         * @type {string}
         */
        COLUMN_COMMENTARY: 'commentary',
    },
};

export {DATABASE};
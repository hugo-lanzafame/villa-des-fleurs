/**
 * Constants representing database-related information.
 *
 * @typedef {Object} DatabaseConstants
 * @property {PropertyConstants} PROPERTIES - Constants for the 'properties' table.
 * @property {TenantConstants} TENANTS - Constants for the 'tenants' table.
 * @property {RentalConstants} RENTALS - Constants for the 'rentals' table.
 */

/**
 * Constants representing 'properties' database structure.
 *
 * @typedef {Object} PropertyConstants
 * @property {string} TABLE - The name of the 'properties' table.
 * @property {string} COLUMN_NAME - The column name for property names.
 * @property {string} COLUMN_TYPE - The column name for property types.
 */

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
 * Constants representing 'rentals' database structure.
 *
 * @typedef {Object} RentalConstants
 * @property {string} TABLE - The name of the 'rentals' table.
 * @property {string} COLUMN_START_DATE - The column name for rental start dates.
 * @property {string} COLUMN_END_DATE - The column name for rental end dates.
 * @property {string} COLUMN_TENANT_IDS - The column name for tenant IDs in rentals.
 * @property {string} COLUMN_PROPERTY_IDS - The column name for property IDs in rentals.
 */

/**
 * Object containing constants representing database-related information.
 *
 * @type {DatabaseConstants}
 * @readonly
 */
const DATABASE = {
    /**
     * Object containing constants representing 'properties' database structure
     * @type {string}
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
     * Object containing constants representing 'tenants' database structure
     * @type {string}
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
     * Object containing constants representing 'rentals' database structure
     * @type {string}
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
         * The column 'tenant_ids' of the 'rentals' database.
         * @type {string}
         */
        COLUMN_TENANT_IDS: 'tenant_ids',

        /**
         * The column 'property_id' of the 'rentals' database.
         * @type {string}
         */
        COLUMN_PROPERTY_ID: 'property_id',
    },
};

export {DATABASE};
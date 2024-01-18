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

        /**
         * The column 'type' of the 'properties' database.
         * @type {string}
         */
        COLUMN_TENANTS: 'tenants',
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
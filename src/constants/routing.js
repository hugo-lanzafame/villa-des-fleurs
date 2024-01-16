/**
 * Constants representing database-related information.
 *
 * @typedef {Object} PathConstants
 * @property {string} LOGIN - Login path.
 * @property {string} HOME - Home path.
 * @property {string} MANAGEMENT - Management path.
 * @property {string} PROPERTIES - Properties list path.
 * @property {string} PROPERTIES_CREATION - Properties creation path.
 * @property {string} PROPERTIES_EDITION - Properties edition path.
 * @property {string} TENANTS - Tenants list path.
 * @property {string} TENANTS_CREATION - Tenants creation path.
 * @property {string} TENANTS_EDITION - Tenants edition path.
 * @property {string} RENTALS - Rentals list path.
 * @property {string} RENTALS_CREATION - Rentals creation path.
 * @property {string} RENTALS_EDITION - Rentals edition path.
 * @property {string} TOOLS - Tools path.
 * @property {string} QUITTANCES - Quittances list path.
 * @property {string} QUITTANCES_CREATION - Quittances creation path.
 * @property {string} QUITTANCES_EDITION - Quittances edition path.
 * @property {string} ACCOUNT - Account path.
 * @property {string} UNKNOWN - Unknown path.
 */

/**
 * Object containing constants for various paths in the application.
 *
 * @type {PathConstants}
 * @readonly
 */
const PATHS = {
    /**
     * The path for the login page.
     * @type {string}
     */
    LOGIN: "/login",

    /**
     * The path for the home page.
     * @type {string}
     */
    HOME: "/",

    /**
     * The path for the management page.
     * @type {string}
     */
    MANAGEMENT: "/management",

    /**
     * The path for the properties list page.
     * @type {string}
     */
    PROPERTIES: "/management/properties",

    /**
     * The path for the properties creation page.
     * @type {string}
     */
    PROPERTIES_CREATION: "/management/properties/create",

    /**
     * The path for the properties edition page.
     * @type {string}
     */
    PROPERTIES_EDITION: "/management/properties/edit",

    /**
     * The path for the tenants list page.
     * @type {string}
     */
    TENANTS: "/management/tenants",

    /**
     * The path for the tenants creation page.
     * @type {string}
     */
    TENANTS_CREATION: "/management/tenants/create",

    /**
     * The path for the tenants edition page.
     * @type {string}
     */
    TENANTS_EDITION: "/management/tenants/edit",

    /**
     * The path for the rentals list page.
     * @type {string}
     */
    RENTALS: "/management/rentals",

    /**
     * The path for the rentals creation page.
     * @type {string}
     */
    RENTALS_CREATION: "/management/rentals/create",

    /**
     * The path for the rentals edition page.
     * @type {string}
     */
    RENTALS_EDITION: "/management/rentals/edit",

    /**
     * The path for the tools page.
     * @type {string}
     */
    TOOLS: "/tools",

    /**
     * The path for the quittances list page.
     * @type {string}
     */
    QUITTANCES: "/tools/quittances",

    /**
     * The path for the quittances creation page.
     * @type {string}
     */
    QUITTANCES_CREATION: "/tools/quittances/create",

    /**
     * The path for the quittances edition page.
     * @type {string}
     */
    QUITTANCES_EDITION: "/tools/quittances/edit",

    /**
     * The path for the account page.
     * @type {string}
     */
    ACCOUNT: "/account",

    /**
     * The path for unknown page.
     * @type {string}
     */
    UNKNOWN: "*",
}

export {PATHS};
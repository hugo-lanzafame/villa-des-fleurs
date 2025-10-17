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
 * @property {string} RECEIPTS - Receipts list path.
 * @property {string} RECEIPTS_CREATION - Receipts creation path.
 * @property {string} RECEIPTS_EDITION - Receipts edition path.
 * @property {string} ACCOUNT - Account path.
 * @property {string} NOT_FOUND - Not found/unknown path.
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
     * The path for the property list page.
     * @type {string}
     */
    PROPERTIES: "/management/properties",

    /**
     * The path for the property creation page.
     * @type {string}
     */
    PROPERTIES_CREATION: "/management/properties/create",

    /**
     * The path for the property edition page.
     * @type {string}
     */
    PROPERTIES_EDITION: "/management/properties/edit",

    /**
     * The path for the tenant list page.
     * @type {string}
     */
    TENANTS: "/management/tenants",

    /**
     * The path for the tenant creation page.
     * @type {string}
     */
    TENANTS_CREATION: "/management/tenants/create",

    /**
     * The path for the tenant edition page.
     * @type {string}
     */
    TENANTS_EDITION: "/management/tenants/edit",

    /**
     * The path for the rental list page.
     * @type {string}
     */
    RENTALS: "/management/rentals",

    /**
     * The path for the rental creation page.
     * @type {string}
     */
    RENTALS_CREATION: "/management/rentals/create",

    /**
     * The path for the rental edition page.
     * @type {string}
     */
    RENTALS_EDITION: "/management/rentals/edit",

    /**
     * The path for the tool page.
     * @type {string}
     */
    TOOLS: "/tools",

    /**
     * The path for the receipt list page.
     * @type {string}
     */
    RECEIPTS: "/tools/receipts",

    /**
     * The path for the receipt creation page.
     * @type {string}
     */
    RECEIPTS_CREATION: "/tools/receipts/create",

    /**
     * The path for the receipt edition page.
     * @type {string}
     */
    RECEIPTS_EDITION: "/tools/receipts/edit",

    /**
     * The path for the account page.
     * @type {string}
     */
    ACCOUNT: "/account",

    /**
     * The path for not-found page.
     * @type {string}
     */
    NOT_FOUND: "*",
}

export {PATHS};
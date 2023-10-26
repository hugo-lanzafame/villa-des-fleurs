/**
 * Constants representing types of login forms.
 *
 * @type {Object} LoginFormTypeConstants
 * @property {string} LOGIN - Standard login form.
 * @property {string} FORGOT - Password recovery form.
 */
const LOGIN_FORM_TYPES = {
    /**
     * Represents the standard login form.
     * @type {string}
     * @value login
     */
    LOGIN: "login",

    /**
     * Represents the password recovery (forgot password) form.
     * @type {string}
     * @value forgot
     */
    FORGOT: "forgot",
};

/**
 * Constants for log types.
 *
 * @type {Object} LogTypeConstants
 * @property {string} SUCCESS - Success log.
 * @property {string} ERROR - Error log.
 */
const LOG_TYPES = {
    /**
     * Log type for success messages.
     * @type {string}
     * @value success
     */
    SUCCESS: "success",

    /**
     * Log type for error messages.
     * @type {string}
     * @value error
     */
    ERROR: "error",
};

/**
 * Constants for various paths in the application.
 *
 * @type {Object} PathConstants
 * @property {string} LOGIN - Login path.
 * @property {string} HOME - Home path.
 * @property {string} MANAGEMENT - Management path.
 * @property {string} PROPERTIES - Properties management path.
 * @property {string} PROPERTIES_GESTION - Properties management path.
 * @property {string} TENANTS - Tenants management path.
 * @property {string} TENANTS_GESTION - Tenants management path.
 * @property {string} ACCOUNT - Account path.
 */
const PATHS = {
    /**
     * The path for the login page.
     * @type {string}
     * @value /login
     */
    LOGIN: "/login",

    /**
     * The path for the home page.
     * @type {string}
     * @value /
     */
    HOME: "/",

    /**
     * The path for the management page.
     * @type {string}
     * @value /management
     */
    MANAGEMENT: "/management",

    /**
     * The path for the properties page.
     * @type {string}
     * @value /management/properties
     */
    PROPERTIES: "/management/properties",

    /**
     * The path for the properties gestion page.
     * @type {string}
     * @value /management/properties/gestion
     */
    PROPERTIES_GESTION: "/management/properties/gestion",

    /**
     * The path for the tenants page.
     * @type {string}
     * @value /management/tenants
     */
    TENANTS: "/management/tenants",

    /**
     * The path for the tenants gestion page.
     * @type {string}
     * @value /management/tenants/gestion
     */
    TENANTS_GESTION: "/management/tenants/gestion",

    /**
     * The path for the account page.
     * @type {string}
     * @value /account
     */
    ACCOUNT: "/account",
}

/**
 * Constants representing different property types.
 *
 * @type {Object}
 * @property {string} APARTMENT - Apartment type.
 * @property {string} BUILDING - Building type.
 *
 * @note
 * Please add translations for these property types in 'translations.json'.
 */
const PROPERTY_TYPES = {
    /**
     * Represents an apartment property type.
     * @type {string}
     * @value apartment
     */
    APARTMENT: 'apartment',

    /**
     * Represents a building property type.
     * @type {string}
     * @value building
     */
    BUILDING: 'building',
}

export {
    LOGIN_FORM_TYPES,
    LOG_TYPES,
    PATHS,
    PROPERTY_TYPES
};
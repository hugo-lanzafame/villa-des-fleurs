/**
 * Constants representing types of login forms.
 *
 * @type {Object} LoginFormTypeConstants
 * @readonly
 * @property {string} LOGIN - Standard login form.
 * @property {string} FORGOT - Password recovery form.
 */
const LOGIN_PAGE_FORM_TYPES = {
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
 * Constants for various paths in the application.
 *
 * @type {Object} PathConstants
 * @readonly
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
 * @readonly
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

/**
 * An enumeration of possible error codes related to the login form.
 *
 * @type {Object}
 * @readonly
 * @property {string} INVALID_EMAIL - Invalid email address.
 * @property {string} WRONG_PASSWORD - Incorrect password.
 * @property {string} USER_NOT_FOUND - User not found for the provided email.
 * @property {string} MISSING_EMAIL - Email is required.
 * @property {string} MISSING_PASSWORD - Password is required.
 * @property {string} TOO_MANY_REQUEST - Too many login attempts. Try again later.
 * @property {string} NETWORK_REQUEST_FAILED - Network error. Check your connection.
 * @property {string} USER_DISABLED - User account disabled by an admin.
 * @property {string} WEAK_PASSWORD - Weak password. Choose a stronger one.
 */
const LOGIN_PAGE_FORM_ERRORS = {
    /**
     * Error constant for an invalid email.
     * @type {string}
     * @value auth/invalid-email
     */
    INVALID_EMAIL : "auth/invalid-email",

    /**
     * Error constant for a wrong password.
     * @type {string}
     * @value auth/wrong-password
     */
    WRONG_PASSWORD : "auth/wrong-password",

    /**
     * Error constant for a user not found.
     * @type {string}
     * @value auth/user-not-found
     */
    USER_NOT_FOUND : "auth/user-not-found",

    /**
     * Error constant for a missing email.
     * @type {string}
     * @value auth/missing-email
     */
    MISSING_EMAIL : "auth/missing-email",

    /**
     * Error constant for a missing password.
     * @type {string}
     * @value auth/missing-password
     */
    MISSING_PASSWORD : "auth/missing-password",

    /**
     * Error constant for too many login attempts.
     * @type {string}
     * @value auth/too-many-requests
     */
    TOO_MANY_REQUEST : "auth/too-many-requests",

    /**
     * Error constant for a network request failure.
     * @type {string}
     * @value auth/network-request-failed
     */
    NETWORK_REQUEST_FAILED : "auth/network-request-failed",

    /**
     * Error constant for a disabled user account.
     * @type {string}
     * @value auth/user-disabled
     */
    USER_DISABLED : "auth/user-disabled",

    /**
     * Error constant for a weak password.
     * @type {string}
     * @value auth/weak-password
     */
    WEAK_PASSWORD : "auth/weak-password",
}

export {
    LOGIN_PAGE_FORM_TYPES,
    PATHS,
    PROPERTY_TYPES,
    LOGIN_PAGE_FORM_ERRORS
};
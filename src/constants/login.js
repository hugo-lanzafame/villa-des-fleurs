/**
 * Object containing constants representing types of login forms.
 *
 * @type {LoginFormTypeConstants}
 * @readonly
 */
const LOGIN_FORM_TYPES = {
    /**
     * Represents the standard login form.
     * @type {string}
     */
    LOGIN: "login",

    /**
     * Represents the password recovery (forgot password) form.
     * @type {string}
     */
    FORGOT: "forgot",
};

/**
 * Object containing constants of possible error codes related to the login form.
 *
 * @type {LoginFormErrorsConstants}
 * @readonly
 */
const LOGIN_FORM_ERRORS = {
    /**
     * Error constant for an invalid email.
     * @type {string}
     */
    INVALID_EMAIL : "auth/invalid-email",

    /**
     * Error constant for a wrong password.
     * @type {string}
     */
    WRONG_PASSWORD : "auth/wrong-password",

    /**
     * Error constant for a user not found.
     * @type {string}
     */
    USER_NOT_FOUND : "auth/user-not-found",

    /**
     * Error constant for a missing email.
     * @type {string}
     */
    MISSING_EMAIL : "auth/missing-email",

    /**
     * Error constant for a missing password.
     * @type {string}
     */
    MISSING_PASSWORD : "auth/missing-password",

    /**
     * Error constant for too many login attempts.
     * @type {string}
     */
    TOO_MANY_REQUEST : "auth/too-many-requests",

    /**
     * Error constant for a network request failure.
     * @type {string}
     */
    NETWORK_REQUEST_FAILED : "auth/network-request-failed",

    /**
     * Error constant for a disabled user account.
     * @type {string}
     */
    USER_DISABLED : "auth/user-disabled",

    /**
     * Error constant for a weak password.
     * @type {string}
     */
    WEAK_PASSWORD : "auth/weak-password",
}

export {LOGIN_FORM_TYPES, LOGIN_FORM_ERRORS}
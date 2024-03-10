import PropTypes from "prop-types";
import app from './config';
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';

/**
 * Get a reference to the authentication
 */
const auth = getAuth(app);

/**
 * Sign in the user with the provided email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<void>} A promise indicating the success or failure of the sign-in.
 */
const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    console.log(auth.currentUser)
};
signInUser.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

/**
 * Sign out the currently authenticated user.
 *
 * @returns {Promise<void>} A promise indicating the success or failure of the sign-out.
 */
const signOutUser = async () => {
    await signOut(auth);
};

/**
 * Send a password reset email to the provided email address.
 *
 * @param {string} email - The user's email address.
 * @returns {Promise<void>} A promise indicating the success or failure of sending the password reset email.
 */
const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
};
resetPassword.propTypes = {
    email: PropTypes.string.isRequired,
};

/**
 * Check if a user is authenticated and set the user state.
 *
 * @return {Promise<boolean>}
 */
const isAuth = async () => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user !== null);
        });
    });
}

/**
 * Return information about current user
 *
 * @return {User} Information about current user
 */
const getCurrentUser = () => {
    return auth.currentUser;
}

export {resetPassword, signInUser, signOutUser, isAuth, getCurrentUser};

import app from './firebaseConfig';
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth';
import PropTypes from "prop-types";

const auth = getAuth(app);

/**
 * Effectue la connexion avec l'e-mail et le mot de passe fournis.
 *
 * @param {string} email - L'adresse e-mail de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @param {function} setLog - La fonction de gestion des logs.
 * @returns {Promise<void>} Une promesse indiquant la réussite ou l'échec de la connexion.
 */
const signIn = async (email, password, setLog) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        setLog('[default] Firebase: success (auth/valid-sign-in).')
    } catch (error) {
        setLog('[default] ' + error.message);
    }
};
signIn.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setLog: PropTypes.func.isRequired,
};

/**
 * Envoie un e-mail de réinitialisation de mot de passe à l'adresse fournie.
 *
 * @param {string} email - L'adresse e-mail de l'utilisateur.
 * @param {function} setLog - La fonction de gestion des logs.
 * @returns {Promise<void>} Une promesse indiquant la réussite ou l'échec de l'envoi de l'e-mail de réinitialisation.
 */
const passwordReset = async (email, setLog) => {
    try {
        await sendPasswordResetEmail(auth, email);
        setLog('[forgot] Firebase: success (auth/valid-reset-password).');
    } catch (error) {
        setLog('[forgot] ' + error.message);
    }
};
passwordReset.propTypes = {
    email: PropTypes.string.isRequired,
    setLog: PropTypes.func.isRequired,
};

export {passwordReset, signIn};
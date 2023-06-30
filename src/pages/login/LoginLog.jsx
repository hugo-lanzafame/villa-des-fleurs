import React from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from '@mui/material';

/**
 * Composant de journal de connexion affichant différents types de logs.
 *
 * @param {Object} props - Les props du composant.
 * @param {string} props.log - Le texte du log.
 * @returns {JSX.Element} Le composant LoginLog.
 */
const LoginLog = ({log}) => {
    let type = '';
    let text = '';

    const LOG_TYPES = {
        SUCCESS: "success",
        ERROR: "error",
    };

    switch (log) {
        case '[forgot] Firebase: Error (auth/user-not-found).':
        case '[forgot] Firebase: success (auth/valid-reset-password).':
            type = LOG_TYPES.SUCCESS;
            text = 'Si l\'e-mail fournit correspond a un compte,' +
                ' alors un mail permettant de réinitialiser le mot de passe vous a été envoyé.';
            break
        case '[default] Firebase: Error (auth/invalid-email).':
        case '[forgot] Firebase: Error (auth/missing-email).':
            type = LOG_TYPES.ERROR;
            text = 'Veuillez renseigner un e-mail valide.';
            break
        case '[default] Firebase: Error (auth/missing-password).':
            type = LOG_TYPES.ERROR;
            text = 'Veuillez renseigner un mot de passe.';
            break
        case '[default] Firebase: Error (auth/user-not-found).':
        case '[default] Firebase: Error (auth/wrong-password).':
            type = LOG_TYPES.ERROR;
            text = 'Si l\'e-mail fournit correspond a un compte,' +
                ' alors le mot de passe est erroné.';
            break;
        case '[default] Firebase: success (auth/valid-sign-in).':
            break;
        default:
            type = LOG_TYPES.ERROR;
            text = log;
            break;
    }

    return (
        <Box
            className={`login-log login-log--${type}`}
        >
            <Typography variant="text">{text}</Typography>
        </Box>
    );
};
LoginLog.propTypes = {
    log: PropTypes.string.isRequired,
};

export default LoginLog;

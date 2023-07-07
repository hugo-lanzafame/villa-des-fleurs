import React from 'react';
import {Box, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import {LOG_TYPES} from "../../constants";

/**
 * Component for displaying different types of login logs.
 *
 * @param {Object} props - The component props.
 * @param {string} props.log - The log text.
 * @returns {JSX.Element} The CustomLog component.
 */
const CustomLog = ({log}) => {
    let type = '';
    let text = '';

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
        <Box className={`custom-log custom-log__${type}`}>
            <Typography variant="text">{text}</Typography>
        </Box>
    );
};
CustomLog.propTypes = {
    log: PropTypes.string.isRequired,
};

export default CustomLog;

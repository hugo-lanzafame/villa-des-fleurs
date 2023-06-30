import React from 'react';
import {Grid, TextField} from "@mui/material";
import './loginPage.scss';
import PropTypes from "prop-types";

/**
 * Composant d'entrée personnalisé à utiliser dans la page LoginPage
 *
 * @param {Object} props - Les props du composant.
 * @param {string} props.label - Le texte du label de l'entrée.
 * @param {string} props.type - Le type de l'entrée.
 * @param {string} props.name - Le nom de l'entrée.
 * @param {string} props.value - La valeur de l'entrée.
 * @param {function} props.handleChange - La fonction de gestion du changement de valeur de l'entrée.
 * @returns {JSX.Element} Le composant LoginInput.
 */
const LoginInput = ({label, type, name, value, handleChange}) => {
    return (
        <Grid item>
            <TextField
                className="login-form__input"
                label={label}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
            />
        </Grid>
    );
};

LoginInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default LoginInput;

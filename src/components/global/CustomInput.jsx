import React from 'react';
import {Grid, TextField} from "@mui/material";
import PropTypes from "prop-types";
import {useLanguage} from '../../context/LanguageProvider';
import '../../styles/globalStyle.scss';

/**
 * Custom input component used in form.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text for the input.
 * @param {string} props.type - The type of the input.
 * @param {string} props.name - The name of the input.
 * @param {string} props.value - The value of the input.
 * @param {string} props.helper - Text to display under the input.
 * @param {bool} props.error - Specifies whether the input has error.
 * @param {boolean} props.isRequired - Specifies whether the input is required.
 * @param {function} props.onChange - The function to handle input value change.
 *
 * @returns {JSX.Element} The CustomInput component.
 */
const CustomInput = ({label, type, name, value, helper, error, isRequired, onChange}) => {
    const {translate} = useLanguage();
    return (
        <Grid item>
            <TextField
                className="custom-form__field custom-form__input"
                label={label}
                aria-label={translate({section:"GLOBAL", key:"INPUT_ARIA_LABEL"}) + " " + label}
                type={type}
                name={name}
                value={value}
                helperText={helper}
                error={error}
                required={isRequired}
                onChange={onChange}
            />
        </Grid>
    );
};
CustomInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    helper: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    isRequired: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CustomInput;

import React from 'react';
import {Grid, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import './customStyle.scss';
import '../login/loginStyle.scss';
import PropTypes from 'prop-types';

/**
 * Custom select component used in forms.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text for the select.
 * @param {string} props.name - The name of the select.
 * @param {string} props.value - The selected value.
 * @param {Array} props.options - An array of options to populate the select.
 * @param {string} props.options[].label - Le texte de l'option.
 * @param {string} props.options[].value - La valeur de l'option.
 * @param {function} props.onChange - The function to handle select value change.
 *
 * @returns {JSX.Element} The CustomSelect component.
 */
const CustomSelect = ({label, name, value, options, onChange}) => {
    return (
        <Grid item>
            <FormControl>
                <InputLabel>{label}</InputLabel>
                <Select
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
};
CustomSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
};

export default CustomSelect;

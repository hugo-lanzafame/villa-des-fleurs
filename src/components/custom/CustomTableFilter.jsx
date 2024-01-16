import React from 'react';
import {Box, TextField, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import {useLanguage} from "../../contexts/LanguageProvider";

/**
 * A filter objects to customize the table filter component.
 *
 * @typedef {Object} TableFilter
 * @property {string} key - The unique key for the filter.
 * @property {string} labelKey - The translation key for the filter label.
 * @property {boolean} [select] - Indicates if the filter is a select dropdown.
 * @property {TableFilterOption[]} [options] - The options for a select dropdown.
 */

/**
 * An option object to customize the table filter component.
 *
 * @typedef {Object} TableFilterOption
 * @property {string} value - The value of the option.
 * @property {string} label - The label of the option.
 */

/**
 * Component for the table filter.
 *
 * @param {TableFilter[]} filters - The array of filter objects.
 * @param {function} onFilterChange - The callback function triggered on filter change.
 * @returns {JSX.Element} The CustomTableFilter component.
 */
function CustomTableFilter({filters, onFilterChange}) {
    const {translate} = useLanguage();

    return (
        <Box className="table-filter">
            <Typography>
                {translate({section: "CUSTOM_TABLE_FILTER", key: "SEARCH_FILTER"})} :
            </Typography>
            <Box className="table-filter__field-container">
                {filters.map((filter) => (
                    <TextField
                        key={filter.key}
                        className="table-filter__field"
                        label={filter.label}
                        size="small"
                        onChange={(e) => onFilterChange(filter.key, e.target.value)}
                        {...(filter.select ? {
                            select: true,
                            SelectProps: {native: true},
                        } : {})}
                    >
                        {filter.options && filter.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                ))}
            </Box>
        </Box>
    );
}
CustomTableFilter.propTypes = {
    filters: PropTypes.array.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default CustomTableFilter;

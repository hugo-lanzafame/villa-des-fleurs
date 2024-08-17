import React, {useState} from 'react';
import {Box, Button, TextField} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import {useTable} from "../../contexts/TableProvider";
import "../../styles/customStyle.scss";

/**
 * Component for the table filter.
 *
 * @param {function} reloadEntries - A function to fetch entries.
 * @param {function} filterEntries - A function to filter entries.
 * @returns {JSX.Element} The CustomTableFilter component.
 */
function CustomTableFilter({reloadEntries, filterEntries}) {
    const {filters, changeAllEntries, allEntries, changeEntries} = useTable();
    const [filterValues, setFilterValues] = useState([]);

    /**
     * Handles the change in filter values.
     *
     * @param {string} key - The key of the filter.
     * @param {string} value - The new value of the filter.
     */
    const handleFilterChange = (key, value) => {
        setFilterValues((prevValues) => {
            const newValues = {...prevValues};

            if (value === '') {
                delete newValues[key];
            } else {
                newValues[key] = value;
            }

            return newValues;
        });
    };

    /**
     * Function triggered when the search button is clicked in the table.
     */
    const handleSearchClick = async () => {
        if (filterValues.length === 0) {
            changeEntries(allEntries);
        } else {
            changeEntries(filterEntries(allEntries, filterValues));
        }
    };

    /**
     * Function triggered when the reload button is clicked in the table.
     */
    const handleReloadClick = async () => {
        const reloadedEntries = await reloadEntries()

        if (filterValues.length === 0) {
            changeEntries(reloadedEntries);
        } else {
            changeEntries(filterEntries(reloadedEntries, filterValues));
        }

        changeAllEntries(reloadedEntries);
    };

    /**
     * Function triggered when the clear button is clicked in the table.
     */
    const handleClearClick = async () => {
        setFilterValues([]);
        changeEntries(allEntries);
    };

    return (
        <Box className="table-filter dark-light-box">
            <Box className="table-filter__field-container">
                {filters.map((filter) => (
                    <TextField
                        key={filter.key}
                        className="field"
                        label={filter.label}
                        size="small"
                        value={filterValues[filter.key] || ''}
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        {...(filter.select ? {
                            select: true,
                            SelectProps: {native: true},
                        } : {})}>
                        {filter.options && filter.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                ))}
            </Box>
            <Box className="table-filter__button-container">
                <Button className="white-button"
                        onClick={() => handleSearchClick()}>
                    <SearchIcon/>
                </Button>
                <Button className="white-button"
                        onClick={() => handleClearClick()}>
                    <ClearIcon/>
                </Button>
                <Button className="white-button"
                        onClick={() => handleReloadClick()}>
                    <CachedIcon/>
                </Button>
            </Box>
        </Box>
    );
}

CustomTableFilter.propTypes = {
    reloadEntries: PropTypes.func.isRequired,
    filterEntries: PropTypes.func.isRequired,
};

export default CustomTableFilter;

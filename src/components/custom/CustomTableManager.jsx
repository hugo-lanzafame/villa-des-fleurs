import React, {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../../styles/customStyle.scss";
import CustomTable from "./CustomTable";
import CustomTableFilter from "../custom/CustomTableFilter";

/**
 * Represents a filter object to customize the table filter component.
 *
 * @typedef {Object} TableFilter
 * @property {string} key - The unique key for the filter.
 * @property {string} label - The label/text for the filter.
 * @property {boolean} [select] - Indicates if the filter is a select dropdown.
 * @property {TableFilterOption[]} [options] - The options for a select dropdown.
 */

/**
 * Represents an option object to customize the table filter component.
 *
 * @typedef {Object} TableFilterOption
 * @property {string} value - The value of the option.
 * @property {string} label - The label/text of the option.
 */

/**
 * Component for managing a custom table with filter capabilities.
 *
 * @param {Object} props - The component props.
 * @param {TableFilter[]} props.filters - An array of filter objects.
 * @param {Object[]} props.columns - An array of column objects for the table.
 * @param {function} props.getEntriesByFilters - A function to fetch entries based on filter values.
 * @returns {JSX.Element} The CustomTableManager component.
 */
function CustomTableManager({filters, columns, getEntriesByFilters}) {
    const [filterValues, setFilterValues] = useState([])
    const [entries, setEntries] = useState([]);

    const handleSearchClick = (filterValues) => {
        setFilterValues(filterValues);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setEntries(await getEntriesByFilters(filterValues));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [getEntriesByFilters, filterValues]);

    return (
        <Box className="table-manager">
            <Box className="table-manager__top-bar">
                <CustomTableFilter filters={filters} handleSearchClick={handleSearchClick}/>
                <Button className="table-manager__create-button green-button">
                    <AddIcon/>
                </Button>
            </Box>
            <CustomTable columns={columns} entries={entries}/>
        </Box>
    );
}

export default CustomTableManager;
import React, {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../constants/routing";
import "../../styles/customStyle.scss";
import CustomTable from "./CustomTable";
import CustomTableFilter from "../custom/CustomTableFilter";

/**
 * Component for managing a custom table with filter capabilities.
 *
 * @param {TableFilter[]} filters - An array of filter objects.
 * @param {TableColumn[]} columns - An array of column objects for the table.
 * @param {PopupContent} popupDeleteContent - The text content in delete popup.
 * @param {function} getEntriesByFilters - A function to fetch entries based on filter values.
 * @param {function} deleteEntryById - A function to delete an entry.
 * @returns {JSX.Element} The CustomTableManager component.
 */
function CustomTableManager({filters, columns, popupDeleteContent, getEntriesByFilters, deleteEntryById}) {
    const navigate = useNavigate();
    const [filterValues, setFilterValues] = useState([])
    const [entries, setEntries] = useState([]);

    /**
     * Function triggered when the search button is clicked in the table.
     *
     * @param {Array} filterValues - The current filter values.
     */
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
                <Button className="table-manager__create-button green-button"
                        onClick={() => navigate(PATHS.PROPERTIES_CREATION)}>
                    <AddIcon/>
                </Button>
            </Box>
            <CustomTable columns={columns} entries={entries} popupDeleteContent={popupDeleteContent}
                         deleteEntryById={deleteEntryById}/>
        </Box>
    );
}

CustomTableManager.propTypes = {
    filters: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    popupDeleteContent: PropTypes.object.isRequired,
    getEntriesByFilters: PropTypes.func.isRequired,
    deleteEntryById: PropTypes.func.isRequired,
};

export default CustomTableManager;
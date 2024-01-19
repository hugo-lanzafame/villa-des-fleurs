import React, {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useTable} from "../../contexts/TableProvider";
import {PATHS} from "../../constants/routing";
import "../../styles/customStyle.scss";
import CustomTable from "./CustomTable";
import CustomTableFilter from "../custom/CustomTableFilter";
import CustomTableEmpty from "./CustomTableEmpty";

/**
 * Component for managing a custom table with filter capabilities.
 *
 * @param {TableFilter[]} filters - An array of filter objects.
 * @param {TableColumn[]} columns - An array of column objects for the table.
 * @param {PopupContent} popupDeleteContent - The text content in delete popup.
 * @param {function} getEntriesByFilters - A function to fetch entries based on filter values.
 * @param {function} deleteEntryById - A function to delete an entry.
 * @returns {JSX.Element} The CustomTableLayout component.
 */
function CustomTableLayout({filters, columns, popupDeleteContent, getEntriesByFilters, deleteEntryById}) {
    const navigate = useNavigate();
    const {currentEntries, changeEntries} = useTable();
    const [filterValues, setFilterValues] = useState([])

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
                changeEntries(await getEntriesByFilters(filterValues));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        // eslint-disable-next-line
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
            {currentEntries && currentEntries.length !== 0 ? (
                <CustomTable columns={columns} popupDeleteContent={popupDeleteContent}
                         deleteEntryById={deleteEntryById}/>
            ) : (
                <CustomTableEmpty/>
            )}
        </Box>
    );
}

CustomTableLayout.propTypes = {
    filters: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    popupDeleteContent: PropTypes.object.isRequired,
    getEntriesByFilters: PropTypes.func.isRequired,
    deleteEntryById: PropTypes.func.isRequired,
};

export default CustomTableLayout;
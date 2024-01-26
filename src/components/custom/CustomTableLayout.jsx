import React, {useEffect} from "react";
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
 * @param {function} reloadEntries - A function to fetch entries.
 * @param {function} filterEntries - A function to filter entries.
 * @param {function} deleteEntryById - A function to delete an entry.
 * @returns {JSX.Element} The CustomTableLayout component.
 */
function CustomTableLayout({reloadEntries, filterEntries, deleteEntryById}) {
    const navigate = useNavigate();
    const {entries} = useTable();

    return (
        <Box className="table-manager">
            <Box className="table-manager__top-bar">
                <CustomTableFilter reloadEntries={reloadEntries} filterEntries={filterEntries}/>
                <Button className="table-manager__create-button green-button"
                        onClick={() => navigate(PATHS.PROPERTIES_CREATION)}>
                    <AddIcon/>
                </Button>
            </Box>
            {entries && entries.length !== 0 ? (
                <CustomTable deleteEntryById={deleteEntryById} reloadEntries={reloadEntries}/>
            ) : (
                <CustomTableEmpty/>
            )}
        </Box>
    );
}

CustomTableLayout.propTypes = {
    reloadEntries: PropTypes.func.isRequired,
    filterEntries: PropTypes.func.isRequired,
    deleteEntryById: PropTypes.func.isRequired,
};

export default CustomTableLayout;

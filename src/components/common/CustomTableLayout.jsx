import React from "react";
import {Box, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useTable} from "../../contexts/TableProvider";
import "../../styles/customStyle.scss";
import CustomTable from "./CustomTable";
import CustomTableFilter from "./CustomTableFilter";
import CustomTableEmpty from "./CustomTableEmpty";

/**
 * Component for managing a custom table with filter capabilities.
 *
 * @param {function} reloadEntries - A function to fetch entries.
 * @param {function} filterEntries - A function to filter entries.
 * @param {function|null} deleteEntryById - A function to delete an entry.
 * @returns {JSX.Element} The CustomTableLayout component.
 */
function CustomTableLayout({reloadEntries, filterEntries, deleteEntryById}) {
    const navigate = useNavigate();
    const {entries, creationLink} = useTable();

    return (
        <Box className="table-manager">
            <Box className="table-manager__top-bar">
                <CustomTableFilter reloadEntries={reloadEntries} filterEntries={filterEntries}/>
                {creationLink && (
                    <Button className="table-manager__create-button green-button"
                            onClick={() => navigate(creationLink)}>
                        <AddIcon/>
                    </Button>
                )}
            </Box>
            {entries && entries.length !== 0 ? (
                <CustomTable reloadEntries={reloadEntries} deleteEntryById={deleteEntryById}/>
            ) : (
                <CustomTableEmpty/>
            )}
        </Box>
    );
}

CustomTableLayout.propTypes = {
    reloadEntries: PropTypes.func.isRequired,
    filterEntries: PropTypes.func.isRequired,
    deleteEntryById: PropTypes.func,
};

export default CustomTableLayout;

import React, {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, Button, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../contexts/LanguageProvider";
import {PATHS} from "../../constants/routing";
import "../../styles/customStyle.scss";
import CustomPopupValidation from "./CustomPopupValidation";

/**
 * Component representing a custom table.
 *
 * @param {TableColumn[]} columns - An array of column objects.
 * @param {Object[]} entries - An array of entry objects.
 * @param {PopupContent} popupDeleteContent - The text content in delete popup.
 * @param {function} deleteEntryById  - A function to delete an entry.
 * @returns {JSX.Element} The CustomTable component.
 */
const CustomTable = ({columns, entries, popupDeleteContent, deleteEntryById}) => {
    const navigate = useNavigate();
    const {translate} = useLanguage();
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    /**
     * Handles the click event on the delete button.
     *
     * @param {Property} property - The property to delete.
     */
    const handleDeleteClick = (property) => {
        setSelectedProperty(property);
        setOpenDialog(true);
    };

    /**
     * Handles the confirmation action in delete popup.
     */
    const handlePopupDeleteConfirm = () => {
        deleteEntryById(selectedProperty.id).then(setOpenDialog(false));
    };

    /**
     * Handles the close action in delete popup.
     */
    const handlePopupDeleteClose = () => {
        setOpenDialog(false);
    };

    return (
        <Table className="table">
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell key={column.key} className="table__column">
                            <Typography>{column.label}</Typography>
                        </TableCell>
                    ))}
                    <TableCell className="table__column__action">
                        <Typography>
                            {translate({section: "CUSTOM_TABLE", key: "COLUMN_ACTIONS"})}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {entries.map((entry) => (
                    <TableRow key={entry.id} className="table__row">
                        {columns.map((column) => (
                            <TableCell key={column.key} className="table__cell">
                                <Typography>{entry[column.key]}</Typography>
                            </TableCell>
                        ))}
                        <TableCell className="table__cell__action">
                            <Button className="table__button white-button"
                                    onClick={() => navigate(PATHS.PROPERTIES_EDITION)}>
                                <EditIcon/>
                            </Button>
                            <Button className="table__button red-button"
                                    onClick={() => handleDeleteClick(entry)}>
                                <DeleteIcon/>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <CustomPopupValidation open={openDialog} popupContent={popupDeleteContent}
                                   onConfirm={handlePopupDeleteConfirm} onClose={handlePopupDeleteClose}/>
        </Table>
    );
};

CustomTable.propTypes = {
    columns: PropTypes.array.isRequired,
    entries: PropTypes.array.isRequired,
    popupDeleteContent: PropTypes.object.isRequired,
    deleteEntryById: PropTypes.func.isRequired,
};


export default CustomTable;
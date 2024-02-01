import React, {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, Button, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../../contexts/NotificationProvider";
import {useLanguage} from "../../contexts/LanguageProvider";
import {useTable} from "../../contexts/TableProvider";
import {NOTIFICATION_TYPES} from "../../constants/notification";
import "../../styles/customStyle.scss";
import CustomPopupDelete from "./CustomPopupDelete";

/**
 * Component representing a custom table.
 *
 * @param {function} deleteEntryById  - A function to delete an entry.
 * @param {function} reloadEntries - A function to fetch entries.
 * @returns {JSX.Element} The CustomTable component.
 */
const CustomTable = ({deleteEntryById, reloadEntries}) => {
    const navigate = useNavigate();
    const {addNotification} = useNotification();
    const {translate} = useLanguage();
    const {columns, entries, changeEntries, changeAllEntries, popupDeleteContent, editionLink} = useTable();
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    /**
     * Handles the click event on the delete button.
     *
     * @param {Object} entry - The entry to delete.
     */
    const handleDeleteClick = (entry) => {
        setSelectedEntry(entry);
        setOpenDialog(true);
    };

    /**
     * Handles the confirmation action in delete popup.
     */
    const handlePopupDeleteConfirm = async () => {
        await deleteEntryById(selectedEntry.id)
        addNotification(NOTIFICATION_TYPES.SUCCESS, "L'entrée " + selectedEntry.name + " a bien été supprimée")

        const reloadedEntries = await reloadEntries();

        changeEntries(reloadedEntries);
        changeAllEntries(reloadedEntries);
        setOpenDialog(false);
    };

    /**
     * Handles the close action in delete popup.
     */
    const handlePopupDeleteClose = () => {
        setOpenDialog(false);
    };

    return (
        <Table className="table dark-light-box">
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
                                    onClick={() => navigate(editionLink + "?id=" + entry.id)}>
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
            <CustomPopupDelete open={openDialog} popupContent={popupDeleteContent}
                               onConfirm={handlePopupDeleteConfirm} onClose={handlePopupDeleteClose}/>
        </Table>
    )
}

CustomTable.propTypes = {
    deleteEntryById: PropTypes.func.isRequired,
};


export default CustomTable;

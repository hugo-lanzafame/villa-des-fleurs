import React, {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../contexts/LanguageProvider";
import {deletePropertyById} from "../../services/api/firebase/properties";
import {PATHS} from "../../constants/routing";
import "../../styles/customStyle.scss";

const CustomTable = ({columns, entries}) => {
    const navigate = useNavigate();
    const {translate} = useLanguage();
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleDeleteClick = (property) => {
        setSelectedProperty(property);
        setOpenDialog(true);
    };

    const handleDeleteConfirm = () => {
        deletePropertyById(selectedProperty.id)
            .then(setOpenDialog(false));
    };

    const handleDeleteCancel = () => {
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

            <Dialog open={openDialog} onClose={handleDeleteCancel}>
                <DialogTitle>
                    <Typography>Delete Property</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete the property "{selectedProperty?.name}"?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button className="custom-table__button"
                            onClick={handleDeleteCancel}>
                        Cancel
                    </Button>
                    <Button className="custom-table__button__delete"
                            onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Table>
    );
};


export default CustomTable;
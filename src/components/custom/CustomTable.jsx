import React, {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {deletePropertyById} from "../../services/api/firebase/properties";
import {PATHS} from "../../constants/routing";
import "../../styles/customStyle.scss";

const CustomTable = ({entries, columns}) => {
    const navigate = useNavigate();
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
        <Table className="custom-table">
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell key={column.key} className="custom-table__column">{column.label}</TableCell>
                    ))}
                    <TableCell className="custom-table__column__action">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {entries.map((entry) => (
                    <TableRow key={entry.id} className="custom-table__row">
                        {columns.map((column) => (
                            <TableCell key={column.key} className="custom-table__cell">{entry[column.key]}</TableCell>
                        ))}
                        <TableCell className="custom-table__cell__action">
                            <Button className="custom-table__button"
                                    onClick={() => navigate(PATHS.PROPERTIES_EDITION)}>
                                Edit
                            </Button>
                            <Button className="custom-table__button__delete"
                                    onClick={() => handleDeleteClick(entry)}>
                                Delete
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent, DialogActions
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../constants";
import "./customStyle.scss";
import React, {useState} from "react";
import {deletePropertyById} from "../../services/api/firebase/database";

const CustomTable = ({ entries }) => {
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
                    <TableCell className="custom-table__column">Name</TableCell>
                    <TableCell className="custom-table__column__action">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {entries.map((entry) => (
                    <TableRow key={entry.id} className="custom-table__row">
                        <TableCell className="custom-table__cell">{entry.name}</TableCell>
                        <TableCell className="custom-table__cell__action">
                            <Button className="custom-table__button"
                                    onClick={() => navigate(PATHS.PROPERTIES_GESTION)}>
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
                <DialogTitle>Delete Property</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the property "{selectedProperty?.name}"?
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
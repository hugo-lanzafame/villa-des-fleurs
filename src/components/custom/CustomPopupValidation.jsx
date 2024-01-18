import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PropTypes from "prop-types";

/**
 * Component representing a custom dialog.
 *
 * @param {boolean} open - Indicates whether the popup is open.
 * @param {PopupContent} popupContent - The text content in the popup.
 * @param {function} onConfirm - The callback function triggered on confirm action.
 * @param {function} onClose - The callback function triggered on popup close.
 * @returns {JSX.Element} The CustomPopupValidation component.
 */
const CustomPopupValidation = ({open, popupContent, onClose, onConfirm}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Typography>{popupContent.title}</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography>{popupContent.content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button className="white-button"
                        onClick={onClose}>
                    <KeyboardReturnIcon/>
                </Button>
                <Button className="red-button"
                        onClick={onConfirm}>
                    <DeleteIcon/>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CustomPopupValidation.propTypes = {
    open: PropTypes.bool.isRequired,
    popupContent: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default CustomPopupValidation;
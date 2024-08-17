import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PropTypes from "prop-types";
import "../../styles/customStyle.scss";

/**
 * Component representing a custom popup.
 *
 * @param {boolean} open - Indicates whether the popup is open.
 * @param {PopupContent} popupContent - The text content in the popup.
 * @param {function} onConfirm - The callback function triggered on confirm action.
 * @param {function} onClose - The callback function triggered on popup close.
 * @returns {JSX.Element} The CustomPopupDelete component.
 */
const CustomPopupDelete = ({open, popupContent, onClose, onConfirm}) => {
    return (
            <Dialog className="popup" open={open} onClose={onClose}>
                    <DialogTitle className="popup__title">
                        {popupContent.title}
                    </DialogTitle>
                    <DialogContent className="popup__content">
                        {popupContent.content}
                    </DialogContent>
                    <DialogActions className="popup__actions">
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

CustomPopupDelete.propTypes = {
    open: PropTypes.bool.isRequired,
    popupContent: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default CustomPopupDelete;

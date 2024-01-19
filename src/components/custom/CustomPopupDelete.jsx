import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PropTypes from "prop-types";

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
        <Dialog open={open} onClose={onClose}>
            <Box style={{backgroundColor: "#302F37",
                display: "flex", flexDirection: "column",
                alignItems: "center", border: "1px solid #000", borderRadius: "10px"}}>
                <DialogTitle style={{color: "#F54B2C"}}>
                    {popupContent.title}
                </DialogTitle>
                <DialogContent style={{color: "#DEDEDE", textAlign: "center"}}>
                    {popupContent.content}
                </DialogContent>
                <DialogActions style={{paddingBottom: "16px"}}>
                    <Button className="white-button"
                            onClick={onClose}>
                        <KeyboardReturnIcon/>
                    </Button>
                    <Button className="red-button"
                            onClick={onConfirm}>
                        <DeleteIcon/>
                    </Button>
                </DialogActions>
            </Box>
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
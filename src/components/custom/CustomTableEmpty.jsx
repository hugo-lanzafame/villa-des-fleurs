import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../constants/routing";

const CustomTableEmpty = ({ onAddEntryClick }) => {
    const navigate = useNavigate();

    return (
        <Box className="custom-table-empty">
            <Typography variant="body1">Aucune entrée disponible.</Typography>
            <Button className="table-manager__create-button green-button"
                    onClick={() => navigate(PATHS.PROPERTIES_CREATION)}>
                <AddIcon/>
            </Button>
        </Box>
    );
};

export default CustomTableEmpty;

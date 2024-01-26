import React from 'react';
import {Box, Typography} from "@mui/material";

const CustomTableEmpty = () => {
    return (
        <Box className="custom-table-empty">
            <Typography variant="body1">Aucune entrée disponible.</Typography>
        </Box>
    );
};

export default CustomTableEmpty;

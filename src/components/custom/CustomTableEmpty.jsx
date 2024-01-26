import React from 'react';
import {Box, Typography} from "@mui/material";
import {useLanguage} from "../../contexts/LanguageProvider";

const CustomTableEmpty = () => {
    const {translate} = useLanguage();

    return (
        <Box className="custom-table-empty">
            <Typography variant="body1">
                {translate({section: "CUSTOM_TABLE_EMPTY", key: "NO_ENTRY"})}
            </Typography>
        </Box>
    );
};

export default CustomTableEmpty;

import React from "react";
import {Box, Typography} from "@mui/material";
import "../../styles/customStyle.scss";
import CustomBreadcrumb from "./CustomBreadcrumb";

function CustomPageTop({breadcrumbLinks, title}) {
    return (
        <Box className="top-page">
            <CustomBreadcrumb links={breadcrumbLinks}/>
            <Typography className="top-page__title">
                {title}
            </Typography>
        </Box>
    );
}

export default CustomPageTop;
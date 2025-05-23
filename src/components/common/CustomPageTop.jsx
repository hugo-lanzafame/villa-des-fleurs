import React from "react";
import {Box, Typography} from "@mui/material";
import "../../styles/customStyle.scss";
import CustomBreadcrumb from "./CustomBreadcrumb";

/**
 * Component representing the top section of a page.
 *
 * @param {BreadcrumbLink[]} breadcrumbLinks - An array of breadcrumb link objects.
 * @param {string} title - The title of the page.
 * @returns {JSX.Element} The CustomPageTop component.
 */
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
import React from 'react';
import {Box, Typography} from "@mui/material";
import {Link} from 'react-router-dom';
import "../../styles/customStyle.scss";

/**
 * Component representing a breadcrumb navigation.
 *
 * @param {BreadcrumbLink[]} links - An array of BreadcrumbLink objects.
 * @returns {JSX.Element} The CustomBreadcrumb component.
 */
const CustomBreadcrumb = ({links}) => {
    return (
        <Box className="breadcrumb">
            {links.map((link, index) => (
                index < links.length - 1 ? (
                    <Box className="breadcrumb__container" key={index}>
                        <Link className="breadcrumb__link" to={link.to}>
                            <Typography>{link.label}</Typography>
                        </Link>
                        <Typography className="breadcrumb__separator">/</Typography>
                    </Box>
                ) : (
                    <Typography className="breadcrumb__typo" key={index}>
                        {link.label}
                    </Typography>
                )
            ))}
        </Box>
    )
};

export default CustomBreadcrumb;
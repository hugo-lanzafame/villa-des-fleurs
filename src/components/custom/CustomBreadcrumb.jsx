import React from 'react';
import {Box, Typography} from "@mui/material";
import {Link} from 'react-router-dom';

/**
 * Component representing a breadcrumb navigation.
 *
 * @param {Object[]} links - An array of link objects.
 * @param {string} links[].label - The label/text of the link.
 * @param {string} links[].to - The destination URL of the link.
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
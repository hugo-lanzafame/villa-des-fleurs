import React from 'react';
import {Link} from 'react-router-dom';
import {Stack, Typography} from "@mui/material";

/**
 * Component representing a breadcrumb navigation.
 *
 * @param {Object[]} links - An array of link objects.
 * @param {string} links[].label - The label/text of the link.
 * @param {string} links[].to - The destination URL of the link.
 * @returns {JSX.Element} The Breadcrumb component.
 */
const Breadcrumb = ({links}) => {
    return (
        <Stack className="breadcrumb">
            {links.map((link, index) => (
                index < links.length - 1 ? (
                    <Typography className="breadcrumb__typo" key={index}>
                        <Link className="breadcrumb__link" to={link.to}>
                            {link.label}
                        </Link>
                        <Stack className="breadcrumb__separator">/</Stack>
                    </Typography>
                ) : (
                    <Typography className="breadcrumb__typo" key={index}>
                        {link.label}
                    </Typography>
                )
            ))}
        </Stack>
    )
};

export default Breadcrumb;
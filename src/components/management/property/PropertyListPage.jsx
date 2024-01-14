import React, {useEffect, useState} from 'react';
import {Box, TextField, Typography} from '@mui/material';
import {useLanguage} from "../../../contexts/LanguageProvider";
import {getProperties} from '../../../services/api/firebase/database';
import {PATHS} from "../../../constants";
import CustomTable from "../../custom/CustomTable";
import Breadcrumb from "../../custom/Breadcrumb";

/**
 * Component for displaying a list of properties.
 *
 * @returns {JSX.Element} The PropertyListPage component.
 */
function PropertyListPage() {
    const {translate} = useLanguage();

    const [properties, setProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const breadcrumbLinks = [
        {label: translate({section: "BREADCRUMB", key: "HOME"}), to: PATHS.HOME},
        {label: translate({section: "BREADCRUMB", key: "MANAGEMENT"}), to: PATHS.MANAGEMENT},
        {label: translate({section: "BREADCRUMB", key: "PROPERTIES"}), to: PATHS.PROPERTIES},
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propertiesData = await getProperties(searchQuery);
                setProperties(propertiesData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [searchQuery]);

    const filteredProperties = properties.filter((property) =>
        property.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box className="property-list-page">
            <Breadcrumb links={breadcrumbLinks}/>
            <Typography className="page-title">
                {translate({section: "PROPERTY_LIST_PAGE", key: "PAGE_TITLE"})}
            </Typography>
            <TextField
                label={translate({section: "PROPERTY_LIST_PAGE", key: "SEARCH_NAME_LABEL"})}
                placeholder={translate({section: "PROPERTY_LIST_PAGE", key: "SEARCH_NAME_PLACEHOLDER"})}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CustomTable entries={filteredProperties}/>
        </Box>
    );
}

export default PropertyListPage;

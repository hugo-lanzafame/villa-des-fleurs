import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {useLanguage} from "../../contexts/LanguageProvider";
import {getPropertiesByFilters} from '../../services/api/firebase/properties';
import {PATHS} from "../../constants/routing";
import CustomBreadcrumb from "../custom/CustomBreadcrumb";
import CustomTable from "../custom/CustomTable";
import CustomTableFilter from "../custom/CustomTableFilter";

/**
 * Component for displaying a list of properties.
 *
 * @returns {JSX.Element} The PropertyListPage component.
 */
function PropertyListPage() {
    const {translate} = useLanguage();
    const [properties, setProperties] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchType, setSearchType] = useState('');

    const breadcrumbLinks = [
        {label: translate({section: "BREADCRUMB", key: "HOME"}), to: PATHS.HOME},
        {label: translate({section: "BREADCRUMB", key: "MANAGEMENT"}), to: PATHS.MANAGEMENT},
        {label: translate({section: "BREADCRUMB", key: "PROPERTIES"}), to: PATHS.PROPERTIES},
    ];

    const filters = [
        {
            key: 'searchName',
            label: translate({section: "PROPERTY_LIST_PAGE", key: "SEARCH_NAME"})
        },
        {
            key: 'searchType',
            label: translate({section: "PROPERTY_LIST_PAGE", key: "SEARCH_TYPE"}),
            select: true,
            options: [
                {value: '', label: ''},
                {value: 'apartment', label: translate({section: "PROPERTY_LIST_PAGE", key: "PROPERTY_TYPE_APARTMENT"})},
            ]
        },
    ];

    const columns = [
        {key: 'name', label: translate({section: "PROPERTY_LIST_PAGE", key: "COLUMN_NAME"})},
        {key: 'type', label: translate({section: "PROPERTY_LIST_PAGE", key: "COLUMN_TYPE"})},
    ];

    const handleFilterChange = (filterName, value) => {
        if (filterName === 'searchName') {
            setSearchName(value);
        } else if (filterName === 'searchType') {
            setSearchType(value);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propertiesData = await getPropertiesByFilters(searchName, searchType);
                setProperties(propertiesData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [searchName, searchType]);

    return (
        <Box className="property-list-page">
            <CustomBreadcrumb links={breadcrumbLinks}/>
            <Typography className="page-title">
                {translate({section: "PROPERTY_LIST_PAGE", key: "PAGE_TITLE"})}
            </Typography>
            <CustomTableFilter filters={filters} onFilterChange={handleFilterChange}/>
            <CustomTable entries={properties} columns={columns}/>
        </Box>
    );
}

export default PropertyListPage;

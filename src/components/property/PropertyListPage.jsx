import React, {useEffect, useState} from 'react';
import {Box, TextField, Typography} from '@mui/material';
import {useLanguage} from "../../contexts/LanguageProvider";
import {getPropertiesByFilters} from '../../services/api/firebase/properties';
import {PATHS} from "../../constants/routing";
import CustomBreadcrumb from "../custom/CustomBreadcrumb";
import CustomTable from "../custom/CustomTable";

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

    const propertyTypes = [
        {value: '', label: '',},
        {value: 'apartment', label: translate({section: "PROPERTY_LIST_PAGE", key: "PROPERTY_TYPE_APARTMENT"})},
    ];

    const columns = [
        {key: 'name', label: 'Name'},
        {key: 'type', label: 'Type'},
    ];

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
            <Box class="table-filter">
                <Typography>
                    {translate({section: "PROPERTY_LIST_PAGE", key: "SEARCH_FILTER"})} :
                </Typography>
                <Box className="table-filter__field-container">
                    <TextField
                        className="table-filter__field"
                        label={translate({section: "PROPERTY_LIST_PAGE", key: "SEARCH_NAME_LABEL"})}
                        value={searchName}
                        size="small"
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <TextField
                        select
                        className="table-filter__field"
                        label={translate({section: "PROPERTY_LIST_PAGE", key: "SEARCH_TYPE_LABEL"})}
                        defaultValue={searchType}
                        SelectProps={{native: true}}
                        size="small"
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        {propertyTypes.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Box>
            </Box>
            <CustomTable entries={properties} columns={columns}/>
        </Box>
    );
}

export default PropertyListPage;

import React from 'react';
import {Box} from '@mui/material';
import {useLanguage} from "../../contexts/LanguageProvider";
import {getPropertiesByFilters} from '../../services/api/firebase/properties';
import {PATHS} from "../../constants/routing";
import CustomTableManager from "../custom/CustomTableManager";
import CustomPageTop from "../custom/CustomPageTop";


/**
 * Component for displaying a list of properties.
 *
 * @returns {JSX.Element} The PropertyListPage component.
 */
function PropertyListPage() {
    const {translate} = useLanguage();

    const breadcrumbLinks = [
        {label: translate({section: "BREADCRUMB", key: "HOME"}), to: PATHS.HOME},
        {label: translate({section: "BREADCRUMB", key: "MANAGEMENT"}), to: PATHS.MANAGEMENT},
        {label: translate({section: "BREADCRUMB", key: "PROPERTIES"}), to: PATHS.PROPERTIES},
    ];

    const title = translate({section: "PROPERTY_LIST_PAGE", key: "PAGE_TITLE"});

    const filters = [
        {
            key: 'filterByName',
            label: translate({section: "PROPERTY_LIST_PAGE", key: "SEARCH_NAME"})
        },
        {
            key: 'filterByType',
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

    return (
        <Box className="property-list-page">
            <CustomPageTop breadcrumbLinks={breadcrumbLinks} title={title}/>
            <CustomTableManager filters={filters} columns={columns} getEntriesByFilters={getPropertiesByFilters}/>
        </Box>
    );
}

export default PropertyListPage;

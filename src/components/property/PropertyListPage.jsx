import React, {useEffect} from 'react';
import {Box} from '@mui/material';
import PropTypes from "prop-types";
import {useLanguage} from "../../contexts/LanguageProvider";
import {deletePropertyById, getAllProperties} from '../../services/api/firebase/properties';
import {useTable} from "../../contexts/TableProvider";
import {PATHS} from "../../constants/routing";
import CustomTableLayout from "../custom/CustomTableLayout";
import CustomPageTop from "../custom/CustomPageTop";

/**
 * Component for displaying a list of properties.
 *
 * @returns {JSX.Element} The PropertyListPage component.
 */
function PropertyListPage() {
    const {translate} = useLanguage();
    const {
        changeFilters,
        changeColumns,
        changeAllEntries,
        changeEntries,
        changePopupDeleteContent,
        changeEditionLink,
        changeCreationLink
    } = useTable();

    /**
     * @type {BreadcrumbLink[]}
     */
    const breadcrumbLinks = [
        {label: translate({section: "BREADCRUMB", key: "HOME"}), to: PATHS.HOME},
        {label: translate({section: "BREADCRUMB", key: "MANAGEMENT"}), to: PATHS.MANAGEMENT},
        {label: translate({section: "BREADCRUMB", key: "PROPERTIES"}), to: PATHS.PROPERTIES},
    ];

    /**
     * @type {string}
     */
    const title = translate({section: "PROPERTY_LIST_PAGE", key: "PAGE_TITLE"});

    /**
     * @type {TableFilter[]}
     */
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

    /**
     * @type {TableColumn[]}
     */
    const columns = [
        {key: 'name', label: translate({section: "PROPERTY_LIST_PAGE", key: "COLUMN_NAME"})},
        {key: 'type', label: translate({section: "PROPERTY_LIST_PAGE", key: "COLUMN_TYPE"})},
    ];

    /**
     * @type {PopupContent}
     */
    const popupDeleteContent = {
        title: translate({section: "PROPERTY_LIST_PAGE", key: "POPUP_DELETE_TITLE"}),
        content: translate({section: "PROPERTY_LIST_PAGE", key: "POPUP_DELETE_CONTENT"}),
    };

    /**
     * Get properties and filter them.
     *
     * @param {Property[]} properties - The properties to filter.
     * @param {PropertyFilterValues} [propertyFilterValues] - The filter values to use.
     * @returns {Property[]} An array of filtered properties.
     */
    const filterProperties = (properties, propertyFilterValues) => {
        const filterByName = propertyFilterValues.filterByName;
        const filterByType = propertyFilterValues.filterByType;

        if (!propertyFilterValues) {
            return properties;
        }

        if (filterByName && filterByName !== '') {
            properties = properties.filter(property =>
                property.name.toLowerCase().includes(filterByName.toLowerCase())
            );
        }

        if (filterByType && filterByType !== '') {
            properties = properties.filter(property =>
                property.type === filterByType
            );
        }

        return properties;
    };
    filterProperties.propTypes = {
        properties: PropTypes.array.isRequired,
        propertyFilterValues: PropTypes.array,
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const properties = await getAllProperties();

                changeFilters(filters);
                changeColumns(columns);
                changeAllEntries(properties);
                changeEntries(properties);
                changeEditionLink(PATHS.PROPERTIES_EDITION);
                changeCreationLink(PATHS.PROPERTIES_CREATION);
                changePopupDeleteContent(popupDeleteContent);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <Box className="property-list-page">
            <CustomPageTop breadcrumbLinks={breadcrumbLinks} title={title}/>
            <CustomTableLayout reloadEntries={getAllProperties} filterEntries={filterProperties}
                               deleteEntryById={deletePropertyById}/>
        </Box>
    );
}

export default PropertyListPage;

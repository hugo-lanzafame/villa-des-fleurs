import React, {useEffect} from 'react';
import {Box} from '@mui/material';
import PropTypes from "prop-types";
import {useLanguage} from "../../contexts/LanguageProvider";
import {deleteTenantById, getAllTenants} from '../../services/api/firebase/tenants';
import {useTable} from "../../contexts/TableProvider";
import {PATHS} from "../../constants/routing";
import CustomTableLayout from "../custom/CustomTableLayout";
import CustomPageTop from "../custom/CustomPageTop";
import CustomNotifications from "../custom/CustomNotifications";

/**
 * Component for displaying a list of tenants.
 *
 * @returns {JSX.Element} The TenantListPage component.
 */
function TenantListPage() {
    const {translate} = useLanguage();
    const {
        changeFilters,
        changeColumns,
        changeAllEntries,
        changeEntries,
        changePopupDeleteContent,
        changeEditionLink,
        changeCreationLink,
        changeDeleteNotification
    } = useTable();

    /**
     * @type {BreadcrumbLink[]}
     */
    const breadcrumbLinks = [
        {label: translate({section: "BREADCRUMB", key: "HOME"}), to: PATHS.HOME},
        {label: translate({section: "BREADCRUMB", key: "MANAGEMENT"}), to: PATHS.MANAGEMENT},
        {label: translate({section: "BREADCRUMB", key: "TENANTS"}), to: ''},
    ];

    /**
     * @type {string}
     */
    const title = translate({section: "TENANT_LIST_PAGE", key: "PAGE_TITLE"});

    /**
     * @type {TableFilter[]}
     */
    const filters = [
        {
            key: 'filterByName',
            label: translate({section: "TENANT_LIST_PAGE", key: "SEARCH_NAME"})
        },
    ];

    /**
     * @type {TableColumn[]}
     */
    const columns = [
        {key: 'name', label: translate({section: "TENANT_LIST_PAGE", key: "COLUMN_NAME"})},
    ];

    /**
     * @type {PopupContent}
     */
    const popupDeleteContent = {
        title: translate({section: "TENANT_LIST_PAGE", key: "POPUP_DELETE_TITLE"}),
        content: translate({section: "TENANT_LIST_PAGE", key: "POPUP_DELETE_CONTENT"}),
    };

    /**
     * @type {string}
     */
    const deleteNotification = translate({section: "TENANT_LIST_PAGE", key: "NOTIFICATION_DELETE"})

    /**
     * Get tenants and filter them.
     *
     * @param {Tenant[]} tenants - The tenants to filter.
     * @param {TenantFilterValues} [tenantFilterValues] - The filter values to use.
     * @returns {Tenant[]} An array of filtered tenants.
     */
    const filterTenants = (tenants, tenantFilterValues) => {
        const filterByName = tenantFilterValues.filterByName;

        if (!tenantFilterValues) {
            return tenants;
        }

        if (filterByName && filterByName !== '') {
            tenants = tenants.filter(tenant =>
                tenant.name.toLowerCase().includes(filterByName.toLowerCase())
            );
        }

        return tenants;
    };
    filterTenants.propTypes = {
        tenants: PropTypes.array.isRequired,
        tenantFilterValues: PropTypes.array,
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const tenants = await getAllTenants();

                changeFilters(filters);
                changeColumns(columns);
                changeAllEntries(tenants);
                changeEntries(tenants);
                changeEditionLink(PATHS.TENANTS_EDITION);
                changeCreationLink(PATHS.TENANTS_CREATION);
                changePopupDeleteContent(popupDeleteContent);
                changeDeleteNotification(deleteNotification);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <Box className="tenant-list-page">
            <CustomPageTop breadcrumbLinks={breadcrumbLinks} title={title}/>
            <CustomNotifications/>
            <CustomTableLayout reloadEntries={getAllTenants} filterEntries={filterTenants}
                               deleteEntryById={deleteTenantById}/>
        </Box>
    );
}

export default TenantListPage;

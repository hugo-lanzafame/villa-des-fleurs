import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import {useLanguage} from '../../contexts/LanguageProvider';
import {getTenantById} from "../../services/api/firebase/tenants";
import {PATHS} from '../../constants/routing';
import CustomPageTop from "../common/CustomPageTop";
import TenantAddUpdateForm from "./TenantAddUpdateForm";
import CustomNotifications from "../common/CustomNotifications";

/**
 * Component for the Tenant Creation/Edition page.
 *
 * @returns {JSX.Element} The TenantAddUpdatePage component.
 */
function TenantAddUpdatePage() {
    const {translate} = useLanguage();
    const searchParams = new URLSearchParams(window.location.search);
    const tenantId = searchParams.get('id');
    const [tenant, setTenant] = useState(null);

    /**
     * @type {BreadcrumbLink[]}
     */
    const breadcrumbLinks = [
        {label: translate({section: "BREADCRUMB", key: "HOME"}), to: PATHS.HOME},
        {label: translate({section: "BREADCRUMB", key: "MANAGEMENT"}), to: PATHS.MANAGEMENT},
        {label: translate({section: "BREADCRUMB", key: "TENANTS"}), to: PATHS.TENANTS},
        {
            label: !tenantId
                ? translate({section: "BREADCRUMB", key: "CREATION"})
                : translate({section: "BREADCRUMB", key: "EDITION"}),
            to: ''
        },
    ];

    /**
     * @type {string}
     */
    let title = "";

    if (!tenantId) {
        title = translate({section: "TENANT_ADD_UPDATE_PAGE", key: "PAGE_TITLE_CREATION"})
    } else {
        title = translate({section: "TENANT_ADD_UPDATE_PAGE", key: "PAGE_TITLE_EDITION"})
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tenant = await getTenantById(tenantId) ?? null;
                setTenant(tenant);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <Box className="tenant-add-update-page">
            <CustomPageTop breadcrumbLinks={breadcrumbLinks} title={title}/>
            <CustomNotifications/>
            <TenantAddUpdateForm tenant={tenant}/>
        </Box>
    );
}

export default TenantAddUpdatePage;

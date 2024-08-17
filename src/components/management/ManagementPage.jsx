import React from 'react'
import {useLanguage} from "../../contexts/LanguageProvider";
import {PATHS} from "../../constants/routing";
import CustomBreadcrumb from "../custom/CustomBreadcrumb";

/**
 * Component for the management page.
 *
 * @returns {JSX.Element} The ManagementPage component.
 */
function ManagementPage() {
    const {translate} = useLanguage();

    const breadcrumbLinks = [
        {label: translate({section: "BREADCRUMB", key: "HOME"}), to: PATHS.HOME},
        {label: translate({section: "BREADCRUMB", key: "MANAGEMENT"}), to: PATHS.MANAGEMENT},
    ];

    return (
        <>
            <CustomBreadcrumb links={breadcrumbLinks}/>
            <p>YOLO</p>
        </>
    )
}

export default ManagementPage;

import React from 'react'
import Breadcrumb from "../custom/Breadcrumb";
import {PATHS} from "../../constants";
import {useLanguage} from "../../contexts/LanguageProvider";

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
            <Breadcrumb links={breadcrumbLinks}/>
            <p>YOLO</p>
        </>
    )
}

export default ManagementPage;

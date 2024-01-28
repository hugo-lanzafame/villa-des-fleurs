import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import {useLanguage} from '../../contexts/LanguageProvider';
import {getPropertyById} from "../../services/api/firebase/properties";
import {PATHS} from '../../constants/routing';
import CustomPageTop from "../custom/CustomPageTop";
import PropertyAddUpdateForm from "./PropertyAddUpdateForm";

/**
 * Component for the Building Creation/Edition page.
 *
 * @returns {JSX.Element} The PropertyAddUpdatePage component.
 */
function PropertyAddUpdatePage() {
    const {translate} = useLanguage();
    const searchParams = new URLSearchParams(window.location.search);
    const propertyId = searchParams.get('id');
    const [property, setProperty] = useState({});

    /**
     * @type {BreadcrumbLink[]}
     */
    const breadcrumbLinks = [
        {label: translate({section: "BREADCRUMB", key: "HOME"}), to: PATHS.HOME},
        {label: translate({section: "BREADCRUMB", key: "MANAGEMENT"}), to: PATHS.MANAGEMENT},
        {label: translate({section: "BREADCRUMB", key: "PROPERTIES"}), to: PATHS.PROPERTIES},
        {
            label: !propertyId
                ? translate({section: "BREADCRUMB", key: "CREATION"})
                : translate({section: "BREADCRUMB", key: "EDITION"}),
            to: ''
        },
    ];

    /**
     * @type {string}
     */
    let title = "";

    if (!propertyId) {
        title = translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "PAGE_TITLE_CREATION"})
    } else {
        title = translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "PAGE_TITLE_EDITION"})
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const property = await getPropertyById(propertyId) ?? {};

                setProperty(property);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <Box className="property-add-update-page">
            <CustomPageTop breadcrumbLinks={breadcrumbLinks} title={title}/>
            <PropertyAddUpdateForm property={property}/>
        </Box>
    );
}

export default PropertyAddUpdatePage;

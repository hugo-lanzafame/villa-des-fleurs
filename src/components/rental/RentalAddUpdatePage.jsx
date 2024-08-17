import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import {useLanguage} from '../../contexts/LanguageProvider';
import {getRentalById} from "../../services/api/firebase/rentals";
import {PATHS} from '../../constants/routing';
import CustomPageTop from "../custom/CustomPageTop";
import RentalAddUpdateForm from "./RentalAddUpdateForm";
import CustomNotifications from "../custom/CustomNotifications";

/**
 * Component for the Rental Creation/Edition page.
 *
 * @returns {JSX.Element} The RentalAddUpdatePage component.
 */
function RentalAddUpdatePage() {
    const {translate} = useLanguage();
    const searchParams = new URLSearchParams(window.location.search);
    const rentalId = searchParams.get('id');
    const [rental, setRental] = useState(null);

    /**
     * @type {BreadcrumbLink[]}
     */
    const breadcrumbLinks = [
        {label: translate({section: "BREADCRUMB", key: "HOME"}), to: PATHS.HOME},
        {label: translate({section: "BREADCRUMB", key: "MANAGEMENT"}), to: PATHS.MANAGEMENT},
        {label: translate({section: "BREADCRUMB", key: "RENTALS"}), to: PATHS.RENTALS},
        {
            label: !rentalId
                ? translate({section: "BREADCRUMB", key: "CREATION"})
                : translate({section: "BREADCRUMB", key: "EDITION"}),
            to: ''
        },
    ];

    /**
     * @type {string}
     */
    let title = "";

    if (!rentalId) {
        title = translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "PAGE_TITLE_CREATION"})
    } else {
        title = translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "PAGE_TITLE_EDITION"})
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rental = await getRentalById(rentalId) ?? null;
                setRental(rental);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <Box className="rental-add-update-page">
            <CustomPageTop breadcrumbLinks={breadcrumbLinks} title={title}/>
            <CustomNotifications/>
            <RentalAddUpdateForm rental={rental}/>
        </Box>
    );
}

export default RentalAddUpdatePage;

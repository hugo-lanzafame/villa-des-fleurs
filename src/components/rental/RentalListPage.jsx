import React, {useEffect} from 'react';
import {Box} from '@mui/material';
import PropTypes from "prop-types";
import {useLanguage} from "../../contexts/LanguageProvider";
import {deleteRentalById, getAllRentals} from '../../services/api/firebase/rentals';
import {useTable} from "../../contexts/TableProvider";
import {PATHS} from "../../constants/routing";
import CustomTableLayout from "../custom/CustomTableLayout";
import CustomPageTop from "../custom/CustomPageTop";
import CustomNotifications from "../custom/CustomNotifications";

/**
 * Component for displaying a list of rentals.
 *
 * @returns {JSX.Element} The RentalsListPage component.
 */
function RentalListPage() {
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
        {label: translate({section: "BREADCRUMB", key: "RENTALS"}), to: ''},
    ];

    /**
     * @type {string}
     */
    const title = translate({section: "RENTAL_LIST_PAGE", key: "PAGE_TITLE"});

    /**
     * @type {TableFilter[]}
     */
    const filters = [
        {
            key: 'filterByName',
            label: translate({section: "RENTAL_LIST_PAGE", key: "SEARCH_NAME"})
        },
    ];

    /**
     * @type {TableColumn[]}
     */
    const columns = [
        {key: 'name', label: translate({section: "RENTAL_LIST_PAGE", key: "COLUMN_NAME"})},
    ];

    /**
     * @type {PopupContent}
     */
    const popupDeleteContent = {
        title: translate({section: "RENTAL_LIST_PAGE", key: "POPUP_DELETE_TITLE"}),
        content: translate({section: "RENTAL_LIST_PAGE", key: "POPUP_DELETE_CONTENT"}),
    };

    /**
     * @type {string}
     */
    const deleteNotification = translate({section: "RENTAL_LIST_PAGE", key: "NOTIFICATION_DELETE"})

    /**
     * A filter objects that contain rental filters.
     *
     * @typedef {Object} RentalFilterValues
     * @property {string} filterByName - The rental name to use for sorting.
     */

    /**
     * Get rentals and filter them.
     *
     * @param {Rental[]} rentals - The rentals to filter.
     * @param {RentalFilterValues} [rentalFilterValues] - The filter values to use.
     * @returns {Rental[]} An array of filtered rentals.
     */
    const filterRentals = (rentals, rentalFilterValues) => {
        const filterByName = rentalFilterValues.filterByName;

        if (!rentalFilterValues) {
            return rentals;
        }

        if (filterByName && filterByName !== '') {
            rentals = rentals.filter(rental =>
                rental.name.toLowerCase().includes(filterByName.toLowerCase())
            );
        }

        return rentals;
    };
    filterRentals.propTypes = {
        rentals: PropTypes.array.isRequired,
        rentalFilterValues: PropTypes.array,
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const rentals = await getAllRentals();

                changeFilters(filters);
                changeColumns(columns);
                changeAllEntries(rentals);
                changeEntries(rentals);
                changeEditionLink(PATHS.RENTALS_EDITION);
                changeCreationLink(PATHS.RENTALS_CREATION);
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
        <Box className="rental-list-page">
            <CustomPageTop breadcrumbLinks={breadcrumbLinks} title={title}/>
            <CustomNotifications/>
            <CustomTableLayout reloadEntries={getAllRentals} filterEntries={filterRentals}
                               deleteEntryById={deleteRentalById}/>
        </Box>
    );
}

export default RentalListPage;

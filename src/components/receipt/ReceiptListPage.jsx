import React, {useEffect} from 'react';
import {Box} from '@mui/material';
import PropTypes from "prop-types";
import {useLanguage} from "../../contexts/LanguageProvider";
import {useTable} from "../../contexts/TableProvider";
import {getAllRentals} from '../../services/api/firebase/rentals';
import {PATHS} from "../../constants/routing";
import CustomTableLayout from "../common/CustomTableLayout";
import CustomPageTop from "../common/CustomPageTop";
import CustomNotifications from "../common/CustomNotifications";

/**
 * Component for displaying a list of receipts.
 *
 * @returns {JSX.Element} The ReceiptListPage component.
 */
function ReceiptListPage() {
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
        {label: translate({section: "BREADCRUMB", key: "TOOLS"}), to: PATHS.MANAGEMENT},
        {label: translate({section: "BREADCRUMB", key: "RECEIPTS"}), to: ''},
    ];

    /**
     * @type {string}
     */
    const title = translate({section: "RECEIPT_LIST_PAGE", key: "PAGE_TITLE"});

    /**
     * @type {TableFilter[]}
     */
    const filters = [
        {
            key: 'filterByName',
            label: translate({section: "RECEIPT_LIST_PAGE", key: "SEARCH_NAME"})
        },
    ];

    /**
     * @type {TableColumn[]}
     */
    const columns = [
        {key: 'name', label: translate({section: "RECEIPT_LIST_PAGE", key: "COLUMN_NAME"})},
    ];

    /**
     * A filter objects that contain rental filters.
     *
     * @typedef {Object} ReceiptFilterValues
     * @property {string} filterByName - The receipt name to use for sorting.
     */

    /**
     * Get rentals and filter them.
     *
     * @param {Receipt[]} receipts - The receipts to filter.
     * @param {ReceiptFilterValues} [receiptFilterValues] - The filter values to use.
     * @returns {Receipt[]} An array of filtered receipts.
     */
    const filterReceipts = (receipts, receiptFilterValues) => {
        const filterByName = receiptFilterValues.filterByName;

        if (!receiptFilterValues) {
            return receipts;
        }

        if (filterByName && filterByName !== '') {
            receipts = receipts.filter(receipt =>
                receipt.name.toLowerCase().includes(filterByName.toLowerCase())
            );
        }

        return receipts;
    };
    filterReceipts.propTypes = {
        receipts: PropTypes.array.isRequired,
        receiptFilterValues: PropTypes.array,
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const rentals = await getAllRentals();

                changeFilters(filters);
                changeColumns(columns);
                changeAllEntries(rentals);
                changeEntries(rentals);
                changeEditionLink(PATHS.RECEIPTS_EDITION);
                changeCreationLink(null);
                changePopupDeleteContent(null);
                changeDeleteNotification(null);
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
            <CustomTableLayout reloadEntries={getAllRentals} filterEntries={filterReceipts}
                               deleteEntryById={null}/>
        </Box>
    );
}

export default ReceiptListPage;

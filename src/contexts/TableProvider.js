import {createContext, useContext, useState} from 'react';
import PropTypes from "prop-types";

/**
 * React contexts for language management.
 * @type {React.Context<TableContext>}
 */
const TableContext = createContext();

/**
 * Custom React hook to access the LanguageContext.
 *
 * @returns {TableContext} The LanguageContext object.
 */
export const useTable = () => {
    return useContext(TableContext);
};

/**
 * Provides table management for the application.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by TableProvider.
 */
export const TableProvider = ({children}) => {
    const [filters, setFilters] = useState([]);
    const [columns, setColumns] = useState([]);
    const [entries, setEntries] = useState([]);
    const [allEntries, setAllEntries] = useState([]);
    const [editionLink, setEditionLink] = useState('');
    const [creationLink, setCreationLink] = useState('');
    const [popupDeleteContent, setPopupDeleteContent] = useState({});
    const [deleteNotification, setDeleteNotification] = useState({});

    /**
     * Filter objects for custom table filtering.
     *
     * @typedef {Object} TableFilter
     * @property {string} key - The unique key for the filter.
     * @property {string} label - The translation key for the filter label.
     * @property {boolean} [select] - Indicates if the filter is a select dropdown.
     * @property {TableFilterOption[]} [options] - The options for a select dropdown.
     */

    /**
     * Option objects to customize the table filter component.
     *
     * @typedef {Object} TableFilterOption
     * @property {string} value - The value of the option.
     * @property {string} label - The label of the option.
     */

    /**
     * Change the table filters.
     *
     * @param {TableFilter[]} newFilters - The new filters to set.
     */
    const changeFilters = (newFilters) => {
        setFilters(newFilters);
    };
    changeFilters.propTypes = {
        newFilters: PropTypes.array,
    };

    /**
     * Column object for custom table.
     *
     * @typedef {Object} TableColumn
     * @property {string} key - The unique key for the column.
     * @property {string} label - The translation key for the column label.
     */

    /**
     * Change the table columns.
     *
     * @param {TableColumn} newColumns - The columns to set.
     */
    const changeColumns = (newColumns) => {
        setColumns(newColumns);
    };
    changeColumns.propTypes = {
        newColumns: PropTypes.array.isRequired,
    };


    /**
     * Change the table all entries.
     *
     * @param {Array} newAllEntries - The new entries to set.
     */
    const changeAllEntries = (newAllEntries) => {
        setAllEntries(newAllEntries);
    };
    changeAllEntries.propTypes = {
        newAllEntries: PropTypes.array,
    };

    /**
     * Change the table entries.
     *
     * @param {Array} newEntries - The new entries to set.
     */
    const changeEntries = (newEntries) => {
        setEntries(newEntries);
    }
    changeEntries.propTypes = {
        newEntries: PropTypes.array,
    };

    /**
     * Change the entry edition link.
     *
     * @param {string} newLink - The new edition link to set.
     */
    const changeEditionLink = (newLink) => {
        setEditionLink(newLink);
    };
    changeEditionLink.propTypes = {
        newLink: PropTypes.string.isRequired,
    };

    /**
     * Change the entry creation link.
     *
     * @param {string} newLink - The new creation link to set.
     */
    const changeCreationLink = (newLink) => {
        setCreationLink(newLink);
    };
    changeCreationLink.propTypes = {
        newLink: PropTypes.string.isRequired,
    };

    /**
     * Popup content object.
     *
     * @typedef {Object} PopupContent
     * @property {string} title - The title of the popup.
     * @property {string} content - The content for the popup.
     */

    /**
     * Change the table popup delete content.
     *
     * @param {PopupContent} newContent - The popup content to set.
     */
    const changePopupDeleteContent = (newContent) => {
        setPopupDeleteContent(newContent);
    };
    changePopupDeleteContent.propTypes = {
        newContent: PropTypes.object.isRequired,
    };

    /**
     * Change the delete notification text.
     *
     * @param {string} notification - The notification to set.
     */
    const changeDeleteNotification = (notification) => {
        setDeleteNotification(notification);
    };
    changeCreationLink.propTypes = {
        notification: PropTypes.string.isRequired,
    };


    return (
        <TableContext.Provider value={{
            filters,
            changeFilters,
            allEntries,
            changeAllEntries,
            columns,
            changeColumns,
            entries,
            changeEntries,
            editionLink,
            changeEditionLink,
            creationLink,
            changeCreationLink,
            popupDeleteContent,
            changePopupDeleteContent,
            deleteNotification,
            changeDeleteNotification}}>
            {children}
        </TableContext.Provider>
    );
};
TableProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

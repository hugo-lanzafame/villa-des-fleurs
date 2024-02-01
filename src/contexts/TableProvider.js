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
        }}>
            {children}
        </TableContext.Provider>
    );
};
TableProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

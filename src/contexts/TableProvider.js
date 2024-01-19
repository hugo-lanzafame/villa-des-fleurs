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
 * Provides language management for the application.
 *
 * @param {Object} props - Props for the LanguageProvider component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by LanguageProvider.
 */
export const TableProvider = ({children}) => {
    const [currentEntries, setCurrentEntries] = useState();

    /**
     * Change the current language and save it to local storage.
     *
     * @param {Array} newEntries - The new language code to set.
     */
    const changeEntries = (newEntries) => {
        setCurrentEntries(newEntries);
    }
    changeEntries.protTypes = {
        newEntries: PropTypes.array,
    };

    return (
        <TableContext.Provider value={{currentEntries, changeEntries}}>
            {children}
        </TableContext.Provider>
    );
};
TableProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
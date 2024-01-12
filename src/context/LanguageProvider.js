import {createContext, useContext, useState} from 'react';
import PropTypes from "prop-types";
import translations from "../translations/translations.json";

/**
 * React context for language management.
 * @type {React.Context<LanguageContext>}
 */
const LanguageContext = createContext();

/**
 * Custom React hook to access the LanguageContext.
 *
 * @returns {LanguageContext} The LanguageContext object.
 */
export const useLanguage = () => {
    return useContext(LanguageContext);
};

/**
 * Provides language management for the application.
 *
 * @param {Object} props - Props for the LanguageProvider component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by LanguageProvider.
 */
export const LanguageProvider = ({children}) => {
    const [currentLanguage, setCurrentLanguage] = useState(
        localStorage.getItem('preferredLanguage') || 'fr'
    );

    /**
     * Change the current language and save it to local storage.
     *
     * @param {string} newLanguage - The new language code to set.
     */
    const changeLanguage = (newLanguage) => {
        localStorage.setItem('preferredLanguage', newLanguage);
        setCurrentLanguage(newLanguage);
    }
    changeLanguage.protTypes = {
        newLanguage: PropTypes.string.isRequired,
    };

    /**
     * Translates text based on the current language.
     *
     * @param {Object} props - Props for the translation.
     * @param {string} props.section - The translation section.
     * @param {string} props.key - The translation key within the section.
     * @returns {string} The translated text.
     */
    const translate = ({section, key}) => {
        if (translations[section] && translations[section][key]) {
            return translations[section][key][currentLanguage];
        }

        return `Translation not found for ${section}.${key}`;
    };
    translate.PropTypes = {
        section: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired
    };

    return (
        <LanguageContext.Provider value={{currentLanguage, changeLanguage, translate}}>
            {children}
        </LanguageContext.Provider>
    );
};
LanguageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

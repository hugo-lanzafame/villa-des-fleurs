import {createContext, useContext, useState} from 'react';
import translations from "../translations/translations.json";

const LanguageContext = createContext();

export const useLanguage = () => {
    return useContext(LanguageContext);
};

export const LanguageProvider = ({children}) => {
    const [currentLanguage, setCurrentLanguage] = useState(
        localStorage.getItem('preferredLanguage') || 'fr'
    );


    const changeLanguage = (newLanguage) => {
        localStorage.setItem('preferredLanguage', newLanguage);
        setCurrentLanguage(newLanguage);
    };

    const translate = ({section, key}) => {
        if (translations[section] && translations[section][key]) {
            console.log(translations[section][key]);
            return translations[section][key][currentLanguage];
        }

        return `Translation not found for ${section}.${key}`;
    };


    return (
        <LanguageContext.Provider value={{currentLanguage, changeLanguage, translate}}>
            {children}
        </LanguageContext.Provider>
    );
};

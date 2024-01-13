import React from 'react';
import {useNavigate} from 'react-router-dom';
import {signOutUser} from "../../services/api/firebase/auth";
import {useLanguage} from '../../context/LanguageProvider';
import {PATHS} from '../../constants';

/**
 * Component for the account page.
 *
 * @returns {JSX.Element} The AccountPage component.
 */
const AccountPage = () => {
    const {currentLanguage, changeLanguage, translate} = useLanguage();
    const navigate = useNavigate();

    /**
     * Handles the language change event.
     *
     * @param {Object} e - The change event.
     */
    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        changeLanguage(newLanguage);
    };

    /**
     * Handles the logout action.
     */
    const handleLogout = () => {
        signOutUser()
            .then(() => {
                navigate(PATHS.LOGIN);
            })
    };

    return (
        <div>
            <h1>{translate({section:"ACCOUNT_PAGE", key:"TITLE_ACCOUNT"})}</h1>
            <select value={currentLanguage} onChange={handleLanguageChange}>
                <option value="fr">{translate({section:"ACCOUNT_PAGE", key:"TRAD_FRENCH"})}</option>
                <option value="en">{translate({section:"ACCOUNT_PAGE", key:"TRAD_ENGLISH"})}</option>
            </select>
            <button onClick={handleLogout}>{translate({section:"ACCOUNT_PAGE", key:"BUTTON_LOGOUT"})}</button>
        </div>
    );
};

export default AccountPage;

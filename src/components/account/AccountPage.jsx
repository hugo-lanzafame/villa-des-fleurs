import { Box, Button, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { signOutUser, getCurrentUser } from "../../services/api/firebase/auth";
import { useLanguage } from '../../contexts/LanguageProvider';
import { PATHS } from '../../constants/routing';
import CustomPageTop from "../common/CustomPageTop";
import "../../styles/accountStyle.scss";

/**
 * Component for the account page.
 *
 * @returns {JSX.Element} The AccountPage component.
 */
const AccountPage = () => {
    const { currentLanguage, changeLanguage, translate } = useLanguage();
    const navigate = useNavigate();
    const user = getCurrentUser();

    const breadcrumbLinks = [
        { label: translate({ section: "BREADCRUMB", key: "HOME" }), to: PATHS.HOME },
        { label: translate({ section: "BREADCRUMB", key: "ACCOUNT" }), to: PATHS.ACCOUNT },
    ];

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
            .catch((error) => {
                console.error("Erreur lors de la déconnexion:", error);
            });
    };

    /**
     * Handles the navigation back to home page.
     */
    const handleNavigateHome = () => {
        navigate(PATHS.HOME);
    };

    return (
        <div className="account-page basic-page">
            <CustomPageTop
                breadcrumbLinks={breadcrumbLinks}
                title={translate({ section: "ACCOUNT_PAGE", key: "TITLE_ACCOUNT" })}
            />

            <Box className="account-content">
                {/* Section informations utilisateur */}
                <Box className="dark-light-box">
                    <Box className="section-header">
                        <Typography>
                            {translate({ section: "ACCOUNT_PAGE", key: "USER_INFO_TITLE" })}
                        </Typography>
                    </Box>

                    <Box className="section-container">
                        {user && (
                            <>
                                <Box className="info-row">
                                    <Box className="info-field">
                                        <Typography className="label">
                                            {translate({ section: "ACCOUNT_PAGE", key: "EMAIL_LABEL" })}
                                        </Typography>
                                        <Typography className="value">
                                            {user.email}
                                        </Typography>
                                    </Box>
                                    <Box className="info-field">
                                        <Typography className="label">
                                            {translate({ section: "ACCOUNT_PAGE", key: "USER_ID_LABEL" })}
                                        </Typography>
                                        <Typography className="value">
                                            {user.uid}
                                        </Typography>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>

                {/* Section préférences */}
                <Box className="dark-light-box">
                    <Box className="section-header">
                        <Typography>
                            {translate({ section: "ACCOUNT_PAGE", key: "PREFERENCES_TITLE" })}
                        </Typography>
                    </Box>

                    <Box className="section-container">
                        <Box className="info-row">
                            <Box className="field-with-icon">
                                <FormControl className="field">
                                    <InputLabel id="language-select-label">
                                        {translate({ section: "ACCOUNT_PAGE", key: "LANGUAGE_SELECTOR_LABEL" })}
                                    </InputLabel>
                                    <Select
                                        labelId="language-select-label"
                                        id="language-select"
                                        value={currentLanguage}
                                        onChange={handleLanguageChange}
                                        size="small"
                                        label={translate({ section: "ACCOUNT_PAGE", key: "LANGUAGE_SELECTOR_LABEL" })}
                                    >
                                        <MenuItem value="fr">{translate({ section: "ACCOUNT_PAGE", key: "TRAD_FRENCH" })}</MenuItem>
                                        <MenuItem value="en">{translate({ section: "ACCOUNT_PAGE", key: "TRAD_ENGLISH" })}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className="action-buttons">
                    <Button
                        className="red-button"
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                    >
                        {translate({ section: "ACCOUNT_PAGE", key: "BUTTON_LOGOUT" })}
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default AccountPage;

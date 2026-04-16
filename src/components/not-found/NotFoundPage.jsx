import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useLanguage } from '../../contexts/LanguageProvider';
import { PATHS } from '../../constants/routing';
import "../../styles/notFoundStyle.scss";

/**
 * Component that serves as a 404 Not Found page for handling routing in the application.
 *
 * @returns {JSX.Element} The NotFoundPage component.
 **/
const NotFoundPage = () => {
    const { translate } = useLanguage();
    const navigate = useNavigate();

    /**
     * Handles the navigation back to home page.
     */
    const handleNavigateHome = () => {
        navigate(PATHS.HOME);
    };

    return (
        <div className="not-found-page basic-page">
            <div className="not-found-content">
                <Box className="dark-light-box">
                    <div className="error-message">
                        <Typography className="title">
                            {translate({ section: "NOT_FOUND_PAGE", key: "TITLE" })}
                        </Typography>
                        <Typography className="subtitle">
                            {translate({ section: "NOT_FOUND_PAGE", key: "SUBTITLE" })}
                        </Typography>
                    </div>
                </Box>

                <Box className="action-buttons">
                    <Button
                        className="white-button"
                        onClick={handleNavigateHome}
                        startIcon={<HomeIcon />}
                    >
                        {translate({ section: "NOT_FOUND_PAGE", key: "BUTTON_HOME" })}
                    </Button>
                </Box>
            </div>
        </div>
    );
};

export default NotFoundPage;

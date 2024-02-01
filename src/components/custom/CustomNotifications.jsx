import React, {useEffect} from 'react';
import {Box, Button, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useNotification} from "../../contexts/NotificationProvider"
import {NOTIFICATION_TYPES} from "../../constants/notification";

/**
 * Component for displaying custom notifications.
 *
 * @returns {JSX.Element} The CustomNotifications component.
 */
function CustomNotifications() {
    const {getNotifications, clearNotification, clearNotifications} = useNotification();

    /**
     * @type {NotificationP[]}
     */
    const notifications = getNotifications();

    const getNotificationClassType = (type) => {
        switch (type) {
            case NOTIFICATION_TYPES.SUCCESS:
                return 'notification-success';
            case NOTIFICATION_TYPES.ERROR:
                return 'notification-error';
            case NOTIFICATION_TYPES.INFO:
                return 'notification-info';
            case NOTIFICATION_TYPES.WARNING:
                return 'notification-warning';
            default:
                return '';
        }
    };

    useEffect(() => {
        clearNotifications();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {notifications.length !== 0 ? (
                notifications.map((notification, index) => (
                    <Box key={index} className={"notification-box " + getNotificationClassType(notification.type)}>
                        <Typography>{notification.message}</Typography>
                        <Button className="white-button" onClick={() => clearNotification(index)}>
                            <CloseIcon/>
                        </Button>
                    </Box>
                ))
            ) : ""}
        </>
    );
}

export default CustomNotifications;
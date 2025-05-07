import React, {createContext, useContext, useState} from 'react';
import PropTypes from "prop-types";

/**
 * React context for notification management.
 * @type {React.Context<NotificationContext>}
 */
const NotificationContext = createContext();

/**
 * Custom React hook to access the NotificationContext.
 *
 * @returns {NotificationContext} The NotificationContext object.
 */
export const useNotification = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }

    return context;
};

/**
 * Provides notification management for the application.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by NotificationProvider.
 */
export const NotificationProvider = ({children}) => {
    const [notifications, setNotifications] = useState([]);

    /**
     * Adds a notification to the list.
     *
     * @param {string} type - The type of notification (success, warning, error, info).
     * @param {string} message - The message content of the notification.
     */
    const addNotification = (type, message) => {
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            {type, message},
        ]);
    };
    addNotification.propTypes = {
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    };

    /**
     * Notification object.
     *
     * @typedef {Object} CustomNotification
     * @property {string} type - Notification type.
     * @property {string} message - Notification message.
     */

    /**
     * Shows all notifications.
     *
     * @return {CustomNotification[]}
     */
    const getNotifications = () => {
        return notifications;
    };

    /**
     * Clears a specific notification from the list.
     *
     * @param {number} index - The index of the notification to be cleared.
     */
    const clearNotification = (index) => {
        setNotifications((prevNotifications) => {
            const newNotifications = [...prevNotifications];
            newNotifications.splice(index, 1);
            return newNotifications;
        });
    };

    /**
     * Clears all notification.
     */
    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider
            value={{addNotification, getNotifications, clearNotification, clearNotifications}}>
            {children}
        </NotificationContext.Provider>
    );
};
NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

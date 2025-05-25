import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';

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
     * Notification object used in the notification system.
     *
     * @typedef {Object} Notification
     * @property {string} id - A unique identifier for the notification.
     * @property {'info' | 'success' | 'warning' | 'error'} type - The type of notification (used for styling and icons).
     * @property {string} message - The message content to display.
     * @property {boolean} persistent - If true, the notification will not auto-dismiss.
     */

    /**
     * Adds a notification to the list.
     * @param {string} type - The type of notification (success, warning, error, info).
     * @param {string} message - The message content.
     * @param {boolean} [autoDismiss=true] - Whether to automatically remove the notification.
     * @param {number} [duration=5000] - Duration before auto-dismiss (ms).
     */
    const addNotification = (type, message, autoDismiss = true, duration = 5000) => {
        const id = Date.now();
        const newNotification = {id, type, message};
        setNotifications(prev => [...prev, newNotification]);

        if (autoDismiss) {
            setTimeout(() => clearNotification(id), duration);
        }
    };

    /**
     * Removes a notification by ID.
     * @param {number} id - The ID of the notification to remove.
     */
    const clearNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    /**
     * Removes all notifications.
     */
    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider
            value={{notifications, addNotification, clearNotification, clearNotifications}}>
            {children}
        </NotificationContext.Provider>
    );
};
NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

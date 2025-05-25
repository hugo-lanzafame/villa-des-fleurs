import {renderHook, act} from '@testing-library/react';
import {NotificationProvider, useNotification} from './NotificationProvider';

describe('NotificationProvider tests', () => {
    const wrapper = ({children}) => <NotificationProvider>{children}</NotificationProvider>;

    it('should start with an empty notification list', () => {
        const {result} = renderHook(() => useNotification(), {wrapper});
        expect(result.current.notifications).toEqual([]);
    });

    it('should add a notification to the list', () => {
        const {result} = renderHook(() => useNotification(), {wrapper});

        act(() => {
            result.current.addNotification('success', 'Test message', false);
        });

        const notifications = result.current.notifications;
        expect(notifications.length).toBe(1);
        expect(notifications[0].type).toBe('success');
        expect(notifications[0].message).toBe('Test message');
    });

    it('should clear a specific notification by id', () => {
        const { result } = renderHook(() => useNotification(), { wrapper });
        act(() => {
            result.current.addNotification('info', 'Message to remove', false);
        });
        const notifications = result.current.notifications;
        expect(notifications.length).toBe(1);
        const id = notifications[0].id;
        act(() => {
            result.current.clearNotification(id);
        });
        expect(result.current.notifications).toEqual([]);
    });

    it('should clear all notifications', () => {
        const {result} = renderHook(() => useNotification(), {wrapper});

        act(() => {
            result.current.addNotification('warning', 'First message', false);
            result.current.addNotification('error', 'Second message', false);
        });

        expect(result.current.notifications.length).toBe(2);

        act(() => {
            result.current.clearNotifications();
        });

        expect(result.current.notifications).toEqual([]);
    });

    it('should automatically remove notification after duration if autoDismiss is true', () => {
        vi.useFakeTimers();
        const {result} = renderHook(() => useNotification(), {wrapper});

        act(() => {
            result.current.addNotification('info', 'Auto-dismiss message', true, 3000);
        });

        expect(result.current.notifications.length).toBe(1);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.notifications).toEqual([]);
        vi.useRealTimers();
    });
});

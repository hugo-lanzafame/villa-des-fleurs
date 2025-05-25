import {renderHook, act} from '@testing-library/react';
import {TableProvider, useTable} from './TableProvider';

describe('TableProvider tests', () => {
    const wrapper = ({children}) => <TableProvider>{children}</TableProvider>;

    it('should have default empty states', () => {
        const {result} = renderHook(() => useTable(), {wrapper});

        expect(result.current.filters).toEqual([]);
        expect(result.current.columns).toEqual([]);
        expect(result.current.entries).toEqual([]);
        expect(result.current.allEntries).toEqual([]);
        expect(result.current.editionLink).toBe('');
        expect(result.current.creationLink).toBe('');
        expect(result.current.popupDeleteContent).toEqual({});
        expect(result.current.deleteNotification).toEqual({});
    });

    it('should change filters correctly', () => {
        const {result} = renderHook(() => useTable(), {wrapper});

        const newFilters = [{key: 'status', label: 'Status'}];

        act(() => {
            result.current.changeFilters(newFilters);
        });

        expect(result.current.filters).toEqual(newFilters);
    });

    it('should change columns correctly', () => {
        const {result} = renderHook(() => useTable(), {wrapper});

        const newColumns = [{key: 'name', label: 'Name'}];

        act(() => {
            result.current.changeColumns(newColumns);
        });

        expect(result.current.columns).toEqual(newColumns);
    });

    it('should change entries correctly', () => {
        const {result} = renderHook(() => useTable(), {wrapper});

        const newEntries = [{id: 1, name: 'Entry 1'}];

        act(() => {
            result.current.changeEntries(newEntries);
        });

        expect(result.current.entries).toEqual(newEntries);
    });

    it('should change allEntries correctly', () => {
        const {result} = renderHook(() => useTable(), {wrapper});

        const newAllEntries = [{id: 1, name: 'Entry All'}];

        act(() => {
            result.current.changeAllEntries(newAllEntries);
        });

        expect(result.current.allEntries).toEqual(newAllEntries);
    });

    it('should change editionLink correctly', () => {
        const {result} = renderHook(() => useTable(), {wrapper});

        const newLink = '/edit/123';

        act(() => {
            result.current.changeEditionLink(newLink);
        });

        expect(result.current.editionLink).toBe(newLink);
    });

    it('should change creationLink correctly', () => {
        const {result} = renderHook(() => useTable(), {wrapper});

        const newLink = '/create';

        act(() => {
            result.current.changeCreationLink(newLink);
        });

        expect(result.current.creationLink).toBe(newLink);
    });

    it('should change popupDeleteContent correctly', () => {
        const {result} = renderHook(() => useTable(), {wrapper});

        const newContent = {title: 'Delete?', content: 'Are you sure?'};

        act(() => {
            result.current.changePopupDeleteContent(newContent);
        });

        expect(result.current.popupDeleteContent).toEqual(newContent);
    });

    it('should change deleteNotification correctly', () => {
        const {result} = renderHook(() => useTable(), {wrapper});

        const notification = 'Item deleted';

        act(() => {
            result.current.changeDeleteNotification(notification);
        });

        expect(result.current.deleteNotification).toBe(notification);
    });
});

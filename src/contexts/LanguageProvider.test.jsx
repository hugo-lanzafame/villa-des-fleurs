import {renderHook, act} from '@testing-library/react';
import {LanguageProvider, useLanguage} from './LanguageProvider';

describe('LanguageProvider tests', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should use "fr" as the default language if localStorage is empty', () => {
        const wrapper = ({children}) => <LanguageProvider>{children}</LanguageProvider>;
        const {result} = renderHook(() => useLanguage(), {wrapper});
        expect(result.current.currentLanguage).toBe('fr');
    });

    it('should load the language from localStorage if it exists', () => {
        localStorage.setItem('preferredLanguage', 'en');
        const wrapper = ({children}) => <LanguageProvider>{children}</LanguageProvider>;
        const {result} = renderHook(() => useLanguage(), {wrapper});
        expect(result.current.currentLanguage).toBe('en');
    });

    it('should change the language and update localStorage', () => {
        const wrapper = ({children}) => <LanguageProvider>{children}</LanguageProvider>;
        const {result} = renderHook(() => useLanguage(), {wrapper});

        act(() => {
            result.current.changeLanguage('en');
        });
        expect(result.current.currentLanguage).toBe('en');
        expect(localStorage.getItem('preferredLanguage')).toBe('en');
    });

    it('should translate a valid key', () => {
        const wrapper = ({children}) => <LanguageProvider>{children}</LanguageProvider>;
        const {result} = renderHook(() => useLanguage(), {wrapper});

        const translation = result.current.translate({section: 'LOGIN_PAGE', key: 'RIGHT_SIDE_TITLE'});
        expect(typeof translation).toBe('string');
        expect(translation).not.toContain('Translation not found');
    });

    it('should return an error message if the key is missing', () => {
        const wrapper = ({children}) => <LanguageProvider>{children}</LanguageProvider>;
        const {result} = renderHook(() => useLanguage(), {wrapper});
        const translation = result.current.translate({section: 'INVALID', key: 'UNKNOWN'});
        expect(translation).toMatch(/Translation not found/);
    });
});

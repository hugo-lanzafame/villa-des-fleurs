import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import {signInUser, resetPassword} from '../../services/api/firebase/auth';
import LoginForm from './LoginForm';

// Mock Firebase Auth
vi.mock('../../services/api/firebase/auth', () => ({
    signInUser: vi.fn(() => Promise.resolve()),
    resetPassword: vi.fn(() => Promise.resolve()),
}));

// Mock LanguageProvider
vi.mock('../../contexts/LanguageProvider', () => ({
    useLanguage: () => ({
        translate: ({section, key}) => `[${section}.${key}]`,
    }),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('LoginForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () =>
        render(<LoginForm/>, {
            wrapper: ({children}) => <MemoryRouter>{children}</MemoryRouter>,
        });

    // Helpers to get elements
    const getLoginEmailInput = () => screen.getByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_EMAIL]');
    const getLoginPasswordInput = () => screen.getByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_PASSWORD]');
    const queryLoginPasswordInput = () => screen.queryByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_PASSWORD]');
    const getLoginSubmitButton = () => screen.getByText('[LOGIN_PAGE.LOGIN_FORM_BUTTON_LOGIN]');
    const getLoginErrorNotification = () => screen.getAllByText('[LOGIN_PAGE.LOGIN_FORM_ERROR_WRONG_PASSWORD]');
    const getLoginToForgotButton = () => screen.getByText('[LOGIN_PAGE.LOGIN_FORM_BUTTON_TO_FORGOT]');
    const getForgotEmailInput = () => screen.getByLabelText('[LOGIN_PAGE.FORGOT_FORM_LABEL_EMAIL]');
    const getForgotSubmitButton = () => screen.getByText('[LOGIN_PAGE.FORGOT_FORM_BUTTON_FORGOT]');
    const getForgotErrorNotification = () => screen.getAllByText('[LOGIN_PAGE.FORGOT_FORM_ERROR_USER_NOT_FOUND]');
    const getForgotSuccessNotification = () => screen.getByText('[LOGIN_PAGE.FORGOT_FORM_SUCCESS]');

    describe('Render and toggle forms', () => {
        it('renders login form fields', () => {
            renderComponent();
            expect(getLoginEmailInput()).toBeInTheDocument();
            expect(getLoginPasswordInput()).toBeInTheDocument();
            expect(getLoginSubmitButton()).toBeInTheDocument();
        });

        it('toggles to forgot password form fields', () => {
            renderComponent();
            fireEvent.click(getLoginToForgotButton());
            expect(getForgotEmailInput()).toBeInTheDocument();
            expect(getForgotSubmitButton()).toBeInTheDocument();
        });

        it('hides login fields when forgot password form is shown', () => {
            renderComponent();
            fireEvent.click(getLoginToForgotButton());
            expect(queryLoginPasswordInput()).not.toBeInTheDocument();
        });
    });

    describe('Login form submission', () => {
        it('calls signInUser on submit', async () => {
            renderComponent();
            fireEvent.change(getLoginEmailInput(), {target: {value: 'test@example.com'}});
            fireEvent.change(getLoginPasswordInput(), {target: {value: 'password123'}});
            fireEvent.click(getLoginSubmitButton());

            await waitFor(() => {
                expect(signInUser).toHaveBeenCalledWith('test@example.com', 'password123');
            });
        });

        it('navigates to home after successful login', async () => {
            renderComponent();
            fireEvent.change(getLoginEmailInput(), {target: {value: 'test@example.com'}});
            fireEvent.change(getLoginPasswordInput(), {target: {value: 'password123'}});
            fireEvent.click(getLoginSubmitButton());

            await waitFor(() => {
                expect(mockNavigate).toHaveBeenCalledWith('/');
            });
        });

        it('displays error message when signInUser fails', async () => {
            signInUser.mockRejectedValueOnce(new Error('Firebase: Error (auth/wrong-password).'));
            renderComponent();
            fireEvent.change(getLoginEmailInput(), {target: {value: 'wrong@example.com'}});
            fireEvent.change(getLoginPasswordInput(), {target: {value: 'wrongpassword'}});
            fireEvent.click(getLoginSubmitButton());

            await waitFor(() => {
                expect(getLoginErrorNotification()).toHaveLength(2);
            });
        });
    });

    describe('Forgot password form submission', () => {
        beforeEach(() => {
            renderComponent();
            fireEvent.click(getLoginToForgotButton());
        });

        it('calls resetPassword on submit', async () => {
            fireEvent.change(getForgotEmailInput(), {target: {value: 'forgot@example.com'}});
            fireEvent.click(getForgotSubmitButton());

            await waitFor(() => {
                expect(resetPassword).toHaveBeenCalledWith('forgot@example.com');
            });
        });

        it('displays error message when resetPassword fails', async () => {
            resetPassword.mockRejectedValueOnce(new Error('Firebase: Error (auth/user-not-found).'));
            fireEvent.change(getForgotEmailInput(), {target: {value: 'wrong@example.com'}});
            fireEvent.click(getForgotSubmitButton());

            await waitFor(() => {
                expect(getForgotErrorNotification()).toHaveLength(1);
            });
        });

        it('displays success message on successful resetPassword', async () => {
            fireEvent.change(getForgotEmailInput(), {target: {value: 'forgot@example.com'}});
            fireEvent.click(getForgotSubmitButton());

            await waitFor(() => {
                expect(getForgotSuccessNotification()).toBeInTheDocument();
            });
        });
    });
});

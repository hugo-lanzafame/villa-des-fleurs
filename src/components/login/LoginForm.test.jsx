import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import {signInUser, resetPassword} from '../../services/api/firebase/auth';
import LoginForm from './LoginForm';


// Mock Firebase Auth directly in vi.mock
vi.mock('../../services/api/firebase/auth', () => {
    return {
        signInUser: vi.fn(() => Promise.resolve()),
        resetPassword: vi.fn(() => Promise.resolve()),
    };
});

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

describe('LoginForm test', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () => render(<LoginForm/>, {
        wrapper: ({children}) => <MemoryRouter>{children}</MemoryRouter>,
    });

    it('renders login form fields', () => {
        renderComponent();
        expect(screen.getByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_EMAIL]')).toBeInTheDocument();
        expect(screen.getByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_PASSWORD]')).toBeInTheDocument();
        expect(screen.getByText('[LOGIN_PAGE.LOGIN_FORM_BUTTON_LOGIN]')).toBeInTheDocument();
    });

    it('toggles and renders forgot password form fields', () => {
        renderComponent();
        fireEvent.click(screen.getByText('[LOGIN_PAGE.LOGIN_FORM_BUTTON_TO_FORGOT]'));
        expect(screen.getByLabelText('[LOGIN_PAGE.FORGOT_FORM_LABEL_EMAIL]')).toBeInTheDocument();
        expect(screen.getByText('[LOGIN_PAGE.FORGOT_FORM_BUTTON_FORGOT]')).toBeInTheDocument();
    });

    it('hides login fields when showing forgot password form', () => {
        renderComponent();
        fireEvent.click(screen.getByText('[LOGIN_PAGE.LOGIN_FORM_BUTTON_TO_FORGOT]'));
        expect(screen.queryByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_PASSWORD]')).not.toBeInTheDocument();
    });

    it('calls signInUser on login form submission', async () => {
        renderComponent();

        fireEvent.change(screen.getByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_EMAIL]'), {
            target: {value: 'test@example.com'},
        });
        fireEvent.change(screen.getByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_PASSWORD]'), {
            target: {value: 'password123'},
        });
        fireEvent.click(screen.getByText('[LOGIN_PAGE.LOGIN_FORM_BUTTON_LOGIN]'));

        await waitFor(() => {
            expect(signInUser).toHaveBeenCalledWith('test@example.com', 'password123');
        });
    });

    it('calls resetPassword on forgot password form submission', async () => {
        renderComponent();
        fireEvent.click(screen.getByText('[LOGIN_PAGE.LOGIN_FORM_BUTTON_TO_FORGOT]'));
        fireEvent.change(screen.getByLabelText('[LOGIN_PAGE.FORGOT_FORM_LABEL_EMAIL]'), {
            target: {value: 'forgot@example.com'},
        });
        fireEvent.click(screen.getByText('[LOGIN_PAGE.FORGOT_FORM_BUTTON_FORGOT]'));

        await waitFor(() => {
            expect(resetPassword).toHaveBeenCalledWith('forgot@example.com');
        });
    });

    it('displays error message when signInUser fails', async () => {
        signInUser.mockRejectedValueOnce(new Error('Firebase: Error (auth/wrong-password).'));
        renderComponent();

        fireEvent.change(screen.getByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_EMAIL]'), {
            target: {value: 'wrong@example.com'},
        });
        fireEvent.change(screen.getByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_PASSWORD]'), {
            target: {value: 'wrongpassword'},
        });
        fireEvent.click(screen.getByText('[LOGIN_PAGE.LOGIN_FORM_BUTTON_LOGIN]'));

        await waitFor(() => {
            const errors = screen.getAllByText('[LOGIN_PAGE.LOGIN_FORM_ERROR_WRONG_PASSWORD]');
            expect(errors).toHaveLength(2);
        });
    });

    it('displays error message when resetPassword fails', async () => {
        resetPassword.mockRejectedValueOnce(new Error('Firebase: Error (auth/user-not-found).'));
        renderComponent();

        fireEvent.click(screen.getByText('[LOGIN_PAGE.LOGIN_FORM_BUTTON_TO_FORGOT]'));
        fireEvent.change(screen.getByLabelText('[LOGIN_PAGE.FORGOT_FORM_LABEL_EMAIL]'), {
            target: { value: 'wrong@example.com' },
        });
        fireEvent.click(screen.getByText('[LOGIN_PAGE.FORGOT_FORM_BUTTON_FORGOT]'));

        await waitFor(() => {
            const errors = screen.getAllByText('[LOGIN_PAGE.FORGOT_FORM_ERROR_USER_NOT_FOUND]');
            expect(errors).toHaveLength(1);
        });
    });


    it('navigates to home after successful login', async () => {
        renderComponent();
        fireEvent.change(screen.getByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_EMAIL]'), {target: {value: 'test@example.com'}});
        fireEvent.change(screen.getByLabelText('[LOGIN_PAGE.LOGIN_FORM_LABEL_PASSWORD]'), {target: {value: 'password123'}});
        fireEvent.click(screen.getByText('[LOGIN_PAGE.LOGIN_FORM_BUTTON_LOGIN]'));

        await waitFor(() => {
            expect(signInUser).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('displays success message on successful resetPassword', async () => {
        renderComponent();
        fireEvent.click(screen.getByText('[LOGIN_PAGE.LOGIN_FORM_BUTTON_TO_FORGOT]'));
        fireEvent.change(screen.getByLabelText('[LOGIN_PAGE.FORGOT_FORM_LABEL_EMAIL]'), {
            target: { value: 'forgot@example.com' },
        });
        fireEvent.click(screen.getByText('[LOGIN_PAGE.FORGOT_FORM_BUTTON_FORGOT]'));

        await waitFor(() => {
            expect(screen.getByText('[LOGIN_PAGE.FORGOT_FORM_SUCCESS]')).toBeInTheDocument();
        });
    });
});

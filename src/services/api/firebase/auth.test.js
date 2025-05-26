import {describe, it, expect, vi, beforeEach} from 'vitest';
import {signInUser, signOutUser, resetPassword, isAuth, getCurrentUser} from './auth';
import {getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged} from 'firebase/auth';

vi.mock('firebase/auth', () => {
    const mockAuth = {currentUser: {uid: 'mock-uid', email: 'mock@mail.com'}};
    return {
        getAuth: vi.fn(() => mockAuth),
        signInWithEmailAndPassword: vi.fn(),
        signOut: vi.fn(),
        sendPasswordResetEmail: vi.fn(),
        onAuthStateChanged: vi.fn(),
    };
});

describe('auth service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call signInWithEmailAndPassword with email and password', async () => {
        const email = 'test@mail.com';
        const password = '123456';
        await signInUser(email, password);
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), email, password);
    });

    it('should call signOut with auth instance', async () => {
        await signOutUser();
        expect(signOut).toHaveBeenCalledWith(getAuth());
    });

    it('should call sendPasswordResetEmail with email', async () => {
        const email = 'reset@mail.com';
        await resetPassword(email);
        expect(sendPasswordResetEmail).toHaveBeenCalledWith(getAuth(), email);
    });

    it('should return true when a user is authenticated', async () => {
        onAuthStateChanged.mockImplementation((auth, cb) => cb({uid: '123'}));
        const result = await isAuth();
        expect(result).toBe(true);
    });

    it('should return false when no user is authenticated', async () => {
        onAuthStateChanged.mockImplementation((auth, cb) => cb(null));
        const result = await isAuth();
        expect(result).toBe(false);
    });

    it('should handle errors in onAuthStateChanged gracefully', async () => {
        onAuthStateChanged.mockImplementation(() => { throw new Error('Auth error') });
        await expect(isAuth()).rejects.toThrow('Auth error');
    });

    it('should return the current user from auth', () => {
        const user = getCurrentUser();
        expect(user).toEqual({ uid: 'mock-uid', email: 'mock@mail.com' });
    });

    it('signInUser should throw an error if signInWithEmailAndPassword fails', async () => {
        signInWithEmailAndPassword.mockImplementationOnce(() => {
            throw new Error('Sign-in failed');
        });
        await expect(signInUser('test@mail.com', 'wrongpass')).rejects.toThrow('Sign-in failed');
    });

    it('signOutUser should throw an error if signOut fails', async () => {
        signOut.mockImplementationOnce(() => {
            throw new Error('Sign-out failed');
        });
        await expect(signOutUser()).rejects.toThrow('Sign-out failed');
    });

    it('resetPassword should throw an error if sendPasswordResetEmail fails', async () => {
        sendPasswordResetEmail.mockImplementationOnce(() => {
            throw new Error('Reset email failed');
        });
        await expect(resetPassword('fail@mail.com')).rejects.toThrow('Reset email failed');
    });

    it('isAuth should reject if onAuthStateChanged calls error callback', async () => {
        onAuthStateChanged.mockImplementationOnce((auth, cb, errorCb) => {
            errorCb(new Error('Auth state error'));
        });
        await expect(isAuth()).rejects.toThrow('Auth state error');
    });
});

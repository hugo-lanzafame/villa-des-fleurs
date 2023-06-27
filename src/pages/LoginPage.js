import React, { useState } from 'react';
import app from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './LoginPage.scss';

const auth = getAuth(app);

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Connexion réussie, effectuez ici les actions souhaitées après la connexion
            console.log('Connexion réussie');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={"login-page"}>
            <h2>Connexion</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginPage;

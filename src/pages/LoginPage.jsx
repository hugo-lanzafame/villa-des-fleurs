import React, {useState} from 'react';
import app from '../firebaseConfig';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {Box, Grid, Typography, TextField, Button, Link} from '@mui/material';
import image from '../assets/ezgif-5-0be764f48f.png';
import './loginPage.scss';

const auth = getAuth(app);

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Connexion réussie');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box className="login-form">
            <Typography variant="h2" className="login-form__title">S'identifier</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container className="login-form__grid">
                    <Grid item>
                        <TextField
                            label="E-mail"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Mot de passe"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" className="login-form__button">S'identifier</Button>
                    </Grid>
                </Grid>
            </form>
            <Link href="#" variant="body2" className="login-form__link">J'ai oublié mon mot de passe</Link>
        </Box>
    );
};

const LoginPage = () => {
    return (
        <Grid container className="login-page">
            <Grid item>
                <LoginForm/>
            </Grid>
            <Grid item>
                <img className="login-page__image" src={image} alt="villadesfeurs.png" />
            </Grid>
        </Grid>
    );
};

export default LoginPage;

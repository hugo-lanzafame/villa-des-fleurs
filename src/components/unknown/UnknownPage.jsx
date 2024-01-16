import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Component that serves as a 404 Not Found page for handling routing in the application.
 *
 * @returns {JSX.Element} The UnknownPage component.
 **/
const UnknownPage = () => (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
        <h1>404 Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Go to Home</Link>
    </div>
);

export default UnknownPage;

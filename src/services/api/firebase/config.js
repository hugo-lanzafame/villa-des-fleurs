import {initializeApp} from "firebase/app";
import "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyCQmyCxEkGpX80YTwE1ovC5rQCkQJJgYXs",
    authDomain: "villadesfleurs-d4d5d.firebaseapp.com",
    databaseURL: "https://villadesfleurs-d4d5d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "villadesfleurs-d4d5d",
    storageBucket: "villadesfleurs-d4d5d.appspot.com",
    messagingSenderId: "838822137941",
    appId: "1:838822137941:web:f492e1426ee698dc1e84dc"
};

// Initialize Firebase
const app = initializeApp(config);

/**
 * Converts the column of a table from snake_case to entity with camelCase.
 *
 * @param {Object} table - The table with snake_case column.
 * @returns {Object} - The entity with camelCase.
 */
const convertTableToEntity = (table) => {
    const result = {};
    for (const [key, value] of Object.entries(table)) {
        const camelKey = key.toLowerCase()
            .replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
        result[camelKey] = value && typeof value === 'object' && !Array.isArray(value)
            ? convertTableToEntity(value) // Recursively handle nested objects
            : value;
    }
    return result;
};

export default app;
export {convertTableToEntity};
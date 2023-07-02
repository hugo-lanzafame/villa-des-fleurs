import app from './firebaseConfig';
import {getDatabase} from 'firebase/database';

// Obtenir une référence vers la base de données
const database = getDatabase(app);

export {database};
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const appConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
}

//initialize via compat firebase 
firebase.initializeApp(appConfig);
//initialize via firebase initializeApp v9
const app = initializeApp(appConfig);

const db = getFirestore(app);
export default db;

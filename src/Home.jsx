import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './db';

const appConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
  }
  
  //initialize via compat firebase 
  firebase.initializeApp(appConfig);

export default function Home() {
    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/birdlist',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
          ],
    }

    return (
        <div>
            <h1>Home</h1>
            <h6>I have both the authenticated and anonymous version of this app. Just click on "Bird List" to start</h6>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
}

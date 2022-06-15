
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './db';
import { initializeApp } from 'firebase/app';

const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
  });
  
export default function Nav() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/journal',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
          ],
    }
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            // console.log(user);
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/birdlist">Bird List</Link></li>
                <li><Link to="/birdlist/1">Bird Profile</Link></li>
            </ul>
            {user ? 
            (<div>
                <img src={user.photoURL} alt={user.displayName} />
                <p>{user.displayName}</p>
                <button onClick={() => {
                    firebase.auth().signOut();
                    navigate('/');
                }}>Sign Out</button>
            </div>
            ) : (
                <div>
                   <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
            )}
        </div>
    );
}

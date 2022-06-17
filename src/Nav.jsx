
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './db';
// import { initializeApp } from 'firebase/app';

 
export default function Nav() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
          ],
    }
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
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
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/birdlist">Bird List</Link></li>
                <li><Link to="/birdlist/1" element={<birdProfile />}>Bird Profile</Link></li>
            </ul>

        </div>
    );
}

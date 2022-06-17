
import React, { useEffect, useState } from 'react';
// import { collection, getDocs, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { collection, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore';
import db from './db';
import { Link } from 'react-router-dom';
// import AddJournal from './AddJournal';
import firebase from 'firebase/compat/app';

export default function BirdList() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);

    
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const onDelete = (id) => {
        deleteDoc(doc(db, 'users', user.uid, 'birdList', id));
    }

    useEffect(() => {
        if (!user) {
            return;
        }
        console.log(user.uid);
        const entriesQuery = query(
            collection(db, `users/${user.uid}/birdList`),
            // orderBy('createdAt', 'desc')
        );
        const unsubscribe = onSnapshot(
            entriesQuery,
            snapshot => {
                console.log(snapshot.docs);
                setEntries(snapshot.docs);
                setLoading(false);
            },
            reason => {
                console.log(reason);
                setError(true);
                setLoading(false);
            }
        )

        //clean up after yourself.
        return () => unsubscribe();
    }, [user]);

    if (error) {
        return <p>An error occurred, please try again.</p>
    }

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <h1>Bird List</h1>
            {/* <AddJournal /> */}
            {entries.map(abird => {
                return (
                    <div key={abird.data().speciesCode}>
                        <p>{abird.data().comName}</p>
                        <span><Link to={`/birdProfile/${abird.id}`}>View</Link></span>
                        <span><button onClick={() => onDelete(abird.id)}>Delete</button></span>
                        <hr />
                    </div>
                );
            })}
        </div>
    );
}

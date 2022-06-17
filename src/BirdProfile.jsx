import { getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import db from './db';
import firebase from 'firebase/compat/app';

export default function JournalEntry() {
    const { id: entryId } = useParams();
    const [entry, setEntry] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            setUser(user);
        });

        return () => unsubscribe();
    }, [user]);

    const onDelete = async () => {
        setLoading(true);
        if (user) {
            await deleteDoc(doc(db, 'users', user.uid, 'birdList', entryId));
        } else {
            await deleteDoc(doc(db, 'birdList', entryId));
        }
        setLoading(false);
        navigate('/birdList');
    }

    const onEdit = async () => {
        let entryRef = doc(db, 'birdList', entryId);
        if (user) {
            entryRef = doc(db, 'users', user.uid, 'birdList', entryId);
        }
        const newEntry = window.prompt('Edit your entry', entry.entry);
        if (!newEntry || entry.entry === newEntry) {
            return;
        }

        setLoading(true);
        await setDoc(
            entryRef,
            {entry: newEntry},
            {merge: true}
        )

        const updatedDocSnap = await getDoc(entryRef);
        setEntry(updatedDocSnap.data());
        setLoading(false);
    }

    useEffect(() => {
        let entryRef = doc(db, 'birdList', entryId);
        if (user) {
            entryRef = doc(db, 'users', user.uid, 'birdList', entryId);
        } 

        getDoc(entryRef).then(docSnap => {
            setLoading(false);
            if (docSnap.exists()) {
                setEntry(docSnap.data());
            } else {
                setError(true);
            }
    
        });
    }, [user, entryId]);

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error, that document may not exist</p>
    }

    return (
        <div>
            <h1>Bird Entry for {entry.speciesCode}</h1>
            <p>{entry.comName}</p>
            {/* <button onClick={onEdit}>Edit</button> */}
            <button onClick={onDelete}>Delete</button>
        </div>
    );

}

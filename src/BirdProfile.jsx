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
        await deleteDoc(doc(db, 'users', user.uid, 'journalEntries', entryId));
        setLoading(false);
        navigate('/journal');
    }

    const onEdit = async () => {
        const entryRef = doc(db, 'users', user.uid, 'journalEntries', entryId);
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
        if (!user) {
            return;
        }
        
        const entryRef = doc(db, 'users', user.uid, 'journalEntries', entryId);
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
            <h1>Bird Entry: {entryId}</h1>
            <p>{entry.entry}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );

}

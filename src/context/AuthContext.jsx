import React, { createContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const signIn = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log(error.message);
		}
	};

	const signUp = async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password);
		setDoc(doc(db, "users", email), {
			myShows: [],
		});
	};

	const logOut = async () => {
		await signOut(auth).catch((err) => console.log(err.message));
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	});

	return (
		<AuthContext.Provider value={{ signIn, signUp, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};


import "firebase/firestore";

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCDbKV-xm-N9drKg7m_Oh3yhX3xUa6o0k0",
    authDomain: "prueba-a0b6b.firebaseapp.com",
    databaseURL: "https://prueba-a0b6b-default-rtdb.firebaseio.com",
    projectId: "prueba-a0b6b",
    storageBucket: "prueba-a0b6b.appspot.com",
    messagingSenderId: "990479641198",
    appId: "1:990479641198:web:40b6b165b9f5468a26d47f",
    measurementId: "G-8XX1JGTCPS"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); // Obtener una instancia de Firestore

export { db }; // E

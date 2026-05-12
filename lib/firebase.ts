import { initializeApp } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

import {
  getStorage,
} from "firebase/storage";

import {
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-lMWQxMW_jssDIREANodnYRMzcADo--U",
  authDomain: "trendyfrendyindia.firebaseapp.com",
  projectId: "trendyfrendyindia",
  storageBucket: "trendyfrendyindia.firebasestorage.app",
  messagingSenderId: "17279428908",
  appId: "1:17279428908:web:b46e6be5948f117c086489",
  measurementId: "G-P3BCZQEF8H",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);
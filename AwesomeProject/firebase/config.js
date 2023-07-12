// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage } from "firebase/storage";

import * as firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyD7t_BsymH1sS-SHMOqoD9pPqYEXL85PBY",
    authDomain: "react-native-social-netw-2eb91.firebaseapp.com",
    projectId: "react-native-social-netw-2eb91",
    storageBucket: "react-native-social-netw-2eb91.appspot.com",
    messagingSenderId: "498510444748",
    appId: "1:498510444748:web:3d111e09c198e4fd86ea69",
    measurementId: "G-R1Y3LNNV84"
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
firebase.default.initializeApp(firebaseConfig);

export default firebase;
// export const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
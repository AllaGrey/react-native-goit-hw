// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage } from "firebase/storage";

import firebase  from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'



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


// const firebaseConfig = {
//     apiKey: "AIzaSyDcsutqJzRX42UTFwXC0LJ7jWNgyHDl3-I",
//     authDomain: "networt-2d4c3.firebaseapp.com",
//     projectId: "networt-2d4c3",
//     storageBucket: "networt-2d4c3.appspot.com",
//     messagingSenderId: "714409525245",
//     appId: "1:714409525245:web:47b5c0df6dc0eb40b42394",
//     measurementId: "G-PYRTD4LE74"
// };



// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// firebase.default.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig)

export default firebase;
// export const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
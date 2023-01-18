import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyDW-Gyp-PvbFPYwhR-TDucDtMsplzeWaCE",
    authDomain: "react-ecom-a0566.firebaseapp.com",
    projectId: "react-ecom-a0566",
    storageBucket: "react-ecom-a0566.appspot.com",
    messagingSenderId: "326851917402",
    appId: "1:326851917402:web:815ace0cfbcd176ec88a63"
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;
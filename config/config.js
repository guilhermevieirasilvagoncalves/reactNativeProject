// Import the functions you need from the SDKs you need
import Firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB28fyYuNalMTRcmxm2Hk4iTZ4W1njm_Tc",
  authDomain: "projetotwifei.firebaseapp.com",
  projectId: "projetotwifei",
  storageBucket: "projetotwifei.appspot.com",
  messagingSenderId: "419265610520",
  appId: "1:419265610520:web:64a16d0320f9b9ed94d46d"
};

// Initialize Firebase
const app =  Firebase.initializeApp(firebaseConfig);
export const db = app.database();
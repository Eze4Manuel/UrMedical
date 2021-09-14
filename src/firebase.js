// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD5J63iV2eirvF9a6MVvrc9KT-e6ihNlmM",
  authDomain: "fir-cloud-messaging-e29d4.firebaseapp.com",
  projectId: "fir-cloud-messaging-e29d4",
  storageBucket: "fir-cloud-messaging-e29d4.appspot.com",
  messagingSenderId: "963168775769",
  appId: "1:963168775769:web:b37dac79568c333dd74b48",
  measurementId: "G-N2L164F9NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
 
let messaging;

if (typeof window !== "undefined") {
  const firebaseConfig =  {
    apiKey: "AIzaSyBrkRjaKTHn5JkywbDemURT0-JyFXhdC_s",
    authDomain: "venteplus-41fbe.firebaseapp.com",
    projectId: "venteplus-41fbe",
    storageBucket: "venteplus-41fbe.firebasestorage.app",
    messagingSenderId: "160768247733",
    appId: "1:160768247733:web:1fb43440fcef5e7ae37bfc",
    measurementId: "G-Y7XNP6R9CD"
  };

  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export { messaging, getToken, onMessage };

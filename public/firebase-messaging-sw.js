/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBrkRjaKTHn5JkywbDemURT0-JyFXhdC_s",
  authDomain: "venteplus-41fbe.firebaseapp.com",
  projectId: "venteplus-41fbe",
  storageBucket: "venteplus-41fbe.firebasestorage.app",
  messagingSenderId: "160768247733",
  appId: "1:160768247733:web:1fb43440fcef5e7ae37bfc",
  measurementId: "G-Y7XNP6R9CD"
});

const messaging = firebase.messaging();
 
messaging.onBackgroundMessage(function (payload) {
  console.log("📦 Notification reçue en arrière-plan :", payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body });
});

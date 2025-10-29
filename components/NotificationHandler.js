"use client";
import { useEffect } from "react";
import { messaging, getToken, onMessage } from "@/lib/firebase";

export default function NotificationHandler() {
  useEffect(() => {
    if (!messaging) return;

    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey: "BFxZFQNy_OL-tMeeoCp_DcHv4BWIOBnNHDkkgDf7m9eyQkUbxfORyGzc44WD5PwjGvIVCNKVXb9eq-XSr4B93Cc",  
          });
          console.log("FCM Token:", currentToken);
 
        } else {
          console.log("Permission refusée");
        }
      } catch (err) {
        console.error("Erreur FCM:", err);
      }
    };

    requestPermission();
    onMessage(messaging, (payload) => {
    //   new Notification(payload.notification.title, {
    //     body: payload.notification.body,
    //     icon: "/icon.png",
    //   });
      console.log("Message reçu :", payload);
      alert(`${payload.notification.title} - ${payload.notification.body}`);
    });
  }, []);

  return null; 
}

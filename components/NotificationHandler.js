"use client";
import { useEffect } from "react";
import { messaging, getToken, onMessage } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NotificationHandler() {
  const router = useRouter()
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
          localStorage.setItem("fcmToken",currentToken)
 
        } else {
          console.log("Permission refusée");
        }
      } catch (err) {
        console.error("Erreur FCM:", err);
      }
    };

    requestPermission();
    onMessage(messaging, (payload) => {
     
      toast(`${payload.notification.title}`, {
          description: `${payload.notification.body}`,
          duration: Infinity, 
           action: {
            label: "Commandes",
            onClick: () => {
                toast.dismiss()
                router.push("/selling")
            },
      },
        })
      console.log("Message reçu :", payload);
    //   alert(`${payload.notification.title} - ${payload.notification.body}`);
    });
  }, []);

  return null; 
}

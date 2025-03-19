import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDzy8ch0FrUjxmarMYPpcPws_iTJuryw3w",
  authDomain: "futdream-cac4c.firebaseapp.com",
  projectId: "futdream-cac4c",
  storageBucket: "futdream-cac4c.firebasestorage.app",
  messagingSenderId: "730805650724",
  appId: "1:730805650724:web:76ba9c1310515480c81fb1",
  measurementId: "G-WBTSJHL583"
};

// Inicializar Firebase solo en el navegador
let messaging;
if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export const requestPermission = async () => {
  if (!messaging) return;

  try {
    const token = await getToken(messaging, {
      vapidKey: "BGOn3UJEG7r10U9wNhItuDQktufEtc1oetvhmtg57pTY-jnlG2sLX3S25fyPH7C8HyPzEKRavrQGzAzLg0qUf-Q"
    });

    if (token) {
      console.log("Token de notificación:", token);
      return token;
    } else {
      console.log("No se obtuvo el token de notificación.");
    }
  } catch (error) {
    console.error("Error al obtener token:", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
      console.log("Mensaje recibido:", payload);
      resolve(payload);
    });
  });

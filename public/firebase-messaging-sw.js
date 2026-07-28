// Firebase Messaging Service Worker for Push Notifications
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCRW6ITpp19swohGZefkhrJ_VAQCSwEog0",
  authDomain: "arjuna-96111.firebaseapp.com",
  projectId: "arjuna-96111",
  storageBucket: "arjuna-96111.firebasestorage.app",
  messagingSenderId: "120603594960",
  appId: "1:120603594960:web:5fe4b3b163eea164890ed5",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'Chat Baru dari Klien!';
  const notificationOptions = {
    body: payload.notification?.body || 'Ada pesan baru masuk dari pengunjung website Arjuna Dev.',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

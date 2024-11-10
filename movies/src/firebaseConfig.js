import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBXVxauC-raivDIb5mofTLkTmq74BAkkbk",
    authDomain: "movieca-project.firebaseapp.com",
    projectId: "movieca-project",
    storageBucket: "movieca-project.firebasestorage.app",
    messagingSenderId: "63509664346",
    appId: "1:63509664346:web:7858d07577202e732b7e63"
  };

// 初始化 Firebase 应用
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

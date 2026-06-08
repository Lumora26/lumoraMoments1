import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Cole as credenciais do console do seu projeto Firebase abaixo
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "seu-sender-id",
    appId: "seu-app-id"
};

// Inicializa a aplicação Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o banco de dados em tempo real Firestore e o exporta para os outros módulos
export const db = getFirestore(app);
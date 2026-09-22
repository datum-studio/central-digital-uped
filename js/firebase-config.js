/*
  Central Digital UPED — Configuração do Firebase
  ------------------------------------------------
  1. Crie um projeto em https://console.firebase.google.com
  2. Ative: Authentication (método Email/Senha) e Firestore Database (modo produção)
  3. Em "Configurações do projeto > Geral", copie o objeto de config e cole abaixo
  4. Nunca é necessário esconder essas chaves — elas são públicas por natureza no Firebase.
     Quem protege os dados são as regras do Firestore (arquivo firestore.rules).
*/

const firebaseConfig = {
  apiKey: "AIzaSyATZgPo56mWNvjEBfJZ74C4z6wAwSAy-2Q",
  authDomain: "central-digital-uped.firebaseapp.com",
  projectId: "central-digital-uped",
  storageBucket: "central-digital-uped.firebasestorage.app",
  messagingSenderId: "876432367083",
  appId: "1:876432367083:web:1186ae026b676127fc4dae"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

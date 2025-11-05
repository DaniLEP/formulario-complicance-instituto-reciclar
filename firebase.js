import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, update } from "firebase/database";

// ⚙️ Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4l_FQV_5dIZNBqcE8jc71y7Vq7KFx2qM",
  authDomain: "compliance-reciclar.firebaseapp.com",
  databaseURL: "https://compliance-reciclar-default-rtdb.firebaseio.com", // 👈 ADICIONADO
  projectId: "compliance-reciclar",
  storageBucket: "compliance-reciclar.appspot.com", // 👈 CORRIGIDO
  messagingSenderId: "816163862673",
  appId: "1:816163862673:web:fb9851bd673b566fe3e730",
};

// 🚀 Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 📦 Exportações para uso no projeto
export { db, ref, get, set, update };

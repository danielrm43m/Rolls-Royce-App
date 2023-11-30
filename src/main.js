import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { MostrarListaRollsRoyces } from "./app/CRUDRollsRoyces.js";
import { revisaSesion } from "./app/revisaSesion.js";
import { auth, db } from "./app/firebase.js";
import './app/iniciaSesionEmailAndPass.js'
import './app/iniciaSesionFacebook.js'
import './app/iniciaSesionGoogle.js'
import './app/formularioRegistro.js'
import './app/cierreSesion.js'

onAuthStateChanged(auth, async (usuario) => {
    if (usuario) {
        // Si el usuario está en el index, muestra la lista de manualidades
        const querySnapshot = await getDocs(collection(db, 'RollsRoyces'))
        MostrarListaRollsRoyces(querySnapshot.docs);
    } else {
        MostrarListaRollsRoyces([]);  // Puedes ajustar esto según tu lógica
    }
    revisaSesion(usuario);
});

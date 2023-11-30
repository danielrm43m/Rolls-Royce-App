import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioSoldado = document.querySelector('#Formulario-Soldado');

    formularioSoldado.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioSoldado['Nombre-Soldado'].value;
        const RANGO = formularioSoldado['Rango-Soldado'].value;
        const ESPECIALIDAD = formularioSoldado['Especialidad-Soldado'].value;
        const UNIDAD = formularioSoldado['Unidad-Soldado'].value;
        const FECHA_INCORPORACION = formularioSoldado['FechaIncorporacion-Soldado'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevoSoldadoRef = await addDoc(collection(db, 'Soldados'), {
                Nombre: NOMBRE,
                Rango: RANGO,
                Especialidad: ESPECIALIDAD,
                Unidad: UNIDAD,
                FechaIncorporacion: FECHA_INCORPORACION
            });

            // Muestra un mensaje si todo sale bien
            alert(`El soldado ${NOMBRE} ha sido registrado exitosamente`);

            // Limpia el formulario
            formularioSoldado.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar el soldado:', 'noValido');
        }
    });
});

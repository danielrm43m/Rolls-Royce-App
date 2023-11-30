import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioRollsRoyce = document.querySelector('#Formulario-RollsRoyce');

    formularioRollsRoyce.addEventListener('submit', async (e) => {
        e.preventDefault();

        const MODELO = formularioRollsRoyce['Modelo-RollsRoyce'].value;
        const AÑO = formularioRollsRoyce['Año-RollsRoyce'].value;
        const COLOR = formularioRollsRoyce['Color-RollsRoyce'].value;
        const PRECIO = parseInt(formularioRollsRoyce['Precio-RollsRoyce'].value);
        const FECHA_FABRICACION = formularioRollsRoyce['FechaFabricacion-RollsRoyce'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevoRollsRoyceRef = await addDoc(collection(db, 'RollsRoyces'), {
                Modelo: MODELO,
                Año: AÑO,
                Color: COLOR,
                Precio: PRECIO,
                FechaFabricacion: FECHA_FABRICACION
            });

            // Muestra un mensaje si todo sale bien
            alert(`El Rolls Royce modelo ${MODELO} ha sido registrado exitosamente`);

            // Limpia el formulario
            formularioRollsRoyce.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar el Rolls Royce:', 'noValido');
        }
    });
});

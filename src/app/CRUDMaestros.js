import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const RollsRoyces = document.querySelector('.RollsRoyces');
const FormularioActualizarRollsRoyce = document.querySelector('#Formulario-ActualizarRollsRoyce');

const obtenerRollsRoyce = (id) => getDoc(doc(db, 'RollsRoyces', id));

let id = '';

// Nueva función para actualizar RollsRoyce
const actualizarRollsRoyce = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'RollsRoyces', id), nuevosValores);
        alert('Rolls Royce actualizado correctamente');
    } catch (error) {
        alert('Error al actualizar el Rolls Royce', 'error');
    }
};

export const MostrarListaRollsRoyces = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const RollsRoyce = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> Modelo del Rolls Royce: ${RollsRoyce.Modelo} </h5>
                    <p> Año: ${RollsRoyce.Año} </p>
                    <p> Color: ${RollsRoyce.Color} </p>
                    <p> Precio: ${RollsRoyce.Precio} </p>
                    <p> Fecha de Fabricación: ${RollsRoyce.FechaFabricacion} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-RollsRoyce" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-outline-success w-100 mb-2 botoneSinSesion Actualizar-RollsRoyce" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarRollsRoyce"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        RollsRoyces.innerHTML = html;

        const BotonesEliminar = RollsRoyces.querySelectorAll('.Eliminar-RollsRoyce');

        // ELIMINAR ROLLS ROYCES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'RollsRoyces', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar el Rolls Royce:', 'error');
                }
            });
        });

        const BotonesActualizar = RollsRoyces.querySelectorAll('.Actualizar-RollsRoyce');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerRollsRoyce(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const MODELO = FormularioActualizarRollsRoyce['Actualizar-Modelo'];
                const AÑO = FormularioActualizarRollsRoyce['Actualizar-Año'];
                const COLOR = FormularioActualizarRollsRoyce['Actualizar-Color'];
                const PRECIO = FormularioActualizarRollsRoyce['Actualizar-Precio'];
                const FECHA_FABRICACION = FormularioActualizarRollsRoyce['Actualizar-FechaFabricacion'];

                MODELO.value = DATOSDOCUMENTO.Modelo;
                AÑO.value = DATOSDOCUMENTO.Año;
                COLOR.value = DATOSDOCUMENTO.Color;
                PRECIO.value = DATOSDOCUMENTO.Precio;
                FECHA_FABRICACION.value = DATOSDOCUMENTO.FechaFabricacion;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar el Rolls Royce al enviar el formulario
        FormularioActualizarRollsRoyce.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const MODELO = FormularioActualizarRollsRoyce['Actualizar-Modelo'].value;
                const AÑO = FormularioActualizarRollsRoyce['Actualizar-Año'].value;
                const COLOR = FormularioActualizarRollsRoyce['Actualizar-Color'].value;
                const PRECIO = FormularioActualizarRollsRoyce['Actualizar-Precio'].value;
                const FECHA_FABRICACION = FormularioActualizarRollsRoyce['Actualizar-FechaFabricacion'].value;

                await actualizarRollsRoyce(id, {
                    Modelo: MODELO,
                    Año: AÑO,
                    Color: COLOR,
                    Precio: PRECIO,
                    FechaFabricacion: FECHA_FABRICACION,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarRollsRoyce');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        RollsRoyces.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};

import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Soldados = document.querySelector('.Soldados');
const FormularioActualizarSoldado = document.querySelector('#Formulario-ActualizarSoldado');

const obtenerSoldado = (id) => getDoc(doc(db, 'Soldados', id));

let id = '';

// Nueva función para actualizar soldado
const actualizarSoldado = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Soldados', id), nuevosValores);
        alert('Soldado actualizado correctamente');
    } catch (error) {
        alert('Error al actualizar el soldado', 'error');
    }
};

export const MostrarListaSoldados = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Soldado = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> Nombre del soldado: ${Soldado.Nombre} </h5>
                    <p> Rango: ${Soldado.Rango} </p>
                    <p> Especialidad: ${Soldado.Especialidad} </p>
                    <p> Unidad: ${Soldado.Unidad} </p>
                    <p> Fecha de Incorporación: ${Soldado.FechaIncorporacion} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-Soldado" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-outline-success w-100 mb-2 botoneSinSesion Actualizar-Soldado" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarSoldado"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Soldados.innerHTML = html;

        const BotonesEliminar = Soldados.querySelectorAll('.Eliminar-Soldado');

        // ELIMINAR SOLDADOS
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Soldados', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar el soldado:', 'error');
                }
            });
        });

        const BotonesActualizar = Soldados.querySelectorAll('.Actualizar-Soldado');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerSoldado(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarSoldado['Actualizar-Nombre'];
                const RANGO = FormularioActualizarSoldado['Actualizar-Rango'];
                const ESPECIALIDAD = FormularioActualizarSoldado['Actualizar-Especialidad'];
                const UNIDAD = FormularioActualizarSoldado['Actualizar-Unidad'];
                const FECHA_INCORPORACION = FormularioActualizarSoldado['Actualizar-FechaIncorporacion'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                RANGO.value = DATOSDOCUMENTO.Rango;
                ESPECIALIDAD.value = DATOSDOCUMENTO.Especialidad;
                UNIDAD.value = DATOSDOCUMENTO.Unidad;
                FECHA_INCORPORACION.value = DATOSDOCUMENTO.FechaIncorporacion;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar el soldado al enviar el formulario
        FormularioActualizarSoldado.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarSoldado['Actualizar-Nombre'].value;
                const RANGO = FormularioActualizarSoldado['Actualizar-Rango'].value;
                const ESPECIALIDAD = FormularioActualizarSoldado['Actualizar-Especialidad'].value;
                const UNIDAD = FormularioActualizarSoldado['Actualizar-Unidad'].value;
                const FECHA_INCORPORACION = FormularioActualizarSoldado['Actualizar-FechaIncorporacion'].value;

                await actualizarSoldado(id, {
                    Nombre: NOMBRE,
                    Rango: RANGO,
                    Especialidad: ESPECIALIDAD,
                    Unidad: UNIDAD,
                    FechaIncorporacion: FECHA_INCORPORACION,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarSoldado');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        Soldados.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};

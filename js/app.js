// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


// Expresión regular del email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();
function eventListeners() {

	// Cúando la app arranca
	document.addEventListener('DOMContentLoaded', iniciarApp);

	// Campos del formulario
	email.addEventListener('blur', validarFormulario);
	asunto.addEventListener('blur', validarFormulario);
	mensaje.addEventListener('blur', validarFormulario);

	// Reinicia el formulario
	btnReset.addEventListener('click', resetearFormulario);

	// Enviar emaul
	formulario.addEventListener('submit', enviarEmail);
}


// Fuciones

function iniciarApp() {
	btnEnviar.disabled = true;
	btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');

}

function validarFormulario(e) {

	if (e.target.value.length > 0) {
		// Comprobamos que haya texto


		// elimina los errores
		const error = document.querySelector('p.error');

		if (error) {
			error.remove();
		}

		e.target.classList.remove('border', 'border-red-500');
		e.target.classList.add('border', 'border-green-500', 'opacity-50');

	} else {
		e.target.classList.remove('border', 'border-green-500');
		e.target.classList.add('border', 'border-red-500');
		mostrarError('Todos los campos son obligatorios');
	}

	if (e.target.type === 'email') {



		if (er.test(e.target.value)) {
			const error = document.querySelector('p.error');
			if (error) {
				error.remove();
			}
		} else {
			mostrarError('Email no válido');
		}
	}

	if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
		btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
		btnEnviar.disabled = false;
	}
}

function mostrarError(mensaje) {

	const mensajeError = document.createElement('p');
	mensajeError.textContent = mensaje
	mensajeError.classList.add('border', 'border-red-500', 'bg-red-200', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

	const errores = document.querySelectorAll('.error');

	if (errores.length === 0) {
		formulario.appendChild(mensajeError);
		// formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
	}


}

// Envia el email
function enviarEmail(e) {
	e.preventDefault();

	// mostrar el spinner
	const spinner = document.querySelector('#spinner');
	spinner.style.display = 'flex';
	// Después de 3 segundos ocultar el spinner y mostrar el mensaje
	setTimeout(() => {
		spinner.style.display = 'none';

		// Mensaje que dice que se envió correctamente
		const parrafo = document.createElement('p');
		parrafo.textContent = 'El mensaje se envió correctamente';
		parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

		// inserta el parrafo antes del spinner
		formulario.insertBefore(parrafo, spinner);

		setTimeout(() => {
			parrafo.remove(); // eliminar el mensaje de exito
			resetearFormulario();
		}, 5000);
	}, 3000);
}

// funcion que resetea el formulario
function resetearFormulario() {
	formulario.reset();

	// llamamos a iniciarapp para que se deshabilite el boton
	iniciarApp();
}
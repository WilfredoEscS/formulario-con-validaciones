export function valida(input) {
  /* recibe el input al salir de foco (blur) */
  const tipoDeInput = input.dataset.tipo;
  /* identifica el tipo de input asignado */
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  /* Comprueba si el valor del campo es valido o no */
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo de nombre no puede estar vacío",
  },
  email: {
    valueMissing: "El campo de email no puede estar vacío",
    typeMismatch: "El correo no es valido",
  },
  contraseña: {
    valueMissing: "El campo de contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, maximo 12, debe contener una letra minúscula,una letra mayúscula, un numero y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "El campo de fecha de nacimiento no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },
  telefono: {
    valueMissing: "El campo de número telefónico no puede estar vacío",
    patternMismatch: "El formato requerido es ########",
  },
  direccion: {
    valueMissing: "El campo de dirección no puede estar vacío",
    patternMismatch: "La dirección debe tener entre 10 a 40 caracteres",
  },
  ciudad: {
    valueMissing: "El campo de ciudad no puede estar vacío",
    patternMismatch: "La dirección debe tener entre 10 a 40 caracteres",
  },
  estado: {
    valueMissing: "El campo de estado no puede estar vacío",
    patternMismatch: "La dirección debe tener entre 10 a 40 caracteres",
  },
};

/* procesa el tipo de input de fecha de nacimiento */
const validadores = {
  nacimiento: (input) => validarNacimento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      /* Muestra el error del campo */
      console.log(error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      /* muestra el mensaje asignado al error */
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!validarEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function validarEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}

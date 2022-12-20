import { valida } from "./validaciones.js";

/* Selecciona todos los inputs del HTML */
const inputs = document.querySelectorAll("input");

/* Agrega el evento blur  */
inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    /* llama la funcion */
    valida(input.target);
  });
});

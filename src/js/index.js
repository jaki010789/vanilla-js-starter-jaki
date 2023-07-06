import { agregarLista, imprimirTareas } from "./module.js";

const addBtn = document.querySelector(".btn-agregar");
addBtn.addEventListener("click", agregarLista);

document.addEventListener("DOMContentLoaded", imprimirTareas)
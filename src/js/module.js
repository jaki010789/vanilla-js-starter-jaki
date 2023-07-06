// Inserte el código aquí
import { post, get, borrar, put } from "./API.js";

const input = document.querySelector("#input");
const ol = document.querySelector("ol");
const vacio = document.querySelector(".vacio");
const contador = document.querySelector("#contador");

let agregarLista = async (evento) => {
  evento.preventDefault();
  const text = input.value;

  if (text !== "" && text.trim()) {
    let task = {
      task: text,
      checked: false,
    };

    let respuesta = await post(task);
    console.log({ respuesta });
    crearTareas(respuesta.id, respuesta.task, respuesta.checked);

    input.value = "";
    vacio.style.display = "none";
  } else {
    Swal.fire(

      'Ingresaste una tarea vacía',
      '',
      'error'
    );
  }
};

function crearTareas(id, text, checked) {
  const li = document.createElement("li");
  li.id = id;

  li.className = "list";
  const ptext = document.createElement("ptext");

  ptext.textContent = text;
  ol.appendChild(li);
  li.appendChild(BtnCheck(id, checked));
  li.appendChild(ptext);
  li.appendChild(BtnBorrar());
  vacio.style.display = "none";
}

async function imprimirTareas() {
  let tareas = await get();
  let auxiliarContador = 0;

  tareas.forEach((tarea) => {
    crearTareas(tarea.id, tarea.task, tarea.checked);
  });

  for (let index = 0; index < tareas.length; index++) {
    if (tareas[index].checked == true) {
      auxiliarContador++;
    }
  }

  contador.textContent = auxiliarContador;
}
function BtnBorrar() {
  const delBtn = document.createElement("i");

  delBtn.textContent = "";

  delBtn.className = "fa-solid fa-trash-can i";

  delBtn.addEventListener("click", async (e) => {
    const item = e.target.parentElement;

    console.log(item);

    let check = item.querySelector("input");

    if (check.checked) {
      let cuenta = Number(contador.textContent);
      cuenta = cuenta - 1;
      contador.textContent = cuenta;
    }

    ol.removeChild(item);
    borrar(item.id);
    console.log(item.id);

    const add = document.querySelectorAll("li");
    if (add.length === 0) {
      vacio.style.display = "block";
    } else {
      vacio.style.display = "none";
    }
  });

  return delBtn;
}

function BtnCheck(id, checked) {
  let check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.className = "checkbox";
  check.checked = checked;

  check.addEventListener("click", async function () {
    if (check.checked) {
      let cuenta = Number(contador.textContent);
      cuenta = cuenta + 1;
      contador.textContent = cuenta;
      await put(id, { checked: check.checked });
    } else {
      let cuenta = Number(contador.textContent);
      cuenta = cuenta - 1;
      contador.textContent = cuenta;
      await put(id, { checked: check.checked });
    }
  });
  return check;
}

export { agregarLista, imprimirTareas };

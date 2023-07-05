// Inserte el código aquí
import { post, get, borrar } from "./API.js";

const input = document.querySelector("#input");
const ol = document.querySelector("ol");
const vacio = document.querySelector(".vacio");
const contador = document.querySelector("#contador");

let agregarLista = async (evento) => {
  evento.preventDefault();
  const text = input.value;

  if (text !== "") {
    const li = document.createElement("li");
    const ptext = document.createElement("ptext");
    ptext.textContent = text;

    let task = {
      task: text,
      checked: false,
    };

    let respuesta = await post(task);
    console.log({ respuesta });

    li.id = respuesta.id;

    li.className = "list";

    li.appendChild(BtnCheck());
    li.appendChild(ptext);
    li.appendChild(BtnBorrar());
    ol.appendChild(li);
    input.value = "";
    vacio.style.display = "none";
  } else {
    alert("Ingrese un texto");
  }
};

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

    await borrar(item.id);
    ol.removeChild(item);
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

function BtnCheck() {
  let check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.className = "checkbox";
  check.checked = false;

  check.addEventListener("click", function () {
    if (check.checked) {
      let cuenta = Number(contador.textContent);
      cuenta = cuenta + 1;
      contador.textContent = cuenta;
    } else {
      let cuenta = Number(contador.textContent);
      cuenta = cuenta - 1;
      contador.textContent = cuenta;
    }
  });
  return check;
}

export { agregarLista };

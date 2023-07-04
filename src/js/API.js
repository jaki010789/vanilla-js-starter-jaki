// async function post() {
//   const text = await fetch("http://localhost:3000/api/task");
//   const data = await text.json();

//   console.log(data);
// }

function post(text) {
  fetch("http://localhost:3000/api/task/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //   body: JSON.stringify({ id: text }),
    body: JSON.stringify({text}),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)));
}

function borrar(id) {
  fetch("http://localhost:3000/api/task/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(id),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)));
}

export { post };
export { borrar };

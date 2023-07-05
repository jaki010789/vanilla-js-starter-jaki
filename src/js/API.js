async function configuration(metodo, data) {
  return {
    method: metodo,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}

async function post(text) {
  let response = await fetch("http://localhost:3000/api/task/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...text }),
  });
  return await response.json();
}

async function get() {
  const response = await fetch(
    "http://localhost:3000/api/task",
    configuration("GET")
  );
  const tasks = await response.json();
  return tasks;
}

async function borrar(id) {
  fetch("http://localhost:3000/api/task/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
}



export { post, get, borrar };

const URL = "http://localhost:3001/tasks/";

const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  getAll: () => {
    return fetch(URL).then((response) => response.json());
  },

  add: (task) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    }).then((response) => response.json());
  },

  delete: (id) => {
    return fetch(`${URL}${id}`, {
      method: "DELETE",
    });
  },

  //Промисы здесь гарантируют синхронизацию с сервером:
  //Мы ждем реального ответа от сервера по каждой задаче.
  //Мы обновляем интерфейс (setTasks([])) только тогда,
  // когда уверены, что в базе данных действительно ничего не осталось.
  //   «Жди, пока ВСЕ запросы из массива успешно завершатся на сервере. И только после этого переходи к .then()».
  deleteAll: (tasks) => {
    return Promise.all(tasks.map(({ id }) => tasksAPI.delete(id)));
  },

  toggleComplete: (id, isDone) => {
    return fetch(`${URL}${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone }), //Оберните isDone в объект с нужным ключом (например, { isDone } или { isDone: isDone }):
    });
  },
};

export default tasksAPI;

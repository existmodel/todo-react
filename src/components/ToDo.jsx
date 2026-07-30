import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import ToDoList from "./ToDoList";

const ToDo = () => {
  const tasks = [
    { id: "task-1", title: "Купить молоко", isDone: false },
    { id: "task-2", title: "Купить хлеб", isDone: true },
  ];

  const deleteAllTasks = () => {
    console.log("delete");
  };

  const deleteTask = (taskId) => {
    console.log(`deleteTask c id ${taskId}`);
  };

  const toogleTaskComplete = (taskId, isDone) => {
    console.log(`Task${taskId} ${isDone ? "done" : "not done"}`);
  };

  const filterTasks = (query) => {
    console.log(`Поиск ${query}`);
  };

  const addTask = () => {
    console.log("Add Task");
  };

  return (
    <div className="todo">
      {/*выводим компонент*/}

      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm addTask={addTask} />
      <SearchTaskForm onSearchInput={filterTasks} />

      {/*tasks.filter(...) — метод массивов .filter() создает новый массив, в который попадут только те задачи, которые пройдут проверку 
      (вернут true внутри функции).
({isDone}) => ... — это стрелочная функция, которая принимает каждый элемент массива (task). 
Вместо того чтобы писать task.isDone, здесь используется деструктуризация: из объекта задачи сразу «вытаскивается» свойство isDone.
=> isDone — это условие фильтрации. Так как в isDone уже лежит булево значение (true или false), мы можем просто его вернуть. 

Если у задачи isDone: true, она остается в новом массиве. Если false — отбрасывается.

.length — в самом конце мы берем длину этого нового, отфильтрованного массива (где остались только выполненные задачи).*/}
      <ToDoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length} //фильтрует задачи на выполненность если isDone true то попадает в массив и длина массива и есть число
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <ToDoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toogleTaskComplete}
      />
    </div>
  );
};

export default ToDo;

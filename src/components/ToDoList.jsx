import ToDoItem from "./ToDoItem";
import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

const ToDoList = () => {
  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0; //Optional Chaining).Этот оператор нужен для безопасного доступа к свойствам объекта, который в данный момент может быть равен null или undefined.

  if (!hasTasks) {
    return <div className="todo__empty-message">There are no tasks yet</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Tasks not found</div>;
  }
  return (
    <ul className="todo__list">
      {/*props параметры*/}
      {/* <ToDoItem
        className="todo__item"
        id="task-1"
        title="Купить молоко"
        isDone={false}
      />

      <ToDoItem className="todo__item" id="task-2" title="Купить хлеб" isDone /> */}

      {/*На выходе из map будет массив React-элементов (виртуальных узлов), созданных на основе вашего списка данных tasks*/}
      {(filteredTasks ?? tasks).map((task) => (
        <ToDoItem className="todo__item" key={task.id} {...task} />
      ))}
    </ul>
  );
};

export default ToDoList;

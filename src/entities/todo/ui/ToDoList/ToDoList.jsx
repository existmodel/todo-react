import { useContext } from "react";
import { ToDoItem, TasksContext } from "@/entities/todo";
// import { TasksContext } from "@/entities/todo/model/TasksContext";

const ToDoList = (props) => {
  const { styles } = props;
  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0; //Optional Chaining).Этот оператор нужен для безопасного доступа к свойствам объекта, который в данный момент может быть равен null или undefined.

  if (!hasTasks) {
    return <div className={styles.emptyMessage}>There are no tasks yet</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Tasks not found</div>;
  }
  return (
    <ul className={styles.list}>
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
        <ToDoItem className={styles.item} key={task.id} {...task} />
      ))}
    </ul>
  );
};

export default ToDoList;

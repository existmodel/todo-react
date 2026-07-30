import ToDoItem from "./ToDoItem";

const ToDoList = (props) => {
  const { tasks = [], onDeleteTaskButtonClick, onTaskCompleteChange } = props;
  const hasTasks = true;

  if (!hasTasks) {
    return <div className="todo__empty-message"></div>;
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
      {tasks.map((task) => (
        <ToDoItem
          className="todo__item"
          key={task.id}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
          {...task}
        />
      ))}
    </ul>
  );
};

export default ToDoList;

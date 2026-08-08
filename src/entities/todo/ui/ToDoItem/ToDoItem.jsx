import { memo, useContext } from "react";
import { TasksContext } from "@/entities/todo";
import RouterLink from "@/shared/ui/RouterLink";
import styles from "./ToDoItem.module.scss";
import { highlightCaseInsensitive } from "../../../../shared/utils/highlight";
// import { useRef } from "react";

const ToDoItem = (props) => {
  const { className = "", id, title, isDone } = props;
  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toggleTaskComplete,
    disappearingTaskId,
    appearingTaskId,
    searchQuery,
  } = useContext(TasksContext);

  //для регистра при поиске тасков

  const highlightedTitle = highlightCaseInsensitive(title, searchQuery);

  //Этот код создаёт объединение двух React-рефов (firstIncompleteTaskRef и animationRef) в один combinedRef,
  // который можно передать в JSX-элемент через проп ref.
  //В контексте React ref (ссылка) — это специальный объект, который хранит прямую ссылку на DOM-элемент или любое другое значение, сохраняющееся между рендерами.

  return (
    <li
      className={`
        ${styles.todoItem} 
        ${className} 
        ${disappearingTaskId === id ? styles.isDisappearing : ""}
        ${appearingTaskId === id ? styles.isAppearing : ""}`}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
    >
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={isDone}
        onChange={({ target }) => {
          toggleTaskComplete(id, target.checked); //деструктурируем target сразу из event который получаем из события change
        }}
      />
      <label className={`${styles.label} visually-hidden `} htmlFor={id}>
        {title}
      </label>
      <RouterLink to={`/tasks/${id}`} aria-label="Task detail page">
        <span dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
      </RouterLink>

      <button
        className={styles.deleteButton}
        aria-label="Delete"
        title="Delete"
        onClick={() => deleteTask(id)} //нужно вызвать функцию передав ей id
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </li>
  );
};

export default memo(ToDoItem);

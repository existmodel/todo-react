import { useContext } from "react";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import SearchTaskForm from "../SearchTaskForm/SearchTaskForm";
import ToDoInfo from "../ToDoInfo/ToDoInfo";
import ToDoList from "../ToDoList/ToDoList";
import Button from "../Button/Button";
import { TasksContext } from "../../context/TasksContext";
import styles from "./Todo.module.scss";

const ToDo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);
  return (
    <div className={styles.todo}>
      {/*выводим компонент*/}
      <h1 className={styles.title}>To Do List</h1>
      <AddTaskForm styles={styles} />
      <SearchTaskForm styles={styles} />
      <ToDoInfo styles={styles} />

      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({
            behavior: "smooth",
          })
        }
      >
        Show first incomplete task
      </Button>
      <ToDoList styles={styles} />
    </div>
  );
};

export default ToDo;

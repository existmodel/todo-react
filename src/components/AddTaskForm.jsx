import Field from "./Field";
import Button from "./Button";
import { useContext } from "react";
import { TasksProvider, TasksContext } from "../context/TasksContext";

const AddTaskForm = () => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
    useContext(TasksContext);

  const onSubmit = (event) => {
    event.preventDefault();
    addTask();
  };
  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        className="todo__field"
        label="New Task Title"
        id="new-task"
        value={newTaskTitle}
        onInput={(event) => setNewTaskTitle(event.target.value)}
        ref={newTaskInputRef}
      />
      {/*Add попадает в children*/}
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddTaskForm;

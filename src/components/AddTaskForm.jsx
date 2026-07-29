import Field from "./Field";
import Button from "./Button";

const AddTaskForm = () => {
  return (
    <form className="todo__form">
      <Field className="todo__field" label="New Task Title" id="new-task" />
      {/*Add попадает в children*/}
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddTaskForm;

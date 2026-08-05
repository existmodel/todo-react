import { TasksProvider } from "../context/TasksContext";
import Todo from "../components/ToDo";

const TasksPage = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};

export default TasksPage;

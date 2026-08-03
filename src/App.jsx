import ToDo from "./components/ToDo";
import { TasksProvider } from "./context/TasksContext";

const App = () => {
  console.log("App");
  return (
    <TasksProvider>
      <ToDo />;
    </TasksProvider>
  );
};

export default App;

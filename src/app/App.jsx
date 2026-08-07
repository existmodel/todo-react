import Router from "./routing/Router";
import TaskPage from "@/pages/TaskPage";
import TasksPage from "@/pages/TasksPage";
import "./styles";

const App = () => {
  const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
    "*": () => <div>404 Page not found</div>,
  };
  console.log("Страницы в App:", { TasksPage, TaskPage, Router });
  return <Router routes={routes} />;
};

export default App;

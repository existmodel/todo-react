const useTasksLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");

  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); //делаем каждый раз когда список задач меняется и при первом рендере}
  };
  return {
    savedTasks: savedTasks ? JSON.parse(savedTasks) : null,
    saveTasks,
  };
};
export default useTasksLocalStorage;

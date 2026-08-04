import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
  const { savedTasks, saveTasks } = useTasksLocalStorage();
  const [tasks, setTasks] = useState(
    savedTasks ?? [
      { id: "task-1", title: "Купить молоко", isDone: false },
      { id: "task-2", title: "Купить хлеб", isDone: true },
    ],
  );

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
      setTasks([]); //если да то пустой массив очищаем список задач/обнуляем текущий STATE
    }
  }, []);

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId)); //создаем новый массив без элемента с пришедшим id
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      setTasks(
        tasks.map((task) => {
          //перебираем массив задач если id совпадает то возвращаем новый обьект задач в котором изменяем только поле isDone
          if (task.id === taskId) {
            return { ...task, isDone };
          }

          return task; //для всех остальных задач возвращаем их без изменений
        }),
      );
    },
    [tasks],
  );

  const addTask = useCallback((title) => {
    //Функция проверяет, что текст не пустой, создает объект новой задачи newTask и добавляет его в список всех задач
    const newTask = {
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title: title,
      isDone: false,
    };
    setTasks((prevState) => [...prevState, newTask]);
    setNewTaskTitle(""); //"" чтобы очистить поле ввода (инпут)

    setSearchQuery(""); //сброс поиска
    newTaskInputRef.current.focus();
  }, []);

  useEffect(() => {
    // localStorage.setItem("tasks", JSON.stringify(tasks)); //делаем каждый раз когда список задач меняется и при первом рендере
    saveTasks(tasks);
  }, [tasks]); //следим за изменениями в tasks

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, []);

  //   СЧЕТЧИК
  //   const renderCount = useRef(0);

  //   useEffect(() => {
  //     renderCount.current++;
  //     console.log(`Component TODO  rendered ${renderCount.current} counts`); //чтобы реагировать на каждый рендер не ставим второй аргумент (массив)
  //   });

  //ФИЛЬТРАЦИЯ ЗАДАЧ ПО ВВОДУ ИЗ ПОИСКА
  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null; //если поиск не активен или там пробелы то будет null
  }, [tasks, searchQuery]);

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,

    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  };
};

export default useTasks;

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import tasksAPI from "@/shared/api/tasks/index";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => setTasks([]));
    }
  }, [tasks]);

  const deleteTask = useCallback(
    (taskId) => {
      tasksAPI.delete(taskId).then(() => {
        setDisappearingTaskId(taskId);
        setTimeout(
          () => {
            setTasks(tasks.filter((task) => task.id !== taskId));
            setDisappearingTaskId(null); //сброс id удаляемой задачи
          },
          400, //создаем новый массив без элемента с пришедшим id)
        );
      });
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      tasksAPI.toggleComplete(taskId, isDone).then(() => {
        setTasks(
          tasks.map((task) => {
            //перебираем массив задач если id совпадает то возвращаем новый обьект задач в котором изменяем только поле isDone
            if (task.id === taskId) {
              return { ...task, isDone };
            }

            return task; //для всех остальных задач возвращаем их без изменений
          }),
        );
      });
    },
    [tasks],
  );

  const addTask = useCallback((title) => {
    //Функция проверяет, что текст не пустой, создает объект новой задачи newTask и добавляет его в список всех задач
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      setTasks((prevState) => [...prevState, addedTask]);
      setNewTaskTitle(""); //"" чтобы очистить поле ввода (инпут)

      setSearchQuery(""); //сброс поиска
      newTaskInputRef.current.focus();
      setAppearingTaskId(addedTask.id);
      setTimeout(() => {
        setAppearingTaskId(null);
      }, 400);
    });
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();

    tasksAPI.getAll().then(setTasks);
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
    disappearingTaskId,
    appearingTaskId,
  };
};

export default useTasks;

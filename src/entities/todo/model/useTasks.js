import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import tasksAPI from "@/shared/api/tasks/index";

//Оператор switch...case — это управляющая конструкция в программировании (JavaScript, C++, C#, Java, PHP и др.), которая
// сравнивает одно выражение с несколькими возможными значениями и выполняет соответствующий блок кода.
const tasksReducer = (state, action) => {
  //action — это JavaScript-объект, передающий данные для изменения состояния
  //state  — это текущий массив задач.
  switch (action.type) {
    case "SET_ALL": {
      return Array.isArray(action.tasks) ? action.tasks : state;
    }
    case "ADD": {
      return [...state, action.task];
    }
    case "TOGGLE_COMPLETE": {
      const { id, isDone } = action;

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task;
      });
    }
    case "DELETE": {
      return state.filter((task) => task.id !== action.id);
    }
    case "DELETE_ALL": {
      return [];
    }
    default: {
      return state;
    }
  }
};

const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => dispatch({ type: "DELETE_ALL" }));
    }
  }, [tasks]);

  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId).then(() => {
      setDisappearingTaskId(taskId);
      setTimeout(
        () => {
          dispatch({ type: "DELETE", id: taskId });
          setDisappearingTaskId(null); //сброс id удаляемой задачи
        },
        400, //создаем новый массив без элемента с пришедшим id)
      );
    });
  }, []);

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI.toggleComplete(taskId, isDone).then(() => {
      dispatch({ type: "TOGGLE_COMPLETE", id: taskId });
    });
  }, []);

  const addTask = useCallback((title) => {
    //Функция проверяет, что текст не пустой, создает объект новой задачи newTask и добавляет его в список всех задач
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      dispatch({ type: "ADD", task: addedTask });
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

    tasksAPI.getAll().then((serverTasks) => {
      dispatch({ type: "SET_ALL", tasks: serverTasks });
    });
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

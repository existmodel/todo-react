import { useState, useEffect, useRef } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import ToDoList from "./ToDoList";
import Button from "./Button";

const ToDo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      { id: "task-1", title: "Купить молоко", isDone: false },
      { id: "task-2", title: "Купить хлеб", isDone: true },
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id; //находим 1 невыполненную задачу(во время рендера только один эдемент получит ref и реакт присвоит ссылку)

  const deleteAllTasks = () => {
    const isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
      setTasks([]); //если да то пустой массив очищаем список задач/обнуляем текущий STATE
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId)); //создаем новый массив без элемента с пришедшим id
  };

  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        //перебираем массив задач если id совпадает то возвращаем новый обьект задач в котором изменяем только поле isDone
        if (task.id === taskId) {
          return { ...task, isDone };
        }

        return task; //для всех остальных задач возвращаем их без изменений
      }),
    );
  };

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      //Функция проверяет, что текст не пустой, создает объект новой задачи newTask и добавляет его в список всех задач
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle(""); //"" чтобы очистить поле ввода (инпут)

      setSearchQuery(""); //сброс поиска
      newTaskInputRef.current.focus();
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); //делаем каждый раз когда список задач меняется и при первом рендере
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

  const clearSearchQuery = searchQuery.trim().toLowerCase();
  //ФИЛЬТРАЦИЯ ЗАДАЧ ПО ВВОДУ ИЗ ПОИСКА
  const filteredTasks =
    clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null; //если поиск не активен или там пробелы то будет null
  return (
    <div className="todo">
      {/*выводим компонент*/}
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {/*tasks.filter(...) — метод массивов .filter() создает новый массив, в который попадут только те задачи, которые пройдут проверку 
      (вернут true внутри функции).
({isDone}) => ... — это стрелочная функция, которая принимает каждый элемент массива (task). 
Вместо того чтобы писать task.isDone, здесь используется деструктуризация: из объекта задачи сразу «вытаскивается» свойство isDone.
=> isDone — это условие фильтрации. Так как в isDone уже лежит булево значение (true или false), мы можем просто его вернуть. 

Если у задачи isDone: true, она остается в новом массиве. Если false — отбрасывается.

.length — в самом конце мы берем длину этого нового, отфильтрованного массива (где остались только выполненные задачи).*/}
      <ToDoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length} //фильтрует задачи на выполненность если isDone true то попадает в массив и длина массива и есть число
        onDeleteAllButtonClick={deleteAllTasks}
      />

      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Show first incomplete task
      </Button>
      <ToDoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        firstIncompleteTaskId={firstIncompleteTaskId}
      />
    </div>
  );
};

export default ToDo;

import { useEffect, useState } from "react";
import tasksAPI from "../api/tasksAPI";

const TaskPage = (props) => {
  const { params } = props;
  const tasksId = params.id;

  const [task, setTask] = useState(null); //храним данные о задаче
  const [isLoading, setIsLoading] = useState(true); //статус загрузки
  const [hasError, setHasError] = useState(false);

  //useEffect отвечает за загрузку данных конкретной задачи с сервера
  //useEffect(...) — специальный React-хук для работы с побочными эффектами (side-effects): запросами к API, подписками на события и т.д.
  useEffect(() => {
    tasksAPI
      .getById(tasksId)
      .then((taskData) => {
        setTask(taskData); //сохраняет полученные данные задачи в локальное состояние (state) компонента.
        setHasError(false); //сбрасывает флаг ошибки в false (на случай, если ранее была ошибка).
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false); //сбрасывает флаг ошибки в false (на случай, если ранее была ошибка).
      });
  }, [tasksId]); //запрос к серверу по конкретной задаче по id
  //[] (пустой массив зависимостей в конце) — указывает React выполнять этот эффект строго один раз при создании
  // (монтировании) компонента в DOM (аналог componentDidMount в классовых компонентах).

  //если запрос к серверу не завершился то будем выводить сообщение
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.isDone ? "Task completed" : "Task not completed"}</p>
    </div>
  );
};

export default TaskPage;

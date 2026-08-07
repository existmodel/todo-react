import { useEffect, useState } from "react";
// import TaskPage from "../../pages/TaskPage/TaskPage";
// import App from "../App";

const matchPath = (path, route) => {
  const pathParts = path.split("/"); //'/tasks/123' => ['','tasks','123']
  const routePaths = route.split("/"); //'/tasks/:id' => ['','tasks',':id']

  if (routePaths.length !== pathParts.length) {
    return null;
  }

  const params = {};

  for (let i = 0; i < routePaths.length; i++) {
    if (routePaths[i].startsWith(":")) {
      const paramName = routePaths[i].slice(1);

      params[paramName] = pathParts[i];
    } else if (routePaths[i] !== pathParts[i]) {
      return null;
    }
  }

  return params; //если путь подходит под шаблон то возвразаем params/если нет то null
};

export const useRouter = () => {
  const [path, setPath] = useState(window.location.pathname); //Этот window.locationобъект можно использовать для получения адреса текущей страницы (URL) и для перенаправления браузера на новую страницу.

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", onLocationChange); //Событие popstate интерфейса Windowсрабатывает, когда активная запись истории изменяется во время навигации пользователя по истории сессии.
    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return path;
};

// динамический

//Этот компонент выполняет главную задачу любого роутера в React:
// сопоставляет текущий URL браузера с нужным компонентом страницы и передает в него параметры из адреса.
const Router = (props) => {
  const { routes } = props; //в routes будут пути с соответсвуюзими компонентами страниц// 1. Извлекаем объект с конфигурацией роутов
  const path = useRouter(); //через хук получаем актуальный путь// 2. Получаем текущий адрес страницы (например, "/tasks/123")
  console.log(routes);
  // 3. Перебираем все зарегистрированные маршруты из объекта routes
  for (const route in routes) {
    const params = matchPath(path, route); // 4. Проверяем, совпадает ли текущий path с шаблоном route (например, "/tasks/:id")

    // 5. Если совпадение найдено (matchPath вернул объект с параметрами, например { id: "123" })
    if (params) {
      const Page = routes[route]; // Достаем соответствующий компонент страницы
      // Возвращаем этот компонент и пробрасываем в него найденные параметры
      return <Page params={params} />;
    }
  }
  // 6. Если ни один маршрут не подошел, ищем запасной компонент для ошибки 404
  const NotFound = routes["*"];

  // 7. Отрисовываем страницу 404
  return <NotFound />;

  //не дикамический
  //   const Page = routes[path] ?? routes["*"]; //если путь не описать в роутиге то делаем ссылку на компонент страницы 404
  //выше храниться сущность с компонентом нужной страницы

  //   if (path.startsWith("/tasks/")) {
  //     const id = path.replace("/tasks/", "");
  //     const TaskPage = routes["/tasks/:id"]; //Двоеточие (:) используется в роутинге для обозначения динамического параметра (переменной в пути).
  //     // Оно указывает роутеру: «На этом месте может быть любое значение, не воспринимай :id как буквальный текст».

  //     return <TaskPage params={{ id }} />;
  //   }
  //   return <Page />; //возвращаем разметку
};

export default Router;

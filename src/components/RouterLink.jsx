// Этот компонент нужен для того,
// чтобы сделать собственную базовую ссылку для навигации без перезагрузки страницы (Single Page Application, или SPA).

const RouterLink = (props) => {
  const { to, children, ...rest } = props;

  const handleClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", to); //Метод window.history.pushState() — это стандартный API браузера (HTML5 History API),
    // который позволяет изменять URL-адрес в строке браузера без перезагрузки страницы.
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default RouterLink;

// при клике мышки отменяется бразур поведение
// вызывается пуш стейт для изменения URL страницы без перегрузки
// и вручнуб генерирует событие чтобы роутер узнал что путь измениляся и обновил состояние

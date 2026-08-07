import { memo, useContext, useMemo } from "react";
import { TasksContext } from "@/entities/todo";

const ToDoInfo = (props) => {
  const { styles } = props;
  const { tasks, deleteAllTasks } = useContext(TasksContext);
  const total = tasks.length;
  const hasTasks = total > 0;
  const done = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length;
  }, [tasks]);

  return (
    <div className={styles.info}>
      <div className={styles.totalTasks}>
        Done {done} from {total}
      </div>

      {/*условный рендеринг (conditional rendering) в React с помощью логического оператора && (И).
      Если оно ложно (false, 0, null, undefined), то оператор && сразу же останавливает работу и 
      возвращает это ложное значение. Правая часть даже не читается.
      Поскольку левая часть истинна, оператор && возвращает то, что находится справа — 
      то есть вашу JSX-разметку с кнопкой <button>...</button>.*/}
      {hasTasks && (
        <button
          className={styles.deleteAllButton}
          type="button"
          onClick={deleteAllTasks}
        >
          Delete all
        </button>
      )}
    </div>
  );
};

export default memo(ToDoInfo);

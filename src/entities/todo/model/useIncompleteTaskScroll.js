import { useRef } from "react";

const useIncompleteTaskScroll = (tasks) => {
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id; //находим 1 невыполненную задачу(во время рендера только один эдемент получит ref и реакт присвоит ссылку)

  return {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  };
};

export default useIncompleteTaskScroll;

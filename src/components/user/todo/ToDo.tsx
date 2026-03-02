import TaskButtonList from "./TaskButtonsBase";
import TaskList from "./TaskList";
export default function ToDo() {
  return (
    <div className="bg-black/25 rounded-2xl min-w-2xs max-w-2xs py-2 shadow-2xl flex flex-col items-center align-middle">
      <TaskList />
    </div>
  );
}

import TaskButtonList from "./TaskButtons";
import TaskList from "./TaskList";
export default function ToDo() {
  return (
    <div className="bg-black/25 rounded-2xl gap-3 min-w-2xs shadow-2xl flex flex-col">
      <TaskList />
      <TaskButtonList />
    </div>
  );
}

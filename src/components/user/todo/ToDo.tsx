import TaskButtonList from "./TaskButtons";
import TaskList from "./TaskList";
export default function ToDo() {
  return (
    <div className="bg-black/25 rounded-2xl min-w-2xs max-w-2xs py-2 shadow-2xl flex flex-col items-center align-middle">
      <div className="h-11/12">
        <TaskList />
      </div>
      <div className="h-1/12">
        <TaskButtonList />
      </div>
    </div>
  );
}

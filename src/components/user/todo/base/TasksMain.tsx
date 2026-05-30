"use client";
import { useState } from "react";
import {
  getTasksQuery,
  useAddTasksQuery,
  useEditTasksQuery,
  useDeleteTasksQuery,
} from "@/queries/tasks.queries";
import TaskButtonList from "./TaskButtonsBase";
import BasicTaskList from "./BasicTaskList";
export default function TasksMain() {
  const { data, isLoading } = getTasksQuery();

  const add = useAddTasksQuery();
  const edit = useEditTasksQuery();
  const del = useDeleteTasksQuery();

  const addTask = (data: any) => {
    add.mutate(data);
  };

  const editTask = (data: any) => {
    console.log("EDIT TASK DATAAAA: ", data);
    edit.mutateAsync(data);
  };

  const deleteTask = (taskId: any) => {
    del.mutateAsync(taskId);
  };

  // pagination

  const [page, setPage] = useState(1);
  const [tasksPerPage] = useState(4);

  const indexOfLastTask = page * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = (data || []).slice(indexOfFirstTask, indexOfLastTask);
  const length = (data || []).length;

  const noOfPages = Math.ceil(length / tasksPerPage);

  const paginate = (pageNumber: number) => setPage(pageNumber);

  return (
    <>
      <div className="flex-1 w-full flex flex-col bg-white/5 rounded-2xl p-2">
        <BasicTaskList
          loading={isLoading}
          tasks={currentTasks}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
      <TaskButtonList
        onAddTasks={addTask}
        tasksPerPage={tasksPerPage}
        totalPosts={length}
        currentPage={page}
        paginate={paginate}
        noOfPages={noOfPages}
      />
    </>
  );
}

import { EventCalendar } from "@mui/x-scheduler/event-calendar";
import { useMemo } from "react";
import type { CalendarEvent } from "@/lib/types/schema.types";
import { getCanvasQuery } from "@/queries/canvas.queries";
import { getTasksQuery } from "@/queries/tasks.queries";

export default function RenderMonthCalendar() {
  const { data: canvasTasks } = getCanvasQuery();
  const { data: basicTasks } = getTasksQuery();

  const calendarEvents = useMemo(() => {
    const normalizedCanvas: CalendarEvent[] = canvasTasks.map((task: any) => ({
      id: task.id,
      title: task.name,
      start: task.due,
      end: task.due,
      readOnly: true,
    }));

    const normalizedBasic: CalendarEvent[] = basicTasks.map((task: any) => ({
      id: task._id,
      title: task.name,
      start: task.dueDate,
      end: task.dueDate,
      readOnly: true,
    }));

    return [...normalizedCanvas, ...normalizedBasic];
  }, [canvasTasks, basicTasks]);

  return (
    <div style={{ height: 325, width: "100%" }} className="bg-white">
      <EventCalendar
        events={calendarEvents}
        defaultVisibleDate={new Date()}
        defaultView="month"
        views={["month"]}
        defaultPreferences={{
          isSidePanelOpen: false,
        }}
      />
    </div>
  );
}

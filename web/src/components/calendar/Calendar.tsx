import { EventCalendar } from "@mui/x-scheduler/event-calendar";
import { useMemo } from "react";
import type { CalendarEvent } from "@/lib/types/schema.types";
import { getCanvasQuery } from "@/queries/canvas.queries";
import { getTasksQuery } from "@/queries/tasks.queries";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      text: {
        primary: "#ffffff",
        secondary: "rgba(255,255,255,0.7)",
      },
      background: {
        default: "transparent",
        paper: "transparent",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ height: 368, width: "100%" }} className="[&_*]:!text-white">
        <EventCalendar
          events={calendarEvents}
          defaultVisibleDate={new Date()}
          readOnly
          defaultView="month"
          views={["month"]}
          defaultPreferences={{
            isSidePanelOpen: false,
          }}
        />
      </div>
    </ThemeProvider>
  );
}

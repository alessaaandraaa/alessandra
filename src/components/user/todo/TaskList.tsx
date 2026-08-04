"use client";
import TasksMain from "./base/TasksMain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CanvasMain from "./canvas/CanvasMain";
import { useAuthStateContext } from "@/contexts/auth.contexts";
import CanvasGuest from "./canvas/CanvasGuest";
export default function TaskList() {
  const { authState } = useAuthStateContext();
  return (
    <div className="px-4 rounded-2xl min-w-2xs flex-1 shadow-2xl flex flex-col h-full w-full">
      <p className="text-white font-bold text-2xl m-3">TO-DO</p>
      <Tabs defaultValue="canvas" className="flex-1 flex flex-col w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value="canvas"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Canvas
          </TabsTrigger>
          <TabsTrigger
            value="doable"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Base
          </TabsTrigger>
        </TabsList>
        <TabsContent value="canvas" className="flex-1 flex flex-col">
          {authState == "user" ? <CanvasMain /> : <CanvasGuest />}
        </TabsContent>
        <TabsContent value="doable" className="flex-1 flex flex-col">
          <TasksMain />
        </TabsContent>
      </Tabs>
    </div>
  );
}

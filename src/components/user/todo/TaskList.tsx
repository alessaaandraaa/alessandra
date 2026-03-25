"use client";
import DoableTasks from "./base/BaseTasks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CanvasMain from "./canvas/CanvasMain";
export default function TaskList() {
  return (
    <div className="px-4 rounded-2xl min-w-2xs flex-1 shadow-2xl flex flex-col h-full w-full">
      <p className="text-white font-bold text-2xl m-3">TO-DO</p>
      <Tabs defaultValue="canvas" className="flex-1 flex flex-col w-full">
        <TabsList className="w-full">
          <TabsTrigger value="canvas" style={{backgroundColor: "rgba(255, 255, 255)"}}>Canvas</TabsTrigger>
          <TabsTrigger value="doable" style={{backgroundColor: "rgba(255, 255, 255)"}}>Doable</TabsTrigger>
        </TabsList>
        <TabsContent value="canvas" className="flex-1 flex flex-col">
          <CanvasMain />
        </TabsContent>
        <TabsContent value="doable" className="flex-1 flex flex-col">
          <DoableTasks />
        </TabsContent>
      </Tabs>
    </div>
  );
}

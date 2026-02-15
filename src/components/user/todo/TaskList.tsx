"use client";
import DoableTasks from "./BaseTasks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CanvasTasks from "./CanvasTasks";
export default function TaskList() {
  return (
    <div className="px-4 rounded-2xl min-w-2xs flex-1 shadow-2xl flex flex-col h-full w-full">
      <p className="text-white font-bold text-2xl m-3">TO-DO</p>
      <Tabs defaultValue="canvas" className="flex-1 flex flex-col w-full">
        <TabsList className="w-full">
          <TabsTrigger value="canvas">Canvas</TabsTrigger>
          <TabsTrigger value="doable">Doable</TabsTrigger>
        </TabsList>
        <TabsContent value="canvas" className="flex-1 flex flex-col">
          <CanvasTasks />
        </TabsContent>
        <TabsContent value="doable" className="flex-1 flex flex-col">
          <DoableTasks />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import ToDo from "./user/todo/ToDo";
import Playlist from "./user/playlist/Playlist";
import ImgLinksMain from "./user/links/ImgLinksMain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RenderMonthCalendar from "./calendar/Calendar";
import { Calendar, Link } from "lucide-react";
export default function MainPanel() {
  return (
    <div className="flex gap-5 cursor-pointer group select-none justify-center w-full">
      <ToDo />
      <Tabs defaultValue="links" className="relative">
        <TabsList className="absolute -top-12 right-0 bg-transparent gap-2">
          <TabsTrigger
            value="links"
            className="bg-black/50! rounded-xl p-2 data-[state=active]:bg-black/75"
          >
            <Link className="text-white" />
          </TabsTrigger>
          <TabsTrigger
            value="calendar"
            className="bg-black/50! rounded-xl p-2 data-[state=active]:bg-black/75"
          >
            <Calendar className="text-white" />
          </TabsTrigger>
        </TabsList>
        <div className="bg-black/25 p-5 rounded-2xl min-w-2xl max-w-2xl flex flex-col">
          <TabsContent value="links" className="mt-0 h-full">
            <ImgLinksMain />
            <Playlist />
          </TabsContent>
          <TabsContent value="calendar" className="mt-0 h-full">
            <RenderMonthCalendar />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

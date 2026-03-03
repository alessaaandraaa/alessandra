import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImgLinks from "./ImgLinks";
import LinksButtons from "./TaskButtonsBase";
export default function ImgLinksMain() {
  return (
    <>
      <Tabs defaultValue="main" className="w-full">
        <TabsList>
          <TabsTrigger value="main">Main</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="main">
          <ImgLinks />
        </TabsContent>
        <TabsContent value="projects">Change your password here.</TabsContent>
      </Tabs>
      <LinksButtons />
    </>
  );
}

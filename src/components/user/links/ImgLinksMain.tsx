import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImgLinks from "./ImgLinks";
import LinksPagination from "./LinksPagination";
import { getLinksQuery } from "@/queries/links.queries";
import {
  useAddLinksQuery,
  useEditLinksQuery,
  useDeleteLinksQuery,
} from "@/queries/links.queries";
import { LinksProvider } from "@/contexts/links.contexts";

export default function ImgLinksMain() {
  /* QUERIES */
  const { data, isLoading } = getLinksQuery();

  console.log("LINKS: ", data);

  const add = useAddLinksQuery();
  const edit = useEditLinksQuery();
  const del = useDeleteLinksQuery();

  const addLink = (data: any) => {
    add.mutate(data);
  };

  const editLink = (data: any) => {
    edit.mutateAsync(data);
  };

  const deleteLink = (linkId: any) => {
    del.mutateAsync(linkId);
  };

  /* LINKS DATA */
  const safeData = data || [];
  const mainLinks = safeData.filter((d: any) => d.categories?.includes("Main"));

  const projectLinks = safeData.filter((d: any) =>
    d.categories?.includes("Projects"),
  );

  /* PAGINATION */

  const [page, setPage] = useState(1);
  const [linksPerPage] = useState(14);

  // 1. Track the active tab
  const [activeTab, setActiveTab] = useState("main");

  // 2. Determine which dataset to use based on the active tab
  const currentDataset = activeTab === "main" ? mainLinks : projectLinks;

  // 3. Pagination calculations based on the active dataset
  const indexOfLastLinks = page * linksPerPage;
  const indexOfFirstLinks = indexOfLastLinks - linksPerPage;
  const currentViewableLinks = currentDataset.slice(
    indexOfFirstLinks,
    indexOfLastLinks,
  );

  const paginate = (pageNumber: number) => setPage(pageNumber);

  // Reset page to 1 when switching tabs to avoid "empty" pages
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setPage(1);
  };

  return (
    <LinksProvider onEditLink={editLink} onDeleteLink={deleteLink}>
      <Tabs
        defaultValue="main"
        className="w-full"
        onValueChange={handleTabChange} // Update active tab state
      >
        <TabsList>
          <TabsTrigger
            value="main"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Main
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          <ImgLinks links={currentViewableLinks} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="projects">
          <ImgLinks links={currentViewableLinks} isLoading={isLoading} />
        </TabsContent>
      </Tabs>

      <LinksPagination
        tasksPerPage={linksPerPage}
        totalPosts={currentDataset.length} // Dynamically passes the length
        currentPage={page}
        paginate={paginate}
        onAddLinks={addLink}
      />
    </LinksProvider>
  );
}

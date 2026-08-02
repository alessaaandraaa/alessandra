import type { Link } from "@/lib/types";

export interface LinkRepository {
  getLinks(): Promise<Link[]>;
  addLinks(task: Link): Promise<Link>;
  editLinks(task: Link): Promise<Link>;
  deleteLinks(linkId: string): Promise<void>;
}

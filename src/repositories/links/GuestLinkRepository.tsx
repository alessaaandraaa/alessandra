import type { LinkRepository } from "./LinkRepository";
import type { Link } from "@/lib/types";

export class GuestLinkRepository implements LinkRepository {
  async getLinks() {
    return JSON.parse(localStorage.getItem("links") ?? "[]");
  }

  async addLinks(link: Link) {
    const links = await this.getLinks();
    const updated = [...links, link];

    localStorage.setItem("links", JSON.stringify(updated));

    return link;
  }

  async editLinks(link: Link) {
    const links = await this.getLinks();

    const updated = links.map((l: any) => (l._id === link._id ? link : l));

    localStorage.setItem("links", JSON.stringify(updated));

    return link;
  }

  async deleteLinks(linkId: string) {
    const links = await this.getLinks();

    const updated = links.filter((l: any) => l._id !== linkId);

    localStorage.setItem("links", JSON.stringify(updated));
  }
}

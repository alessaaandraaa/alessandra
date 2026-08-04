import axios from "axios";
import type { LinkRepository } from "./LinkRepository";
import type { Link } from "@/lib/types/schema.types";

export class UserLinkRepository implements LinkRepository {
  async getLinks() {
    const response = await axios.get(
      "https://spotify-backend-eight-pink.vercel.app/api/links",
      {
        withCredentials: true,
      },
    );
    return response.data;
  }

  async addLinks(link: Link) {
    const response = await axios.post(
      `https://spotify-backend-eight-pink.vercel.app/api/links`,
      link,
      {
        withCredentials: true,
      },
    );
    return response.data;
  }
  async editLinks(link: Link) {
    const { _id, ...rest } = link;
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/links/${_id}`,
      rest,
      {
        withCredentials: true,
      },
    );
    return data;
  }
  async deleteLinks(linkId: string) {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/links/${linkId}`,
      {
        withCredentials: true,
      },
    );
    return data;
  }
}

"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const STALE_TIME = 1000 * 60 * 30;

export const getCanvasQuery = () => {
  return useQuery({
    queryKey: ["canvas"],
    queryFn: async () => {
      const response = await axios.get(
        "https://spotify-backend-eight-pink.vercel.app/api/canvas",
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    staleTime: STALE_TIME,
  });
};

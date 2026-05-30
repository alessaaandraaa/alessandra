import { useState, useEffect } from "react";

export function useCanvas() {
  const [assignments, setAssignments] = useState<any>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCanvas = async () => {
      try {
        const res = await fetch(
          `https://spotify-backend-eight-pink.vercel.app/api/canvas`,
        );

        if (res.ok) {
          const data = await res.json();
          setAssignments(data);
        }
      } catch (e) {
        console.error("Error fetching data.", e);
        setError("Error fetching data!");
      }
    };

    fetchCanvas();
  }, []);

  return { assignments, error };
}

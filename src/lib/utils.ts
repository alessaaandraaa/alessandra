import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatReadableDate(dateString: string) {
  if (!dateString) return "No due date";

  const date = new Date(dateString);

  // Format options for: "Oct 24 at 11:59 PM"
  return date
    .toLocaleString("en-US", {
      month: "short", // "Oct"
      day: "numeric", // "24"
      hour: "numeric", // "11"
      minute: "2-digit", // "59"
      hour12: true, // "AM/PM"
    })
    .replace(",", " at"); // Swaps the default comma for 'at' to make it prettier
}

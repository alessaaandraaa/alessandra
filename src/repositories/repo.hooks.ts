import { UserLinkRepository } from "./links/UserLinkRepository";
import { UserTaskRepository } from "./tasks/UserTaskRepository";
import { GuestLinkRepository } from "./links/GuestLinkRepository";
import { GuestTaskRepository } from "./tasks/GuestTaskRepository";

import { useAuthStateContext } from "@/contexts/auth.contexts";

export function useTaskRepository() {
  const userRepo = new UserTaskRepository();
  const guestRepo = new GuestTaskRepository();

  const { authState } = useAuthStateContext();

  return { authState, repo: authState === "guest" ? guestRepo : userRepo };
}

export function useLinkRepository() {
  const userRepo = new UserLinkRepository();
  const guestRepo = new GuestLinkRepository();

  const { authState } = useAuthStateContext();

  return { authState, repo: authState === "guest" ? guestRepo : userRepo };
}

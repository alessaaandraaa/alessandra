"use client";

import { createContext, useContext, useState } from "react";

import { getAuthStateQuery } from "@/queries/auth.queries";

export type authStates = "user" | "guest" | "none" | "loading";

type AuthStateContextType = {
  authState: authStates;
  isPending: boolean;
  userId: string | null;
  setGuestMode: (value: boolean) => void;
};

const AuthStateContext = createContext<AuthStateContextType | null>(null);

export function AuthStateProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = getAuthStateQuery();

  const [guestMode, setGuestMode] = useState(false);

  const userId = session?.data?.user?.id ?? null;

  const authState: authStates = session
    ? "user"
    : isPending
      ? "loading"
      : guestMode
        ? "guest"
        : "none";

  return (
    <AuthStateContext.Provider
      value={{
        authState,
        userId,
        isPending,
        setGuestMode,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
}

export const useAuthStateContext = () => {
  const ctx = useContext(AuthStateContext);

  if (!ctx) {
    throw new Error(
      "useAuthStateContext must be used within AuthStateProvider",
    );
  }

  return ctx;
};

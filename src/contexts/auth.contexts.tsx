import { createContext, useContext, useState } from "react";
import { getAuthStateQuery } from "@/queries/auth.queries";
export type authStates = "user" | "guest" | "none" | "loading";

type AuthStateContextType = {
  authState: authStates;
  setGuestMode: (value: boolean) => void;
};

const AuthStateContext = createContext<AuthStateContextType | null>(null);

export function AuthStateProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = getAuthStateQuery();
  const [guestMode, setGuestMode] = useState(false);

  const authState: authStates = isPending
    ? "loading"
    : session
      ? "user"
      : guestMode
        ? "guest"
        : "none";

  console.log("AUTH STATE: ", authState);
  console.log("SESSION DATA: ", session);

  return (
    <AuthStateContext.Provider
      value={{
        authState,
        setGuestMode,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
}

export const useAuthStateContext = () => {
  const ctx = useContext(AuthStateContext);
  if (!ctx)
    throw new Error(
      "useAuthStateContext must be used within AuthStateProvider",
    );
  return ctx;
};

import { createContext, useContext, useState } from "react";
import { authClient } from "@/lib/auth-client";
export type authStates = "user" | "guest" | "none";

type AuthStateContextType = {
  authState: authStates;
  setGuestMode: (value: boolean) => void;
};

const AuthStateContext = createContext<AuthStateContextType | null>(null);

export function AuthStateProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  const [guestMode, setGuestMode] = useState(false);

  const authState = session ? "user" : guestMode ? "guest" : "none";
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

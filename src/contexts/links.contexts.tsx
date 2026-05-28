// context/LinksContext.tsx
import { createContext, useContext, useState } from "react";

export type modes = "default" | "edit" | "delete";
type LinksContextType = {
  mode: modes;
  toggleMode: (mode: modes) => void;

  // edit mode
  editedLink: any | null;
  setEditedLink: (data: any) => void;
  editLink: (data: any) => void;

  // delete mode
  deleteLink: (data: string) => void;
};

const LinksContext = createContext<LinksContextType | null>(null);

export function LinksProvider({
  children,
  onEditLink,
  onDeleteLink,
}: {
  children: React.ReactNode;
  onEditLink: (data: any) => void;
  onDeleteLink: (data: string) => void;
}) {
  const [mode, setMode] = useState<modes>("default");
  const [editedLink, setEditedLink] = useState<any>(null);
  const toggleMode = (newMode: modes) =>
    setMode((prev) => (prev === newMode ? "default" : newMode));

  return (
    <LinksContext.Provider
      value={{
        mode,
        toggleMode,
        editLink: onEditLink,
        editedLink,
        setEditedLink,
        deleteLink: onDeleteLink,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}

export const useLinksContext = () => {
  const ctx = useContext(LinksContext);
  if (!ctx)
    throw new Error("useLinksContext must be used within LinksProvider");
  return ctx;
};

// context/LinksContext.tsx
import { createContext, useContext, useState } from "react";

type LinksContextType = {
  editMode: boolean;
  toggleEditMode: () => void;

  editedLink: any | null;
  setEditedLink: (data: any) => void;

  editLink: (data: any) => void;
};

const LinksContext = createContext<LinksContextType | null>(null);

export function LinksProvider({
  children,
  onEditLink,
}: {
  children: React.ReactNode;
  onEditLink: (data: any) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [editedLink, setEditedLink] = useState<any>(null);
  const toggleEditMode = () => setEditMode((prev) => !prev);

  return (
    <LinksContext.Provider
      value={{
        editMode,
        toggleEditMode,
        editLink: onEditLink,
        editedLink,
        setEditedLink,
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

import { useAuthStateContext } from "@/contexts/auth.contexts";
import GuestAddLinksForm from "./guest/GuestAddLink";
import UserAddLinksForm from "./user/UserAddLink";

type props = {
  onAddLinks: (data: any) => void;
};

export default function AddLinksForm({ onAddLinks }: props) {
  const { authState } = useAuthStateContext();

  return (
    <>
      {authState === "user" ? (
        <UserAddLinksForm onAddLinks={onAddLinks} />
      ) : (
        <GuestAddLinksForm onAddLinks={onAddLinks} />
      )}
    </>
  );
}

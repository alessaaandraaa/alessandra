import { useAuthStateContext } from "@/contexts/auth.contexts";
import GuestEditLinkForm from "./guest/GuestEditLink";
import UserEditLinkForm from "./user/UserEditLink";

type Link = {
  id: string;
  name: string;
  link: string;
  imgLink: string;
};

type props = {
  onEditLink: (data: any) => void;
  linkData: Link;
  onClose: () => void;
};

export default function EditLinksForm({
  onEditLink,
  linkData,
  onClose,
}: props) {
  const { authState } = useAuthStateContext();

  return (
    <>
      {authState === "user" ? (
        <UserEditLinkForm
          onEditLink={onEditLink}
          linkData={linkData}
          onClose={onClose}
        />
      ) : (
        <GuestEditLinkForm
          onEditLink={onEditLink}
          linkData={linkData}
          onClose={onClose}
        />
      )}
    </>
  );
}

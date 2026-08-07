import "../App.css";

import { useAuthStateContext } from "@/contexts/auth.contexts";
import { Link } from "react-router-dom";
import MainPanel from "@/components/MainPanel";

export default function Dashboard() {
  const { authState } = useAuthStateContext();

  return (
    <>
      {authState === "guest" && (
        <Link
          to="/login"
          className="absolute top-0 right-0 text-white text-xs bg-black/50 rounded-xl px-3 py-2"
        >
          Login
        </Link>
      )}

      <MainPanel />
    </>
  );
}

import CanvasMain from "./CanvasMain";
import CanvasLoading from "./CanvasLoading";
import CanvasGuest from "./CanvasGuest";
import { useAuthStateContext } from "@/contexts/auth.contexts";
export default function CanvasPage() {
  const { authState } = useAuthStateContext();

  switch (authState) {
    case "loading":
      return <CanvasLoading />;

    case "user":
      return <CanvasMain />;

    case "guest":
    case "none":
      return <CanvasGuest />;
  }
}

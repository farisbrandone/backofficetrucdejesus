import { context } from "@/App";

import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginMother({ children }: { children: ReactNode }) {
  const data = useContext(context);
  const navigate = useNavigate();
  /* if (!data) {
    navigate("/login");
    return <>aaa</>;
  } */

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  return <>{data && children}</>;
}

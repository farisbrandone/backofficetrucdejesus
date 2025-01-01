import { User } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginMother({ children }: { children: ReactNode }) {
  //const data = useContext(context);
  //const navigate = useNavigate();
  /* if (!data) {
    navigate("/login");
    return <>aaa</>;
  } */

  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  /* console.log({ communityId, groupeId });
    console.log(auth.currentUser); */

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log({ user });
      if (!user) {
        navigate("/login");
        return;
      }
      setUser(user);
    });
    return () => unsubscribe();

    /*  if (!data) {
      navigate("/login");
    } */
  }, []);

  return <>{user && children}</>;
}

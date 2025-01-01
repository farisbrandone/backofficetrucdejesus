import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { format } from "date-fns";
import { ChangeEvent, useState } from "react";
import { createUser } from "./CreateUser";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export interface dataLoginServerType {
  token?: string;
  error?: string;
  status: number;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classEmail, setClassEmail] = useState(false);
  const [classPassword, setClassPassword] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
    setClassEmail(false);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
    setClassPassword(false);
  };

  const onsubmitData = async () => {
    if (!email || !password) {
      if (!email) {
        setClassEmail(true);
      }
      if (!password) {
        setClassPassword(true);
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs ne sont pas remplis",
      });
      return;
    }
    try {
      setStartSending(true);
      const data = {
        email,
        password,
      };
      const result = JSON.stringify(data);
      console.log("bounga");
      const resultat = await axios.post(
        "https://serverbackofficetrucdejesus.onrender.com/api/backoffice/login",
        data
      );

      if (resultat.status === 200) {
        localStorage.setItem("user", result);

        const dd = await createUser(email, password, auth);

        console.log(dd);
        /* createUserWithEmailAndPassword(auth, email, motsDepasse)
          .then((u) => {
            console.log(u);
          })
          .catch((error) => {
            console.log(error.code);
            switch (error.code) {
              case "auth/email-already-in-use":
                existValuealue.current = true;
                console.log(error.code);
                return;
              case "auth/invalid-email":
                throw error;

              case "auth/operation-not-allowed":
                throw error;

              case "auth/weak-password":
                throw error;

              default:
                throw error;
            }
          }); */

        //await createUserWithEmailAndPassword(auth, email, motsDepasse);

        const tt = await signInWithEmailAndPassword(auth, email, password);
        console.log(tt);
        window.location.replace("/");
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Utilisateur non enregistré",
        });
        setStartSending(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite, vérifiez votre connexion",
      });
      setStartSending(false);
    }
    console.log({ email, password });
  };

  return (
    <div className="w-screen h-screen p-2 max-[640px]:flex max-[640px]:items-center max-[640px]:justify-center sm:grid sm:grid-cols-2 bg-white">
      <div className="absolute top-3 left-3">
        <div className="flex items-center justify-center">
          <img
            src="https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png"
            alt="Logo"
            width="40"
            height="40"
            className=""
          />
          <span className="pl-1  self-center">Truc de JESUS !</span>
        </div>
      </div>
      <div className="sm:place-content-center flex flex-col items-center w-full">
        <div className="flex flex-col items-center gap-0 w-full text-center">
          <p className="text-[20px] font-bold"> BON RETOUR PARMI NOUS</p>
          <p className="text-[14px]">Veuillez entrer vos coordonnées</p>
        </div>
        <div className="w-[95%] flex flex-col items-center gap-3 mt-4 min-[350px]:w-[300px]">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmail}
              className={`inputStyle3 py-1.5 w-full disabled:opacity-75 ${
                classEmail ? " border-[#ff1717]" : ""
              } `}
              disabled={startSending}
            />
          </div>
          <div className="flex flex-col gap-1  w-full">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              className={`inputStyle3 py-1.5 w-full disabled:opacity-75 ${
                classPassword ? " border-[#ff1717]" : ""
              } `}
              disabled={startSending}
            />
          </div>
          {startSending && (
            <div>Patienter, l'action est en cours d'éxécution...</div>
          )}
          <button
            className="flex items-center justify-center text-white bg-[#E6C068] hover:bg-[#E6C068]/60 w-full py-1.5 mt-2 rounded-md disabled:opacity-75"
            onClick={onsubmitData}
            disabled={startSending}
          >
            Se connecter
          </button>
        </div>
      </div>
      <div className=" hidden sm:flex items-center justify-center bg-[#E6C068] p-5 ">
        {/* <img
          src="./christian_symbols.svg"
          alt=""
          className="w-[600px] h-[600px] object-cover p-2"
        /> */}
      </div>
      <div className=" absolute bottom-3 left-3 ">
        {format(Date.now(), "yyyy")} ©{" "}
        <strong className="text-[#E6C068] ">Truc de JESUS !</strong>
      </div>
    </div>
  );
}

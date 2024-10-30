import { Fragment } from "react/jsx-runtime";
import { faker } from "@faker-js/faker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonUploadFile from "../ui/ButtonUploadFile";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ClientDataType, requestToSetClientData } from "@/fakeData";
import { gererClientIcon } from "./ClientGerer";

export const cardenaIcon = (width: string, heigth: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={heigth}
      viewBox="0 0 15 15"
    >
      <path fill="currentColor" d="M11 11h-1v-1h1zm-3 0h1v-1H8zm5 0h-1v-1h1z" />
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M3 6V3.5a3.5 3.5 0 1 1 7 0V6h1.5A1.5 1.5 0 0 1 13 7.5v.55a2.5 2.5 0 0 1 0 4.9v.55a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 13.5v-6A1.5 1.5 0 0 1 1.5 6zm1-2.5a2.5 2.5 0 0 1 5 0V6H4zM8.5 9a1.5 1.5 0 1 0 0 3h4a1.5 1.5 0 0 0 0-3z"
        clip-rule="evenodd"
      />
    </svg>
  );
};

function ClientCreer() {
  const [nomClient, setNomClient] = useState("");
  const [emailClient, setEmailClient] = useState("");
  const [passwordClient, setPasswordClient] = useState("");
  const [confirmPasswordClient, setConfirmPasswordClient] = useState("");
  const [logoClient, setLogoCllient] = useState("");

  const [stateDownload, setStateDownload] = useState(false);
  const [classNomClient, setClassNomClient] = useState(false);
  const [classEmailClient, setClassEmailClient] = useState(false);
  const [classPassword, setClassPassword] = useState(false);
  const [classConfirmPassword, setClassConfirmPassword] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [statusClient, setStatusClient] = useState("activate");
  const { toast } = useToast();

  const handleNomClient = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNomClient(() => e.target.value);
    setClassNomClient(false);
  };
  const handleEmailClient = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmailClient(() => e.target.value);
    setClassEmailClient(false);
  };
  const handlePasswordClient = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPasswordClient(() => e.target.value);
    setClassConfirmPassword(false);
  };
  const handleConfirmPasswordClient = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setConfirmPasswordClient(() => e.target.value);
    setClassConfirmPassword(false);
  };

  const handleChangeStatusClient = () => {
    console.log(statusClient);
    if (statusClient === "activate") {
      setStatusClient("desactivate");
      return;
    }
    setStatusClient("activate");
  };

  const handleLogoClient = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLogoCllient(() => e.target.value);
  };

  const CreateNewClient = async () => {
    console.log("banga");
    setStartSending(() => true);
    if (
      !nomClient ||
      !passwordClient ||
      !confirmPasswordClient ||
      passwordClient !== confirmPasswordClient ||
      !emailClient
    ) {
      if (!nomClient) {
        setClassNomClient(true);
      }
      if (!passwordClient) {
        setClassPassword(true);
      }
      if (!confirmPasswordClient || passwordClient !== confirmPasswordClient) {
        setClassConfirmPassword(true);
      }
      if (!emailClient) {
        setClassEmailClient(true);
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs requis n'ont pas été remplis",
      });
      setStartSending(() => false);
      return;
    }
    try {
      var data: ClientDataType = {
        nomClient: nomClient,
        emailClient: emailClient,
        passwordClient: passwordClient,
        logoClient: logoClient,
        statusClient: statusClient,
        dateCreated: "",
        dateUpdated: "",
        id: "",
      };
      console.log(data);
      const result = await requestToSetClientData(data);
      console.log(result);

      if (result.success) {
        toast({
          title: "Success",
          description: "Le client a été crée avec success",
        });
        setStartSending(() => false);
        window.location.replace("/GERER LES CLIENS");
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue cotée serveur",
        });
        setStartSending(() => false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Une erreur est survenue pendant la creation du client, vérifier votre connexion",
      });
      setStartSending(() => false);
      console.error("");
    }
  };

  return (
    <Fragment>
      {/* <HeaderForAllBackOffice /> */}
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {gererClientIcon("30", "30")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                AJOUTER UN CLIENT
              </h1>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <p className="align-middle self-center">Communauté</p>
          <select
            title="Select element"
            id="countries"
            className=" w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>{faker.word.words(2)}</option>
          </select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[12px] sm:text-[18px]">
            Ajout d'un nouveau client
          </CardTitle>
          <CardDescription>
            Remplir les champs suivants et ajouter un nouveau client
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[16px] sm:text-[18px]">
          <div className="space-y-1">
            <Label htmlFor="nomClient">
              Nom du client <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="nomClient"
              name="nomClient"
              type="text"
              value={nomClient}
              placeholder="Entrer le nom du groupe"
              onChange={handleNomClient}
              className={`${classNomClient ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="emailClient">
              Email du client <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              type="text"
              id="emailClient"
              name="emailClient"
              value={emailClient}
              placeholder="Entrer l'email du client"
              onChange={handleEmailClient}
              className={`${classEmailClient ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>

          <div className="felx flex-col items-center mt-3">
            <input
              type="checkbox"
              id="statusId"
              value={statusClient}
              checked={statusClient === "activate"}
              onChange={handleChangeStatusClient}
            />
            <label
              htmlFor="statusId"
              className="ml-2 text-[16px] font-semibold"
            >
              Activé le groupe
            </label>
          </div>
          <div className="space-y-1">
            <Label htmlFor="passwordClient">
              Enter le mots de passe du client{" "}
              <span className="text-[#e91e63]">*</span>
            </Label>
            <div className="flex items-center">
              <span className="text-[#e91e63] border-[1px] bg-[#191919] p-[11px] rounded-l-lg">
                {" "}
                {cardenaIcon("15", "15")}{" "}
              </span>
              <Input
                type="password"
                id="passwordClient"
                name="passwordClient"
                value={passwordClient}
                placeholder="Mots de passe du client"
                onChange={handlePasswordClient}
                required
                className={`${
                  classPassword
                    ? "border-red-600 focus:rounded-l-none"
                    : "focus:rounded-l-none"
                }`}
                disabled={startSending}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmPasswordClient">
              Confirmer le mots de passe du client{" "}
              <span className="text-[#e91e63]  ">*</span>
            </Label>
            <div className="flex items-center">
              <span className="text-[#e91e63] border-[1px] bg-[#191919] p-[11px] rounded-l-lg ">
                {" "}
                {cardenaIcon("15", "15")}{" "}
              </span>
              <Input
                type="password"
                id="confirmPasswordClient"
                name="confirmPasswordClient"
                value={confirmPasswordClient}
                placeholder="Confirmation Mots de passe client"
                onChange={handleConfirmPasswordClient}
                required
                className={`${
                  classConfirmPassword
                    ? "border-red-600 focus:rounded-l-none"
                    : "focus:rounded-l-none"
                }`}
                disabled={startSending}
              />
            </div>
          </div>

          <div className="space-y-1 " key="button1">
            <Label htmlFor="logoClient">
              Insérer le logo du client {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2" key="button21">
              <Input
                key="button11"
                id="logoClient"
                name="logoClient"
                value={logoClient}
                placeholder="Entrer une image représentant le logo du groupe"
                onChange={handleLogoClient}
                disabled={stateDownload || startSending}
              />
              <ButtonUploadFile
                name="file1"
                valueForHtml="drop-zone-1"
                key="button111"
                setImageUrl={setLogoCllient}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
              />
            </div>
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter className="flex items-center gap-3">
          <Button
            disabled={stateDownload || startSending}
            onClick={CreateNewClient}
          >
            Enregistrer
          </Button>
          <Button
            disabled={stateDownload || startSending}
            className="p-0 flex items-center justify-center bg-[#e91e63] hover:bg-[#e91e62e0]"
          >
            <NavLink
              to="/GERER DES CLIENTS"
              className="w-full h-full flex items-center justify-center p-2"
            >
              Retour à la page Client
            </NavLink>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default ClientCreer;

import { Fragment } from "react/jsx-runtime";
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
import { requestToSetMembreData } from "@/fakeData";
import { MemberDataType } from "./MemberDataComponent";
import PhoneInput from "react-phone-number-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateTimePicker from "react-datetime-picker";

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
export const gererMembreIcon = (width: string, heigth: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={heigth}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M1 20v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20zm18 0v-3q0-1.1-.612-2.113T16.65 13.15q1.275.15 2.4.513t2.1.887q.9.5 1.375 1.112T23 17v3zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m10-4q0 1.65-1.175 2.825T15 12q-.275 0-.7-.062t-.7-.138q.675-.8 1.038-1.775T15 8t-.362-2.025T13.6 4.2q.35-.125.7-.163T15 4q1.65 0 2.825 1.175T19 8"
      />
    </svg>
  );
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function MembreCreer() {
  const [name, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motsDepasse, setMotsDepasse] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [sexe, setSexe] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Value>(new Date());
  const [phoneValue, setPhoneValue] = useState<string>();

  const [stateDownload, setStateDownload] = useState(false);
  const [classNomMembre, setClassNomMembre] = useState(false);
  const [classEmailMembre, setClassEmailMembre] = useState(false);
  const [classPassword, setClassPassword] = useState(false);
  const [classConfirmPassword, setClassConfirmPassword] = useState(false);
  const [classBirthDay, setClassBirthDay] = useState(false);
  const [classSexe, setClassSexe] = useState(false);
  const [classPhone, setClassPhone] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [status, setStatus] = useState("activate");
  const { toast } = useToast();

  const handleNomMembre = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNom(() => e.target.value);
    setClassNomMembre(false);
  };
  const handleEmailMembre = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(() => e.target.value);
    setClassEmailMembre(false);
  };
  const handlePasswordMembre = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMotsDepasse(() => e.target.value);
    setClassConfirmPassword(false);
  };
  const handleConfirmPasswordMembre = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setConfirmPassword(() => e.target.value);
    setClassConfirmPassword(false);
  };

  const handleChangeStatusMembre = () => {
    console.log(status);
    if (status === "activate") {
      setStatus("desactivate");
      return;
    }
    setStatus("activate");
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImage(() => e.target.value);
  };

  const handleSexe = (value: string) => {
    setSexe(value);
  };

  const CreateNewMembre = async () => {
    const birthDay = dateOfBirth?.toString() as string;
    setStartSending(() => true);
    if (
      !name ||
      !motsDepasse ||
      !confirmPassword ||
      motsDepasse !== confirmPassword ||
      !email ||
      !dateOfBirth ||
      !sexe ||
      !phoneValue
    ) {
      if (!name) {
        setClassNomMembre(true);
      }
      if (!motsDepasse) {
        setClassPassword(true);
      }
      if (!confirmPassword || motsDepasse !== confirmPassword) {
        setClassConfirmPassword(true);
      }
      if (!email) {
        setClassEmailMembre(true);
      }
      if (!birthDay) {
        setClassBirthDay(true);
      }
      if (!sexe) {
        setClassSexe(true);
      }
      if (!phoneValue) {
        setClassPhone(true);
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
      var data: MemberDataType = {
        name: name,
        email: email,
        motsDepasse: motsDepasse,
        image: image,
        sexe: sexe,
        birthDay: birthDay,
        phone: phoneValue.toString(),
        status: status,
        dateCreation: "",
        dateMiseAJour: "",
        id: "",
      };
      console.log(data);
      const result = await requestToSetMembreData(data);
      console.log(result);

      if (result.success) {
        toast({
          title: "Success",
          description: "Le membre a été crée avec success",
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
        description: "Une erreur est survenue pendant la creation de ce membre",
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
              {gererMembreIcon("30", "30")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                AJOUTER UN MEMBRE
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
            <option selected>Un Truc de Jesus!</option>
          </select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[12px] sm:text-[18px]">
            Ajout d'un nouveau membre
          </CardTitle>
          <CardDescription>
            Remplir les champs suivants et ajouter un nouveau client
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[16px] sm:text-[18px]">
          <div className="space-y-1">
            <Label htmlFor="name">
              Nom du membre <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              placeholder="Entrer le nom du groupe"
              onChange={handleNomMembre}
              className={`${classNomMembre ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email du membre <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              type="text"
              id="email"
              name="email"
              value={email}
              placeholder="Entrer l'email du client"
              onChange={handleEmailMembre}
              className={`${classEmailMembre ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>

          <div className="felx flex-col items-center space-y-2">
            <input
              type="checkbox"
              id="statusId"
              value={status}
              checked={status === "activate"}
              onChange={handleChangeStatusMembre}
            />
            <label
              htmlFor="statusId"
              className="ml-2 text-[16px] font-semibold"
            >
              Activé le membre(status)
            </label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="motsDepasse">
              Enter le mots de passe du membre{" "}
              <span className="text-[#e91e63]">*</span>
            </Label>
            <div className="flex items-center">
              <span className="text-[#e91e63] border-[1px] bg-[#191919] p-[11px] rounded-l-lg">
                {" "}
                {cardenaIcon("15", "15")}{" "}
              </span>
              <Input
                type="motsDepasse"
                id="motsDepasse"
                name="motsDepasse"
                value={motsDepasse}
                placeholder="Mots de passe du client"
                onChange={handlePasswordMembre}
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirmer le mots de passe du membre{" "}
              <span className="text-[#e91e63]  ">*</span>
            </Label>
            <div className="flex items-center">
              <span className="text-[#e91e63] border-[1px] bg-[#191919] p-[11px] rounded-l-lg ">
                {" "}
                {cardenaIcon("15", "15")}{" "}
              </span>
              <Input
                type="motsDepasse"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirmation Mots de passe client"
                onChange={handleConfirmPasswordMembre}
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

          <Select
            value={sexe}
            onValueChange={(value: string) => handleSexe(value)}
            disabled={startSending}
          >
            <p className="text-[14px] ">Sélectionner le sexe du membre</p>
            <SelectTrigger
              className={` w-[180px] ${
                classSexe
                  ? "border-red-600 focus:rounded-l-none"
                  : "focus:rounded-l-none"
              } space-y-2`}
            >
              <SelectValue placeholder="Sélectionner votre sexe" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sélection du sexe</SelectLabel>
                <SelectItem value="M">Male</SelectItem>
                <SelectItem value="F">Femelle</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <p className="mb-2 text-[14px]">
              Entrer la date de naissance du membre
            </p>
            <DateTimePicker
              onChange={setDateOfBirth}
              value={dateOfBirth}
              required
              className={`${
                classBirthDay
                  ? "border-red-600 focus:rounded-l-none"
                  : "focus:rounded-l-none"
              } text-[14px]`}
              disabled={startSending}
            />
          </div>

          <div
            className={`${
              classPhone
                ? "border-red-600 focus:rounded-l-none"
                : "focus:rounded-l-none"
            } text-[14px] space-y-2`}
          >
            <p>Entrer le numéro de téléphone du membre</p>
            <PhoneInput
              international
              defaultCountry="FR"
              placeholder="Enter votre numéro de téléphone"
              value={phoneValue}
              onChange={setPhoneValue}
              disabled={startSending}
            />
          </div>

          <div className="space-y-2 " key="button1">
            <Label htmlFor="image">
              Insérer le logo du membre {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2" key="button21">
              <Input
                key="button11"
                id="image"
                name="image"
                value={image}
                placeholder="Entrer une image représentant le logo du groupe"
                onChange={handleImage}
                disabled={stateDownload || startSending}
              />
              <ButtonUploadFile
                name="file1"
                valueForHtml="drop-zone-1"
                key="button111"
                setImageUrl={setImage}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
              />
            </div>
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter className="flex items-center gap-3 space-y-2">
          <Button
            disabled={stateDownload || startSending}
            onClick={CreateNewMembre}
          >
            Enregistrer
          </Button>
          <Button
            disabled={stateDownload || startSending}
            className="p-0 flex items-center justify-center bg-[#e91e63] hover:bg-[#e91e62e0]"
          >
            <NavLink
              to="/GERER DES MEMBRES"
              className="w-full h-full flex items-center justify-center p-2"
            >
              Retour à la page Membre
            </NavLink>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default MembreCreer;

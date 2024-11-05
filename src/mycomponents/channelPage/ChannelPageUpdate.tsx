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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonUploadFile from "../ui/ButtonUploadFile";
import { Button } from "@/components/ui/button";
import { NavLink, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  ChannelPageDataType,
  requestToGetChannelDataWithId,
  requestToUpdateChannelData,
} from "@/fakeData";
import { channelIcon } from "./ChannelPage";
import { Textarea } from "@/components/ui/textarea";

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

function ChannelPageUpdate() {
  const [nomChannel, setNomChannel] = useState("");
  const [descriptionChannel, setDescriptionChannel] = useState("");
  const [typeChannel, setTypeChannel] = useState("");
  const [imageChannel, setImageChannel] = useState("");
  const [statusChannel, setStatusChannel] = useState("activate");
  const [typeAccessChannel, setTypeAccessChannel] = useState("");
  const [amountChannel, setAmountChannel] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [classNomChannel, setClassNomChannel] = useState(false);
  const [classDescriptionChannel, setClassDescriptionChannel] = useState(false);
  const [classAmontChannel, setClassAmontChannel] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);

  const { toast } = useToast();
  const { channelId } = useParams<string>();

  const handleNomChannel = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNomChannel(() => e.target.value);
    setClassNomChannel(false);
  };
  const handleDescriptionChannel = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescriptionChannel(() => e.target.value);
    setClassDescriptionChannel(false);
  };

  const handleAmountChannel = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAmountChannel(() => e.target.value);
    setClassAmontChannel(false);
  };

  const handleChangeStatusChannel = () => {
    console.log(statusChannel);
    if (statusChannel === "activate") {
      setStatusChannel("desactivate");
      return;
    }
    setStatusChannel("activate");
  };

  const handleImageChannel = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImageChannel(() => e.target.value);
  };
  const handleTypeAccessChannel = (value: string) => {
    setTypeAccessChannel(() => value);
  };

  const handleTypeChannel = (value: string) => {
    setTypeChannel(() => value);
  };

  const updateChannel = async () => {
    setStartSending(() => true);
    if (!nomChannel || !descriptionChannel) {
      if (!nomChannel) {
        setClassNomChannel(true);
      }

      if (!descriptionChannel) {
        setClassDescriptionChannel(true);
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
      if (!channelId) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Abscence de l'id de la chaine associé, un problème rencontré coté serveur",
        });
        return;
      }
      var data: ChannelPageDataType = {
        nomChannel: nomChannel,
        descriptionChannel: descriptionChannel,
        typeChannel: typeChannel,
        imageChannel: imageChannel,
        groupeIdChannel: "",
        statusChannel: statusChannel,
        typeAccessChannel: typeAccessChannel,
        amountChannel: amountChannel,
        dateCreatedChannel: "",
        dateUpdatedChannel: "",
        id: channelId,
      };
      console.log(data);
      const result = await requestToUpdateChannelData(data);
      console.log(result);

      if (result.success) {
        toast({
          title: "Success",
          description: "Le client a été mis à jour avec success",
        });
        setStartSending(() => false);
        window.location.replace("/GROUPES");
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
          "Une erreur est survenue pendant la mis à jour du client, vérifier votre connexion",
      });
      setStartSending(() => false);
      console.error(error);
    }
  };

  useEffect(() => {
    async function getChannelData() {
      try {
        const data = await requestToGetChannelDataWithId(channelId as string);
        setNomChannel(data.nomChannel);
        setDescriptionChannel(data.descriptionChannel);
        setAmountChannel(data.amountChannel);
        setImageChannel(data.imageChannel);
        setTypeAccessChannel(data.typeAccessChannel);
        setTypeChannel(data.typeChannel);
        setStatusChannel(data.statusChannel);
        /* setEmailClient(data.emailClient);
        setPasswordClient(data.passwordClient);
        setLogoCllient(data.logoClient);
        setStatusClient(data.statusClient); */
      } catch (error) {
        setLoadingFail(true);
      }
    }
    getChannelData();
  }, []);

  if (!channelId) {
    return <div className="w-full text-center pt-4">Aucune donnée trouvée</div>;
  }

  if (!nomChannel || !descriptionChannel) {
    return (
      <div className="w-full text-center pt-4">
        Le document est en cours de chargement ...
      </div>
    );
  }

  if (loadingFail) {
    return (
      <div className="w-full text-center pt-4">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <Fragment>
      {/* <HeaderForAllBackOffice /> */}
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {channelIcon("30", "30")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                AJOUTER UNE CHAINE
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
            Ajout d'une nouvelle chaine
          </CardTitle>
          <CardDescription>
            Remplir les champs suivants et ajouter une nouvelle chaine
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[16px] sm:text-[18px]">
          <div className="space-y-1">
            <Label htmlFor="nomChannel">
              Nom de la chaine <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="nomChannel"
              name="nomChannel"
              type="text"
              value={nomChannel}
              placeholder="Entrer le nom du groupe"
              onChange={handleNomChannel}
              className={`${classNomChannel ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="descriptionGroupe">
              Description de la chaine <span className="text-[#e91e63]">*</span>
            </Label>
            <Textarea
              id="descriptionGroupe"
              name="descriptionGroupe"
              value={descriptionChannel}
              placeholder="Entrer une description du groupe"
              onChange={handleDescriptionChannel}
              required
              className={`${classDescriptionChannel ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="amountChannel">
              Entrer le montant associé à cet chaine{" "}
              <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <div className="flex items-center ">
              <Input
                id="amountChannel"
                name="amountChannel"
                type="text"
                value={amountChannel}
                placeholder="Entrer le nom du groupe"
                onChange={handleAmountChannel}
                className={`${classAmontChannel ? "border-red-600" : ""}`}
                disabled={startSending}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="typeChannel">
              Type de chaine <span className="text-[#e91e63] ">*</span>{" "}
            </Label>

            <Select
              value={typeChannel}
              onValueChange={(value: string) => handleTypeChannel(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type de chaine" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type de chaines</SelectLabel>
                  <SelectItem value="Blog">Blog</SelectItem>
                  <SelectItem value="Ressources">Ressources</SelectItem>
                  <SelectItem value="Assets">Assets</SelectItem>
                  <SelectItem value="Cours">Cours</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="typeAccessChannel">
              Entrer le Type d'access associé à cette chaine{" "}
              <span className="text-[#e91e63] ">*</span>{" "}
            </Label>

            <Select
              value={typeAccessChannel}
              onValueChange={(value: string) => handleTypeAccessChannel(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type d'access" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type d'access</SelectLabel>
                  <SelectItem value="Gratuit">Gratuit</SelectItem>
                  <SelectItem value="Payant">Payant</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="felx flex-col items-center mt-3">
            <input
              type="checkbox"
              id="statusId"
              value={statusChannel}
              checked={statusChannel === "activate"}
              onChange={handleChangeStatusChannel}
            />
            <label
              htmlFor="statusId"
              className="ml-2 text-[16px] font-semibold"
            >
              Activé le groupe
            </label>
          </div>

          <div className="space-y-1 " key="button1">
            <Label htmlFor="logoClient">
              Insérer une image associé à la chaine {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2" key="button21">
              <Input
                key="button11"
                id="logoClient"
                name="logoClient"
                value={imageChannel}
                placeholder="Entrer une image représentant le logo du groupe"
                onChange={handleImageChannel}
                disabled={stateDownload || startSending}
              />
              <ButtonUploadFile
                name="file1"
                valueForHtml="drop-zone-1"
                key="button111"
                setImageUrl={setImageChannel}
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
            onClick={updateChannel}
          >
            Enregistrer
          </Button>
          <Button
            disabled={stateDownload || startSending}
            className="p-0 flex items-center justify-center bg-[#e91e63] hover:bg-[#e91e62e0]"
          >
            <NavLink
              to="/GROUPES"
              className="w-full h-full flex items-center justify-center p-2"
            >
              Retour à la page Groupe
            </NavLink>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default ChannelPageUpdate;

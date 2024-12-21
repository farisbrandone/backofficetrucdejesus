import { Fragment } from "react/jsx-runtime";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ButtonUploadFile from "../ui/ButtonUploadFile";
import { Button } from "@/components/ui/button";
import { NavLink, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  ChannelPageDataType,
  requestTogetAllRessourcesData,
  requestToSetChannelData,
  RessourcesDataType,
} from "@/fakeData";
import { channelIcon } from "./ChannelPage";
import { Checkbox } from "@/components/ui/checkbox";

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

function ChannelPageCreer() {
  const [nomChannel, setNomChannel] = useState("");
  const [descriptionChannel, setDescriptionChannel] = useState("");
  const [typeChannel, setTypeChannel] = useState("Blog");
  const [imageChannel, setImageChannel] = useState("");
  const [statusChannel, setStatusChannel] = useState("activate");
  const [typeAccessChannel, setTypeAccessChannel] = useState("Gratuit");
  const [amountChannel, setAmountChannel] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [classNomChannel, setClassNomChannel] = useState(false);
  const [classDescriptionChannel, setClassDescriptionChannel] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [channelRessources, setChannelRessources] = useState<
    RessourcesDataType[]
  >([]);
  const [totalRessources, setTotalRessources] = useState<RessourcesDataType[]>(
    []
  );
  const [loadingTotalRessources, setLoadingTotalRessources] = useState(false);
  const { toast } = useToast();
  const { groupeId } = useParams<string>();

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
    /* setClassAmontChannel(false); */
  };

  const handleChangeStatusChannel = () => {
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
  const handleTypeAccessChannel = (e: ChangeEvent<HTMLSelectElement>) => {
    setTypeAccessChannel(e.target.value);
  };

  const handleTypeChannel = async (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "Ressources") {
      setTypeChannel(val);
      setLoadingTotalRessources(true);
      return;
    }
    setTypeChannel(val);
    setLoadingTotalRessources(false);
  };

  const handleAddRessources = (value: RessourcesDataType) => {
    setChannelRessources((prev) => [...prev, value]);
  };

  const createChannel = async () => {
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
      if (!groupeId) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Abscence de l'id du groupe associé, un problème rencontré coté serveur",
        });
        return;
      }
      var data: ChannelPageDataType = {
        nomChannel: nomChannel,
        descriptionChannel: descriptionChannel,
        typeChannel: typeChannel,
        imageChannel: imageChannel,
        groupeIdChannel: groupeId,
        statusChannel: statusChannel,
        typeAccessChannel: typeAccessChannel,
        amountChannel: amountChannel,
        channelRessources: loadingTotalRessources ? channelRessources : [],
      };

      const result = await requestToSetChannelData(data, groupeId);

      if (result.success) {
        toast({
          title: "Success",
          description: "Le client a été crée avec success",
        });
        setStartSending(() => false);
        window.location.replace(`/GERER LES CHAINES/${groupeId}`);
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

  useEffect(() => {
    const getRessourcesData = async () => {
      try {
        const result = await requestTogetAllRessourcesData();
        setTotalRessources([...result]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Les ressources n'ont pas pu etre télécharger, vérifier votre connexion",
        });
      }
    };
    getRessourcesData();
  }, []);

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
        <CardContent className="space-y-2 flex flex-col gap-3 text-[16px] sm:text-[18px]">
          <div className="space-y-1 flex flex-col gap-1">
            <label htmlFor="nomChannel">
              Nom de la chaine <span className="text-[#e91e63] ">*</span>{" "}
            </label>
            <input
              id="nomChannel"
              name="nomChannel"
              type="text"
              value={nomChannel}
              placeholder="Entrer le nom du groupe"
              onChange={handleNomChannel}
              className={`${
                classNomChannel
                  ? " inputStyle rounded-r-md border-red-600"
                  : "inputStyle rounded-r-md"
              }`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1 flex flex-col gap-1">
            <label htmlFor="descriptionGroupe">
              Description de la chaine <span className="text-[#e91e63]">*</span>
            </label>
            <textarea
              cols={2}
              id="descriptionGroupe"
              name="descriptionGroupe"
              value={descriptionChannel}
              placeholder="Entrer une description du groupe"
              onChange={handleDescriptionChannel}
              required
              className={`${
                classDescriptionChannel
                  ? "textareaStyle border-red-600"
                  : "textareaStyle"
              }`}
              disabled={startSending}
            />
          </div>

          <div className="space-y-1 flex flex-col gap-1">
            <label htmlFor="amountChannel">
              Entrer le montant associé à cet chaine{" "}
            </label>

            <input
              id="amountChannel"
              name="amountChannel"
              type="text"
              value={amountChannel}
              placeholder="Montant associé à cette chaine"
              onChange={handleAmountChannel}
              disabled={startSending}
              className="inputStyle rounded-r-md"
            />
          </div>

          <div className="space-y-1 flex flex-col gap-1 ">
            <label htmlFor="typeChannel">
              Type de chaine <span className="text-[#e91e63] ">*</span>{" "}
            </label>

            <select
              className="inputStyle rounded-r-md"
              id="typeChannel"
              value={typeChannel}
              onChange={handleTypeChannel}
            >
              <option value="Blog">Blog</option>
              <option value="Ressources">Ressources</option>
              <option value="Assets">Assets</option>
              <option value="Cours">Cours</option>
            </select>

            {loadingTotalRessources && (
              <div className="space-y-1 w-[350px] max-h-[250px] rounded-xl shadow-2xl bg-[#eeeded] text-[#191919] overflow-y-scroll flex flex-col items-center gap-3 ">
                <p className="text-[18px] pl-3">
                  Selectionner les ressources à associer à cet chaine
                </p>
                <div className=" flex flex-col items-center gap-2 overflow-y-auto">
                  {!!totalRessources.length ? (
                    totalRessources?.map((value, index) => (
                      <div className="flex items-center space-x-2" key={index}>
                        <Checkbox
                          id="terms"
                          onCheckedChange={() => handleAddRessources(value)}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {value.titleRessource}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div>Pas de ressource</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1 flex flex-col gap-1">
            <label htmlFor="typeAccessChannel">
              Entrer le Type d'access associé à cette chaine{" "}
              <span className="text-[#e91e63] ">*</span>{" "}
            </label>

            <select
              className="inputStyle rounded-r-md"
              id="typeAccessChannel"
              value={typeAccessChannel}
              onChange={handleTypeAccessChannel}
            >
              <option value="Gratuit">Gratuit</option>
              <option value="Payant">Payant</option>
            </select>
          </div>

          <div className="flex mt-3">
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
              Activé le status de la chaine
            </label>
          </div>

          <div className="space-y-1 flex flex-col gap-1 " key="button1">
            <label htmlFor="logoClient">
              Insérer une image associé à la chaine {" (optionnel)"}
            </label>
            <div className="flex items-center max-w-[800px]" key="button21">
              <input
                key="button11"
                id="logoClient"
                name="logoClient"
                value={imageChannel}
                placeholder="Entrer une image représentant le logo du groupe"
                onChange={handleImageChannel}
                disabled={stateDownload || startSending}
                className="border-[#191919] focus:border-[#e91e63] border-[1px] border-solid focus:outline-none rounded-l-md h-[36px] px-2 flex-1"
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
            onClick={createChannel}
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

export default ChannelPageCreer;

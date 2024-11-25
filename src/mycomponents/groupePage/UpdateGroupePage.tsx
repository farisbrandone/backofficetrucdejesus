import { Fragment } from "react/jsx-runtime";
import { groupeIcon } from "./GroupePage";
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
import { Textarea } from "@/components/ui/textarea";
import ButtonUploadFile from "../ui/ButtonUploadFile";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

import { useToast } from "@/hooks/use-toast";
import {
  GroupeDataType,
  requestToGetGroupDataWithId,
  requestToUpdateGroupeData,
} from "@/fakeData";
import { useParams } from "react-router-dom";

/* interface Params {
    groupeId: string;
  } */

function UpdateGroupePage() {
  const [titleGroupe, setTitleGroupe] = useState("");
  const [descriptionGroupe, setDescriptionGroupe] = useState("");
  const [logoUrlGroupe, setLogoUrlGroupe] = useState("");
  const [banniereUrlGroupe, setBanniereUrlGroupe] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [stateDownload1, setStateDownload1] = useState(false);
  const [classTitle, setClassTitle] = useState(false);
  const [classDescription, setClassDescription] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const [typeAccess, setTypeAccess] = useState("Public");
  const { groupeId } = useParams<string>();
  const { toast } = useToast();
  const [status, setStatus] = useState("activate");

  const handleChangeStatus = () => {
    if (status === "activate") {
      setStatus("desactivate");
    }
    setStatus("activate");
  };
  const handleTitleGroupe = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleGroupe(() => e.target.value);
    setClassTitle(false);
  };
  const handleDescriptionGroupe = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescriptionGroupe(() => e.target.value);
    setClassDescription(false);
  };
  const handleLogoUrlGroupe = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLogoUrlGroupe(() => e.target.value);
  };
  const handleBanniereUrlGroupe = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBanniereUrlGroupe(() => e.target.value);
  };

  const handleChangeRadioGroupe = (val: string) => {
    console.log({ radioGroupe: val });
    setTypeAccess(() => val);
  };

  const updateGroupeWithId = async () => {
    console.log("banga");
    setStartSending(() => true);
    if (!titleGroupe || !descriptionGroupe) {
      if (!titleGroupe) {
        setClassTitle(true);
      }
      if (!descriptionGroupe) {
        setClassDescription(true);
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
        return;
      }
      console.log("inside try");
      var data: GroupeDataType = {
        titleGroupe: titleGroupe,
        descriptionGroupe: descriptionGroupe,
        logoUrlGroupe: logoUrlGroupe,
        banniereUrlGroupe: banniereUrlGroupe,
        typeAccess: typeAccess,
        status: status,
        date: "",
        id: groupeId,
        nombreDePartages: 0,
        nombreDevenements: 0,
        nombreDeChaines: 0,
        nombreDePassionnner: 0,
      };
      const result = await requestToUpdateGroupeData(data);
      console.log(result);

      if (result.success) {
        console.log("shunga");
        toast({
          title: "Success",
          description: "Le groupe à été mis à jour avec success",
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
          "Une erreur est survenue pendant la mise à jour du groupe, vérifier votre connexion",
      });
      setStartSending(() => false);
      console.error("");
    }
  };

  useEffect(() => {
    async function getCommunityData() {
      try {
        const data = await requestToGetGroupDataWithId(groupeId as string);
        setLogoUrlGroupe(data.logoUrlGroupe);
        setTitleGroupe(data.titleGroupe);
        setDescriptionGroupe(data.descriptionGroupe);
        setBanniereUrlGroupe(data.banniereUrlGroupe);
        setTypeAccess(data.typeAccess);
        setStatus(data.status);
      } catch (error) {
        setLoadingFail(true);
      }
    }
    getCommunityData();
  }, []);

  if (!groupeId) {
    return <div className="w-full text-center pt-4">Aucune donnée trouvée</div>;
  }

  if ((!descriptionGroupe || !titleGroupe) && !loadingFail) {
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
              {groupeIcon}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                Mettre à jour le groupe
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
            Mise à jour
          </CardTitle>
          <CardDescription>
            Remplir les champs suivants et mettez à jour le groupe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[16px] sm:text-[18px]">
          <div className="space-y-1">
            <Label htmlFor="titleGroupe">
              Nom du groupe <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="titleGroupe"
              name="titleGroupe"
              value={titleGroupe}
              placeholder="Entrer le nom du groupe"
              onChange={handleTitleGroupe}
              className={`${classTitle ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="descriptionGroupe">
              Description du groupe <span className="text-[#e91e63]">*</span>
            </Label>
            <Textarea
              id="descriptionGroupe"
              name="descriptionGroupe"
              value={descriptionGroupe}
              placeholder="Entrer une description du groupe"
              onChange={handleDescriptionGroupe}
              required
              className={`${classDescription ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[16px] font-semibold ">Type d'access</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="option1"
                  name="typeAccess"
                  value="Public"
                  checked={typeAccess === "Public"}
                  onClick={() => handleChangeRadioGroupe("Public")}
                  className=" "
                />
                <label htmlFor="option1" className="">
                  Public
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="option2"
                  name="typeAccess"
                  value="Privée"
                  checked={typeAccess === "Privée"}
                  onClick={() => handleChangeRadioGroupe("Privée")}
                  className="   "
                />
                <label htmlFor="option2" className="">
                  Privée
                </label>
              </div>
            </div>
          </div>
          <div className="felx flex-col items-center">
            <label htmlFor="statusId">Status</label>
            <input
              type="checkbox"
              id="statusId"
              value={status}
              checked={status === "activate"}
              onClick={handleChangeStatus}
            />
          </div>
          <div className="space-y-1 ">
            <Label htmlFor="logoUrlGroupe">
              Insérer le logo du groupe {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="logoUrlGroupe"
                name="logoUrlGroupe"
                value={logoUrlGroupe}
                placeholder="Entrer une image représentant le logo du groupe"
                onChange={handleLogoUrlGroupe}
                disabled={stateDownload || startSending}
              />
              <ButtonUploadFile
                name="fileGroupe1"
                valueForHtml="drop-zone-update-group1"
                key="update1"
                setImageUrl={setLogoUrlGroupe}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
              />
            </div>
          </div>

          <div className="space-y-1 ">
            <Label htmlFor="banniereUrl">
              Entrer l'image bannière du groupe {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="banniereUrlGroupe"
                name="banniereUrlGroupe"
                value={banniereUrlGroupe}
                placeholder="Entrer une image représentant la bannière du groupe"
                onChange={handleBanniereUrlGroupe}
                disabled={startSending || stateDownload1}
              />
              <ButtonUploadFile
                name="fileGroupe2"
                valueForHtml="drop-zone-update-group2"
                key="update2"
                setImageUrl={setBanniereUrlGroupe}
                setStateDownloadProps={setStateDownload1}
                stateDownloadProps={stateDownload1}
              />
            </div>
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter className="flex items-center gap-3">
          <Button
            disabled={stateDownload || startSending || stateDownload1}
            onClick={updateGroupeWithId}
          >
            Envoyer les modifications
          </Button>
          <Button
            disabled={stateDownload || startSending || stateDownload1}
            className="p-0 flex items-center justify-center bg-[#e91e63] hover:bg-[#e91e62e0]"
          >
            <NavLink
              to="/GROUPES"
              className="w-full h-full flex items-center justify-center p-2"
            >
              Retour à la page groupe
            </NavLink>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default UpdateGroupePage;

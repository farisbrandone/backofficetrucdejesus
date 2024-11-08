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
import { NavLink, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  requestToGetRessourcesDataWithId,
  requestToUpdateRessourcesData,
} from "@/fakeData";
import { RessourcesDataType } from "@/fakeData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const ressourceIcon = (width: string, heigth: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={heigth}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M10 14h4v-2h-4zm0-3h8V9h-8zm0-3h8V6h-8zM8 18q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-4 4q-.825 0-1.412-.587T2 20V6h2v14h14v2z"
      />
    </svg>
  );
};

function UpdateRessourcesPage() {
  const [titleRessource, setTitleRessource] = useState("");
  const [descriptionRessource, setDescriptionRessource] = useState("");
  const [imageRessource, setImageRessource] = useState("");
  const [urlRessources, setUrlRessources] = useState("");
  const [classDescription, setClassDescription] = useState(false);

  const [textButtonRessource, setTextButtonRessource] = useState("");

  const [typeRessources, setTypeRessources] = useState("");

  const [stateDownload, setStateDownload] = useState(false);
  const [classRessource, setClassRessource] = useState(false);

  const [classButtonRessource, setClassButtonRessource] = useState(false);

  const [classTypeRessources, setClassTypeRessources] = useState(false);
  const [classUrlRessources, setClassUrlRessources] = useState(false);
  const [classImageRessources, setClassImageRessources] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const { toast } = useToast();
  const { ressourceId } = useParams<string>();

  const handleTitleRessource = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleRessource(() => e.target.value);
    setClassRessource(false);
  };

  const handleDescriptionRessource = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescriptionRessource(() => e.target.value);
    setClassDescription(false);
  };

  const handleTextButtonRessource = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTextButtonRessource(() => e.target.value);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImageRessource(() => e.target.value);
    setClassImageRessources(false);
  };

  const handleUrlRessources = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUrlRessources(() => e.target.value);
    setClassUrlRessources(false);
  };

  const handleTypeRessources = (value: string) => {
    setTypeRessources(value);
  };

  const createNewRessource = async () => {
    setStartSending(() => true);
    if (
      !titleRessource ||
      !textButtonRessource ||
      !descriptionRessource ||
      !typeRessources ||
      !urlRessources
    ) {
      if (!titleRessource) {
        setClassRessource(true);
      }
      if (!textButtonRessource) {
        setClassButtonRessource(true);
      }

      if (!descriptionRessource) {
        setClassDescription(true);
      }

      if (!typeRessources) {
        setClassTypeRessources(true);
      }
      if (!urlRessources) {
        setClassUrlRessources(true);
      }
      if (!imageRessource) {
        setClassImageRessources(true);
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
      var data: RessourcesDataType = {
        titleRessource: titleRessource,
        descriptionRessource: descriptionRessource,
        imageRessource: imageRessource,
        textButtonRessource: textButtonRessource,
        typeRessources: typeRessources,
        urlRessources: urlRessources,
        date: "",
        id: ressourceId ? ressourceId : "",
      };
      console.log(data);
      const result = await requestToUpdateRessourcesData(data);
      console.log(result);

      if (result.success) {
        toast({
          title: "Success",
          description: "La ressources a été mis à jour avec success",
        });
        setStartSending(() => false);
        window.location.replace("/GERER LES RESSOURCES");
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
          "Une erreur est survenue pendant la mise à jour de la ressource",
      });
      setStartSending(() => false);
      console.error("");
    }
  };

  useEffect(() => {
    async function getEventDataForUpdateWithId() {
      try {
        const data = await requestToGetRessourcesDataWithId(
          ressourceId as string
        );
        setTitleRessource(data.titleRessource);
        setDescriptionRessource(data.descriptionRessource);
        setImageRessource(data.imageRessource);
        setTextButtonRessource(data.textButtonRessource);
        setTypeRessources(data.typeRessources);

        setUrlRessources(data.urlRessources);
      } catch (error) {
        setLoadingFail(true);
      }
    }
    getEventDataForUpdateWithId();
  }, []);

  if ((!titleRessource || !descriptionRessource) && !loadingFail) {
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
              {ressourceIcon("30", "30")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                AJOUTER UNE RESSOURCE
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
            Ajout d'une nouvelle ressource
          </CardTitle>
          <CardDescription>
            Remplir les champs suivants et ajouter un nouvelle ressource
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[16px] sm:text-[18px]">
          <div className="space-y-1">
            <Label htmlFor="titleRessource">
              Titre de la ressource <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="titleRessource"
              name="titleRessource"
              type="text"
              value={titleRessource}
              placeholder="Entrer le titre de la ressource"
              onChange={handleTitleRessource}
              className={`${classRessource ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="descriptionRessource">
              Description de la ressource
              <span className="text-[#e91e63]">*</span>
            </Label>
            <Textarea
              id="descriptionRessource"
              name="descriptionRessource"
              value={descriptionRessource}
              placeholder="Entrer une description de la ressouce"
              onChange={handleDescriptionRessource}
              required
              className={`${classDescription ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="textButtonRessource">
              Enter le texte du boutton{" "}
              <span className="text-[#e91e63]">*</span>
            </Label>
            <div className="flex items-center">
              <Input
                type="textButtonRessource"
                id="textButtonRessource"
                name="textButtonRessource"
                value={textButtonRessource}
                placeholder="Text du boutton"
                onChange={handleTextButtonRessource}
                required
                className={`${
                  classButtonRessource
                    ? "border-red-600 focus:rounded-l-none"
                    : "focus:rounded-l-none"
                }`}
                disabled={startSending}
              />
            </div>
          </div>

          <div className="space-y-2 " key="button1">
            <Label htmlFor="imageRessource">
              Insérer une image bannière pour la ressource {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2" key="button21">
              <Input
                key="button11"
                id="imageRessource"
                name="imageRessource"
                value={imageRessource}
                placeholder="Entrer une imageRessource représentant le logo du groupe"
                onChange={handleImage}
                disabled={stateDownload || startSending}
                className={` w-[180px] ${
                  classImageRessources
                    ? "border-red-600 focus:rounded-l-none"
                    : "focus:rounded-l-none"
                } space-y-2`}
              />
              <ButtonUploadFile
                name="file1"
                valueForHtml="drop-zone-1"
                key="button111"
                setImageUrl={setImageRessource}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
              />
            </div>
          </div>

          <Select
            value={typeRessources}
            onValueChange={(value: string) => handleTypeRessources(value)}
            disabled={startSending}
          >
            <p className="text-[14px] ">
              Sélectionner le type de fichier à inserer{" "}
            </p>
            <SelectTrigger
              className={` w-[180px] ${
                classTypeRessources
                  ? "border-red-600 focus:rounded-l-none"
                  : "focus:rounded-l-none"
              } space-y-2`}
            >
              <SelectValue placeholder="Sélectionner votre typeRessources" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sélection de fichier</SelectLabel>
                <SelectItem value="Vidéo">Vidéo</SelectItem>
                <SelectItem value="Document">
                  Document(word, pdf, powerpoint etc.){" "}
                </SelectItem>
                <SelectItem value="Image">
                  Image(JPEG, PNG, JPG etc.){" "}
                </SelectItem>
                <SelectItem value="Liens de site web">
                  Liens de site web
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="space-y-2 ">
            <Label htmlFor="urlRessources">
              Inserer le fichier associé à la ressource {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="urlRessources"
                name="urlRessources"
                value={urlRessources}
                placeholder="Entrer une image représentant la bannière de la communauté"
                onChange={handleUrlRessources}
                disabled={stateDownload || startSending}
                className={` w-[180px] ${
                  classUrlRessources
                    ? "border-red-600 focus:rounded-l-none"
                    : "focus:rounded-l-none"
                } space-y-2`}
              />
              <ButtonUploadFile
                setImageUrl={setUrlRessources}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
                name="ressources1"
                valueForHtml="ressources1"
                key="ressources1"
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
            onClick={createNewRessource}
          >
            Enregistrer
          </Button>
          <Button
            disabled={stateDownload || startSending}
            className="p-0 flex items-center justify-center bg-[#e91e63] hover:bg-[#e91e62e0]"
          >
            <NavLink
              to="/GERER DES RESSOURCES"
              className="w-full h-full flex items-center justify-center p-2"
            >
              Retour à la ressources
            </NavLink>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default UpdateRessourcesPage;

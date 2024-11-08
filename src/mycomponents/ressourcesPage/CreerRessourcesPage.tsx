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
import { requestToSetRessourcesData } from "@/fakeData";
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
import { ressourceIcon } from "./UpdateRessourcesPage";

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

function CreerRessourcesPage() {
  const [titleRessource, setTitleRessource] = useState("");
  const [descriptionRessource, setDescriptionRessource] = useState("");
  const [imageRessource, setImageRessource] = useState("");
  const [urlRessources, setUrlRessources] = useState("");
  const [classDescription, setClassDescription] = useState(false);

  const [textButtonRessource, setMotsDepasse] = useState("");

  const [typeRessources, setTypeRessources] = useState("");

  const [stateDownload, setStateDownload] = useState(false);
  const [classRessource, setClassRessource] = useState(false);

  const [classButtonRessource, setClassButtonRessource] = useState(false);

  const [classTypeRessources, setClassTypeRessources] = useState(false);
  const [classUrlRessources, setClassUrlRessources] = useState(false);
  const [classImageRessources, setClassImageRessources] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const { toast } = useToast();

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
    setMotsDepasse(() => e.target.value);
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
        id: "",
      };
      console.log(data);
      const result = await requestToSetRessourcesData(data);
      console.log(result);

      if (result.success) {
        toast({
          title: "Success",
          description: "Le membre a été crée avec success",
        });
        setStartSending(() => false);
        window.location.replace("/GERER LES MEMBRES");
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
              <span className="text-[#e91e63] border-[1px] bg-[#191919] p-[11px] rounded-l-lg">
                {" "}
                {cardenaIcon("15", "15")}{" "}
              </span>
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

export default CreerRessourcesPage;

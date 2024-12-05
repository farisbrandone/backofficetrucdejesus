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
import { ChangeEvent, useState, Fragment, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  requestToGetAllUniversalDataWithId,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { LessonLibraryDataType } from "@/fakeData";
/* import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; */
import { Textarea } from "@/components/ui/textarea";

import "react-quill/dist/quill.snow.css";

import ComplexeDescription from "../ui/ComplexeDescription";

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

function UpdateLessonLibrary() {
  const [titleLessonLibrary, setTitleLessonLibrary] = useState("");
  const [descriptionLessonLibrary, setDescriptionLessonLibrary] = useState("");
  const [imageLessonLibrary, setImageLessonLibrary] = useState("");
  const [urlLessonLibrary, setUrlLessonLibrary] = useState("");
  const [classDescription, setClassDescription] = useState(false);
  const [shortDescriptionLessonLibrary, setShortDescriptionLessonLibrary] =
    useState("");
  const [textButtonLessonLibrary, setTextButtonLessonLibrary] = useState("");

  const [typeLessonLibrary, setTypeLessonLibrary] = useState("");

  const [stateDownload, setStateDownload] = useState(false);
  const [classLessonLibrary, setClassLessonLibrary] = useState(false);
  const [
    classShortDescriptionLessonLibrary,
    setClassShortDescriptionLessonLibrary,
  ] = useState(false);
  const [classButtonLessonLibrary, setClassButtonLessonLibrary] =
    useState(false);

  const [classTypeLessonLibrarys, setClassTypeLessonLibrarys] = useState(false);
  const [classUrlLessonLibrarys, setClassUrlLessonLibrarys] = useState(false);
  const [classImageLessonLibrarys, setClassImageLessonLibrarys] =
    useState(false);
  const [startSending, setStartSending] = useState(false);

  const [loadingFail, setLoadingFail] = useState(false);
  const [status, setStatus] = useState("activate");
  const { toast } = useToast();
  const { lessonLibraryId } = useParams<string>();
  const [dataLesson, setDataLesson] = useState<LessonLibraryDataType>();
  /* const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Commencer à saisir la lesson...",
    }),
    []
  ); */
  console.log(classTypeLessonLibrarys);

  const handleTitleLessonLibrary = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleLessonLibrary(() => e.target.value);
    setClassLessonLibrary(false);
  };
  const handleShortDescriptionLessonLibrary = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setShortDescriptionLessonLibrary(() => e.target.value);
    setClassShortDescriptionLessonLibrary(false);
  };

  /* const handleDescriptionLessonLibrary = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setDescriptionLessonLibrary(() => e.target.value);
    setClassDescription(false);
  }; */

  const handleTextButtonLessonLibrary = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTextButtonLessonLibrary(() => e.target.value);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImageLessonLibrary(() => e.target.value);
    setClassImageLessonLibrarys(false);
  };

  const handleUrlLessonLibrarys = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUrlLessonLibrary(() => e.target.value);
    setClassUrlLessonLibrarys(false);
  };

  /* const handleTypeLessonLibrarys = (value: string) => {
    setTypeLessonLibrary(value);
  }; */

  const handleChangeStatusLessonLibrarys = () => {
    console.log(status);
    if (status === "activate") {
      setStatus("desactivate");
      return;
    }
    setStatus("activate");
  };

  const updateNewLessonLibrary = async () => {
    setStartSending(() => true);
    if (
      !titleLessonLibrary ||
      !textButtonLessonLibrary ||
      !descriptionLessonLibrary ||
      !typeLessonLibrary ||
      !urlLessonLibrary ||
      !shortDescriptionLessonLibrary
    ) {
      if (!titleLessonLibrary) {
        setClassLessonLibrary(true);
      }
      if (!textButtonLessonLibrary) {
        setClassButtonLessonLibrary(true);
      }

      if (!descriptionLessonLibrary) {
        setClassDescription(true);
      }
      if (!shortDescriptionLessonLibrary) {
        setClassShortDescriptionLessonLibrary(true);
      }

      if (!typeLessonLibrary) {
        setClassTypeLessonLibrarys(true);
      }
      if (!urlLessonLibrary) {
        setClassUrlLessonLibrarys(true);
      }
      if (!imageLessonLibrary) {
        setClassImageLessonLibrarys(true);
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
      var data: LessonLibraryDataType = {
        titleLessonLibrary: titleLessonLibrary,
        descriptionLessonLibrary: descriptionLessonLibrary,
        imageLessonLibrary: imageLessonLibrary,
        textButtonLessonLibrary: textButtonLessonLibrary,
        typeLessonLibrary: typeLessonLibrary,
        shortDescriptionLessonLibrary: shortDescriptionLessonLibrary,
        urlLessonLibrary: urlLessonLibrary,
        status: status,
        /* id: lessonLibraryId ? lessonLibraryId : "", */
      };
      console.log(data);
      const result =
        await requestToUpdateUniversalDataWithId<LessonLibraryDataType>(
          lessonLibraryId as string,
          "LessonLibraryData",
          data
        );
      console.log(result);

      if (result.success) {
        toast({
          title: "Success",
          description: "Le membre a été crée avec success",
        });
        setStartSending(() => false);
        window.location.replace(`/GERER LES LEÇONS/${dataLesson?.communityId}`);
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

  useEffect(() => {
    async function getEventDataForUpdateWithId() {
      try {
        const data =
          await requestToGetAllUniversalDataWithId<LessonLibraryDataType>(
            "LessonLibraryData",
            lessonLibraryId as string
          );
        setDataLesson(data);
        setTitleLessonLibrary(data.titleLessonLibrary);
        setDescriptionLessonLibrary(data.descriptionLessonLibrary);
        setShortDescriptionLessonLibrary(data.shortDescriptionLessonLibrary);
        setImageLessonLibrary(data.imageLessonLibrary);
        setTextButtonLessonLibrary(data.textButtonLessonLibrary);
        setTypeLessonLibrary(data.typeLessonLibrary);
        setStatus(data.status);
        setUrlLessonLibrary(data.urlLessonLibrary);
      } catch (error) {
        setLoadingFail(true);
      }
    }
    getEventDataForUpdateWithId();
  }, []);

  if ((!titleLessonLibrary || !descriptionLessonLibrary) && !loadingFail) {
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
              <span className="icon-[material-symbols--arrow-circle-left-rounded] text-3xl  mr-1 "></span>{" "}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                AJOUTER UNE LEÇON
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
            Ajout d'une nouvelle leçon
          </CardTitle>
          <CardDescription>
            Remplir les champs suivants et ajouter un nouvelle leçon
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[16px] sm:text-[18px]">
          <div className="space-y-1">
            <Label htmlFor="titleLessonLibrary">
              Titre de la leçon <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="titleLessonLibrary"
              name="titleLessonLibrary"
              type="text"
              value={titleLessonLibrary}
              placeholder="Entrer le titre de la leçon"
              onChange={handleTitleLessonLibrary}
              className={`${classLessonLibrary ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="shortDescriptionLessonLibrary">
              Courte description de la leçon
              <span className="text-[#e91e63]">*</span>
            </Label>
            <Textarea
              id="shortDescriptionLessonLibrary"
              name="shortDescriptionLessonLibrary"
              value={shortDescriptionLessonLibrary}
              placeholder="Entrer une courte description de la leçon"
              onChange={handleShortDescriptionLessonLibrary}
              required
              className={`${
                classShortDescriptionLessonLibrary ? "border-red-600" : ""
              }`}
              disabled={startSending}
            />
          </div>
          {typeLessonLibrary === "content" && (
            <div
              className={`${
                classDescription
                  ? "border-red-600 border-[1px] border-solid"
                  : ""
              }`}
            >
              <ComplexeDescription
                label="Description de la lecon"
                value={descriptionLessonLibrary}
                placeHolder="Commencer à saisir la lesson..."
                onBlurValue={(newContent) =>
                  setDescriptionLessonLibrary(newContent)
                }
              />
            </div>
          )}

          {/*  <div className="space-y-1">
            <Label htmlFor="descriptionLessonLibrary">
              Description de la leçon
              <span className="text-[#e91e63]">*</span>
            </Label>
            <JoditEditor
              ref={editor}
              value={descriptionLessonLibrary}
              config={config}
              // tabIndex of textarea
              onBlur={(newContent) => setDescriptionLessonLibrary(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {
                console.log({ newContent });
              }}
            />
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="textButtonLessonLibrary">
              Enter le texte du boutton{" "}
              <span className="text-[#e91e63]">*</span>
            </Label>
            <div className="flex items-center">
              <Input
                type="textButtonLessonLibrary"
                id="textButtonLessonLibrary"
                name="textButtonLessonLibrary"
                value={textButtonLessonLibrary}
                placeholder="Text du boutton"
                onChange={handleTextButtonLessonLibrary}
                required
                className={`${
                  classButtonLessonLibrary
                    ? "border-red-600 focus:rounded-l-none"
                    : "focus:rounded-l-none"
                }`}
                disabled={startSending}
              />
            </div>
          </div>
          <div className="felx flex-col items-center space-y-2">
            <input
              type="checkbox"
              id="statusId"
              value={status}
              checked={status === "activate"}
              onChange={handleChangeStatusLessonLibrarys}
            />
            <label
              htmlFor="statusId"
              className="ml-2 text-[16px] font-semibold"
            >
              Activé la leçon(status)
            </label>
          </div>

          <div className="space-y-2 " key="button1">
            <Label htmlFor="imageLessonLibrary">
              Insérer une image bannière pour la leçon {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2" key="button21">
              <Input
                key="button11"
                id="imageLessonLibrary"
                name="imageLessonLibrary"
                value={imageLessonLibrary}
                placeholder="Entrer une imageLessonLibrary représentant le logo du groupe"
                onChange={handleImage}
                disabled={stateDownload || startSending}
                className={` w-[180px] ${
                  classImageLessonLibrarys
                    ? "border-red-600 focus:rounded-l-none"
                    : "focus:rounded-l-none"
                } space-y-2`}
              />
              <ButtonUploadFile
                name="file1"
                valueForHtml="drop-zone-1"
                key="button111"
                setImageUrl={setImageLessonLibrary}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
              />
            </div>
          </div>

          {/*  <Select
            value={typeLessonLibrary}
            onValueChange={(value: string) => handleTypeLessonLibrarys(value)}
            disabled={startSending}
          >
            <p className="text-[14px] ">
              Sélectionner le type de fichier à inserer{" "}
            </p>
            <SelectTrigger
              className={` w-[180px] ${
                classTypeLessonLibrarys
                  ? "border-red-600 focus:rounded-l-none"
                  : "focus:rounded-l-none"
              } space-y-2`}
            >
              <SelectValue placeholder="Sélectionner votre typeLessonLibrary" />
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
          </Select> */}

          {typeLessonLibrary === "audio" && (
            <div className="space-y-2 ">
              <Label htmlFor="urlLessonLibrary">
                Inserer le fichier audio associé à la leçon{" "}
                <span className="text-[#e91e63]">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="urlLessonLibrary"
                  name="urlLessonLibrary"
                  value={urlLessonLibrary}
                  placeholder="Entrer le fichier audio associé à la leçon"
                  onChange={handleUrlLessonLibrarys}
                  disabled={stateDownload || startSending}
                  className={` w-[180px] ${
                    classUrlLessonLibrarys
                      ? "border-red-600 focus:rounded-l-none"
                      : "focus:rounded-l-none"
                  } space-y-2`}
                />
                <ButtonUploadFile
                  setImageUrl={setUrlLessonLibrary}
                  setStateDownloadProps={setStateDownload}
                  stateDownloadProps={stateDownload}
                  name="leçons1"
                  valueForHtml="leçons1"
                  key="leçons1"
                />
              </div>
            </div>
          )}

          {typeLessonLibrary === "video" && (
            <div className="space-y-2 ">
              <Label htmlFor="urlLessonLibrary">
                Inserer le fichier video associé à la leçon{" "}
                <span className="text-[#e91e63]">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="urlLessonLibrary"
                  name="urlLessonLibrary"
                  value={urlLessonLibrary}
                  placeholder="Entrer le fichier video associé à la leçon"
                  onChange={handleUrlLessonLibrarys}
                  disabled={stateDownload || startSending}
                  className={` w-[180px] ${
                    classUrlLessonLibrarys
                      ? "border-red-600 focus:rounded-l-none"
                      : "focus:rounded-l-none"
                  } space-y-2`}
                />
                <ButtonUploadFile
                  setImageUrl={setUrlLessonLibrary}
                  setStateDownloadProps={setStateDownload}
                  stateDownloadProps={stateDownload}
                  name="leçons1"
                  valueForHtml="leçons1"
                  key="leçons1"
                />
              </div>
            </div>
          )}
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter className="flex items-center gap-3 space-y-2">
          <Button
            disabled={stateDownload || startSending}
            onClick={updateNewLessonLibrary}
          >
            Enregistrer
          </Button>
          <Button
            disabled={stateDownload || startSending}
            className="p-0 flex items-center justify-center bg-[#e91e63] hover:bg-[#e91e62e0]"
          >
            <NavLink
              to={`/GERER LES LEÇONS/${dataLesson?.communityId}`}
              className="w-full h-full flex items-center justify-center p-2"
            >
              Retour aux leçons
            </NavLink>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default UpdateLessonLibrary;

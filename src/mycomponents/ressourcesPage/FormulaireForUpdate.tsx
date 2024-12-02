import { ChangeEvent, useEffect, useState } from "react";
import { globalState, initialState } from "./RessourcesFormulaire";
import {
  requestToGetRessourcesDataWithId,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { RessourcesDataType } from "@/fakeData";
import { useToast } from "@/hooks/use-toast";
import { storage } from "../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function FormulaireForUpdate({
  communityId,
  formChoice,
  setFormChoice,
  ressourceId,
}: {
  communityId: string;
  formChoice: globalState;
  setFormChoice: React.Dispatch<React.SetStateAction<globalState>>;
  ressourceId: string;
}) {
  const typeRes = formChoice.instructionState
    ? " Instructions"
    : formChoice.uploadState
    ? "File"
    : formChoice.urkState
    ? "URL Externe"
    : formChoice.videoState
    ? "Vidéo"
    : "Audio";
  const [titleRessource, setTitleRessource] = useState("");
  const [descriptionRessource, setDescriptionRessource] = useState("");
  const [imageRessource, setImageRessource] = useState("");
  const [urlRessources, setUrlRessources] = useState("");
  const [urlExterne, setUrlExterne] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [urlAudio, setUrlAudio] = useState("");
  const [instruction, setInstruction] = useState("");
  const [textButtonRessource, setTextButtonRessource] = useState("");
  const [stateDownloadProps, setStateDownloadProps] = useState(false);
  const [stateDownloadProps2, setStateDownloadProps2] = useState(false);

  const [classTitleRessource, setClassTitleRessource] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [typeRessources, setTypeRessources] = useState(typeRes);
  const [status, setStatus] = useState("activate");
  const { toast } = useToast();

  const handleTitleRessource = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleRessource(() => e.target.value);
    setClassTitleRessource(false);
  };

  const handleDescriptionRessource = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescriptionRessource(() => e.target.value);
  };

  const handleTextButtonRessource = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTextButtonRessource(() => e.target.value);
  };

  const handleUrlExterne = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUrlExterne(() => e.target.value);
  };

  const handleUrlVideo = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUrlVideo(() => e.target.value);
  };

  const handleUrlAudio = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUrlAudio(() => e.target.value);
  };

  const handleInstruction = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setInstruction(() => e.target.value);
  };

  /************************************************ */

  const handleImageRessource = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e?.target.files) return;
    /*  if (e.target.name === "file1") return;
  if (e.target.name === "file2") return; */
    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setStateDownloadProps(() => {
          return true;
        });
        console.log("ntamnyam");
        const progression = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progression);
      },
      (error) => {
        /*  setErrorDownload("une erreur est survenue pendant le chargement"); */
        setStateDownloadProps(false);
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "une erreur est survenue pendant le chargement " + error.message,
        });
        console.error(error);
      },
      () => {
        // Get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageRessource(downloadURL);
          setStateDownloadProps(false);
          /*  setSuccessDownload("le telechargement s'est fait avec success"); */
          toast({
            title: "Success",
            description: "le telechargement s'est fait avec success",
          });
        });
      }
    );
  };

  /************************************************* */

  /************************************************ */

  const handleUrlRessources = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e?.target.files) return;
    /*  if (e.target.name === "file1") return;
  if (e.target.name === "file2") return; */
    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setStateDownloadProps2(() => {
          return true;
        });
        console.log("ntamnyam");
        const progression = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress2(progression);
      },
      (error) => {
        /*  setErrorDownload("une erreur est survenue pendant le chargement"); */
        setStateDownloadProps2(false);
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "une erreur est survenue pendant le chargement " + error.message,
        });
        console.error(error);
      },
      () => {
        // Get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrlRessources(downloadURL);
          setStateDownloadProps(false);
          /*  setSuccessDownload("le telechargement s'est fait avec success"); */
          toast({
            title: "Success",
            description: "le telechargement s'est fait avec success",
          });
        });
      }
    );
  };

  /************************************************* */

  const createNewRessource = async () => {
    setStartSending(() => true);
    if (!titleRessource) {
      if (!titleRessource) {
        setClassTitleRessource(true);
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
      console.log("inside try");
      var data: RessourcesDataType = {
        communityId,
        titleRessource,
        descriptionRessource,
        imageRessource,
        urlRessources,
        urlExterne,
        urlVideo,
        urlAudio,
        instruction,
        textButtonRessource,
        typeRessources,
        status,
        dateOfCreation: "",
        dateOfUpdate: "",
      };
      console.log(data);
      const result =
        await requestToUpdateUniversalDataWithId<RessourcesDataType>(
          ressourceId,
          "RessourcesData",
          data
        );
      console.log(result);

      if (result.success) {
        console.log("shunga");
        toast({
          title: "Success",
          description: "Le groupe à été crée avec success",
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
          "Une erreur est survenue pendant la création du groupe, vérifier votre connexion",
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
        setDescriptionRessource(data.descriptionRessource as string);
        setImageRessource(data.imageRessource as string);
        setTextButtonRessource(data.textButtonRessource as string);
        setInstruction(data.instruction as string);
        setUrlExterne(data.urlExterne as string);
        setUrlAudio(data.urlAudio as string);
        setUrlVideo(data.urlVideo as string);
        setTypeRessources(data.typeRessources as string);
        setStatus(data.status);
        setUrlRessources(data.urlRessources as string);
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
    <div className="w-full p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name">
          {" "}
          Nom <span className="text-[#e91e63] ">*</span>{" "}
        </label>
        <input
          id="name"
          type="text"
          value={titleRessource}
          onChange={handleTitleRessource}
          disabled={startSending}
          className={`${
            classTitleRessource ? "border-red-600" : ""
          }  border-[1px] border-[#000]/20 border-solid focus:outline-none  w-full p-2 rounded-lg`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description"> Description </label>
        <textarea
          id="description"
          rows={2}
          value={descriptionRessource}
          className="border-[1px] border-[#000]/20 border-solid focus:outline-none  w-full p-2 rounded-lg"
          onChange={handleDescriptionRessource}
          disabled={startSending}
        />
      </div>

      <div className="flex flex-col gap-[2px]">
        <label htmlFor="Image" className="flex items-center">
          <p>Image</p>
          {stateDownloadProps ? (
            <div className="flex items-center">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
              <span> {progress} </span>
            </div>
          ) : (
            ""
          )}
        </label>
        <div className="flex items-center gap-0">
          <input
            id="Image"
            type="text"
            value={imageRessource}
            className="border-[1px] border-[#000]/20 border-solid focus:outline-none  w-full p-2 rounded-lg"
            placeholder="Url de l'image"
          />
          <label
            htmlFor="upload"
            className="bg-[#191919] text-white  w-[115px] h-[40px] flex items-center justify-center rounded-r-md  "
          >
            ADD IMAGE
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            onChange={handleImageRessource}
            disabled={stateDownloadProps || startSending}
          />
        </div>
        <p className="-mt-1 text-[12px] ">
          Taille recommandée(px): 700*525 [Format PNG or JPEG]
        </p>
      </div>

      {formChoice.instructionState && (
        <div className="flex flex-col gap-1">
          <label htmlFor="instruction"> Instruction </label>
          <textarea
            id="instruction"
            rows={2}
            value={instruction}
            className="border-[1px] border-[#000]/20 border-solid focus:outline-none  w-full p-2 rounded-lg"
            onChange={handleInstruction}
          />
        </div>
      )}

      {formChoice.uploadState && (
        <div className="flex flex-col gap-1">
          <label htmlFor="upload" className="flex items-center">
            <p>
              Télécharger un fichier (pdf, zip, doc, txt, png, jpg, svg, gif){" "}
            </p>
            {stateDownloadProps2 ? (
              <div className="flex items-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                <span> {progress2} </span>
              </div>
            ) : (
              ""
            )}
          </label>
          <div className="flex items-center gap-0">
            <input
              id="upload"
              type="file"
              className="border-[1px] border-[#000]/20 border-solid focus:outline-none  w-full p-2 rounded-lg"
              placeholder="Télécharger un fichier"
              onChange={handleUrlRessources}
              disabled={stateDownloadProps2 || startSending}
            />
          </div>
        </div>
      )}

      {formChoice.urkState && (
        <div className="flex flex-col gap-1">
          <label htmlFor="extUrl">
            URL externe<span className="text-[#e91e63] ">*</span>{" "}
          </label>
          <input
            id="extUrl"
            type="text"
            value={urlExterne}
            placeholder="URL externe"
            className="border-[1px] border-[#000]/20 border-solid focus:outline-none  w-full p-2 rounded-lg"
            onChange={handleUrlExterne}
            disabled={startSending}
          />
        </div>
      )}

      {formChoice.videoState && (
        <div className="flex flex-col gap-1">
          <label htmlFor="videoUrl">
            URL de la vidéo<span className="text-[#e91e63] ">*</span>{" "}
          </label>
          <input
            id="videoUrl"
            type="text"
            value={urlVideo}
            placeholder="Url de la vidéo"
            className="border-[1px] border-[#000]/20 border-solid focus:outline-none  w-full p-2 rounded-lg"
            onChange={handleUrlVideo}
            disabled={startSending}
          />
        </div>
      )}

      {formChoice.audioState && (
        <div className="flex flex-col gap-1">
          <label htmlFor="audioUrl">
            URL de la vidéo<span className="text-[#e91e63] ">*</span>{" "}
          </label>
          <input
            id="audioUrl"
            type="text"
            value={urlAudio}
            placeholder="Url de l'audio"
            className="border-[1px] border-[#000]/20 border-solid focus:outline-none  w-full p-2 rounded-lg"
            onChange={handleUrlAudio}
            disabled={startSending}
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="name"> Texte du bouton </label>
        <input
          id="name"
          type="text"
          value={textButtonRessource}
          className="border-[1px] border-[#000]/20 border-solid focus:outline-none  w-full p-2 rounded-lg"
          onChange={handleTextButtonRessource}
          disabled={startSending}
        />
      </div>
      {startSending && (
        <div>Patienter l'action est en cours d'éxécution...</div>
      )}
      <div className="flex items-center gap-3">
        <button
          className="bg-[#191919] flex items-center gap-1 p-2 rounded-md text-white"
          disabled={stateDownloadProps || stateDownloadProps2 || startSending}
          onClick={createNewRessource}
        >
          <span className="icon-[fa-solid--save]"></span> <p>ENREGISTRER</p>
        </button>
        <button
          className="border-[1px] border-[#191919] border-solid hover:border-[#e93e63] hover:text-[#e93e63] p-2 rounded-md flex items-center"
          onClick={() => setFormChoice({ ...initialState })}
        >
          <span className="icon-[material-symbols--arrow-circle-left]"></span>{" "}
          <p>RETOUR</p>
        </button>
      </div>
    </div>
  );
}

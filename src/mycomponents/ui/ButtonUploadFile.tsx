import React, { ChangeEvent, useState } from "react";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";

type typesetStateBollean = React.Dispatch<React.SetStateAction<boolean>>;
type typesetStatestring = React.Dispatch<React.SetStateAction<string>>;

interface statePropsButtons {
  setImageUrl: typesetStatestring;
  setStateDownload: typesetStateBollean;
  stateDownload: boolean;
}

function ButtonUploadFile({
  setImageUrl,
  setStateDownload,
  stateDownload,
}: statePropsButtons) {
  /* const [file, setFile] = useState(null);
  const [url, setUrl] = useState(""); */
  const [progress, setProgress] = useState(0);
  /*  const [errorDownload, setErrorDownload] = useState("");
  const [successDownload, setSuccessDownload] = useState(""); */
  /* const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }; */
  const { toast } = useToast();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e?.target.files) return;
    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setStateDownload(() => {
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
        setStateDownload(() => {
          return false;
        });
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
          setImageUrl(() => downloadURL);
          setStateDownload(() => {
            return false;
          });
          /*  setSuccessDownload("le telechargement s'est fait avec success"); */
          toast({
            title: "Success",
            description: "le telechargement s'est fait avec success",
          });
        });
      }
    );
  };
  return (
    <div
      title="Charger des fichiers localement et obtenez des urls"
      className="flex items-center justify-center w-[150px]"
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full p-1 border-2 border-[#bd10e0] border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {stateDownload ? (
          <div className="flex items-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
            <span> {progress} </span>
          </div>
        ) : (
          <div className="flex  items-center gap-1 p-0">
            <svg
              className="w-8 h-8  text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="text-[8px] text-gray-500 dark:text-gray-400">
              <span className="font-semibold"> Upload </span>{" "}
              <span className="text-[8px] text-gray-500 dark:text-gray-400">
                {" "}
                (SVG, PNG, JPG or GIF)
              </span>
            </p>
          </div>
        )}

        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={stateDownload}
        />
      </label>
    </div>
  );
}

export default ButtonUploadFile;

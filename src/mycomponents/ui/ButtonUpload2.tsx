import React, { ChangeEvent, useState } from "react";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";

type typesetStateBollean = React.Dispatch<React.SetStateAction<boolean>>;
type typesetStatestring = React.Dispatch<React.SetStateAction<string>>;

interface statePropsButtonse {
  key: string;
  setImageUrle: typesetStatestring;
  setStateDownloadPropse: typesetStateBollean;
  stateDownloadPropse: boolean;
}

function ButtonUploadFile2({
  key,
  setImageUrle,
  setStateDownloadPropse,
  stateDownloadPropse,
}: statePropsButtonse) {
  /* const [file, setFile] = useState(null);
    const [url, setUrl] = useState(""); */
  const [progress2, setProgress2] = useState(0);
  /*  const [errorDownload, setErrorDownload] = useState("");
    const [successDownload, setSuccessDownload] = useState(""); */
  /* const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    }; */
  const { toast } = useToast();
  const handleFileChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e?.target.files) return;
    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setStateDownloadPropse(() => {
          return true;
        });
        console.log("sonko");
        const progression = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress2(progression);
      },
      (error) => {
        /*  setErrorDownload("une erreur est survenue pendant le chargement"); */
        setStateDownloadPropse(false);
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
          setImageUrle(downloadURL);
          setStateDownloadPropse(false);
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
      key={key}
      title="Charger des fichiers localement et obtenez des urls"
      className="flex items-center justify-center w-[150px]"
    >
      <label
        htmlFor="dropzone-file2"
        className="flex flex-col items-center justify-center w-full p-1 bg-[#191919] text-white rounded-r-sm cursor-pointer"
      >
        {stateDownloadPropse ? (
          <div className="flex items-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
            <span> {progress2} </span>
          </div>
        ) : (
          <div className="flex  items-center gap-1 p-0">
            <p className="text-[8px] text-gray-500 dark:text-gray-400">
              UPLOAD
            </p>
          </div>
        )}

        <input
          name="file2"
          id="dropzone-file2"
          type="file"
          className="hidden"
          onChange={handleFileChange2}
          disabled={stateDownloadPropse}
        />
      </label>
    </div>
  );
}

export { ButtonUploadFile2 };

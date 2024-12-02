import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import ButtonUploadFile from "@/mycomponents/ui/ButtonUploadFile";
import { ChangeEvent, useEffect, useState } from "react";

export type FacebookShareForGroupeData = {
  facebookPostTitle: string;
  facebookPostDescription: string;
  facebookPostImage: string;
  groupeId: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
};
function FacebookGroupeShare({
  groupeId,
  setHiddenForAll,
  setOpenFacebookGroupeShare,
}: {
  groupeId: string;
  setHiddenForAll: (x: boolean) => void;
  setOpenFacebookGroupeShare: (x: boolean) => void;
}) {
  const [facebookPostTitle, setFacebookPostTitle] = useState("");
  const [facebookPostDescription, setFacebookPostDescription] = useState("");
  const [facebookPostImage, setFacebookPostImage] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [alreadyExist, setAlreadyExist] =
    useState<FacebookShareForGroupeData>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const handleFacebookPostTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFacebookPostTitle(e.target.value);
  };

  const handleFacebookPostDescription = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setFacebookPostDescription(e.target.value);
  };

  const handleFacebookPostImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFacebookPostImage(e.target.value);
  };

  const submitFacebookShare = async () => {
    if (!facebookPostTitle || !facebookPostDescription || !facebookPostImage) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "tous les champ ne sont pas remplis",
      });
      return;
    }

    const data = {
      facebookPostTitle,
      facebookPostDescription,
      facebookPostImage,
      groupeId,
    };

    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<FacebookShareForGroupeData>(
            alreadyExist.id as string,
            "FacebookShareForGroupeData",
            data
          );

        if (result.success) {
          toast({
            title: "Success",
            description: " success",
          });
          setStartSending(() => false);
          return;
        } else {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "Une erreur est survenue cotée serveur",
          });
          setStartSending(() => false);
          return;
        }
      } catch (error) {}
    }
    const resultAll =
      await requestToSetUniversalData<FacebookShareForGroupeData>(
        "FacebookShareForGroupeData",
        data
      );
    if (resultAll.success) {
      toast({
        title: "Success",
        description: " success",
      });
      setStartSending(() => false);
      return;
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue cotée serveur",
      });
      setStartSending(() => false);
      return;
    }
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoadingData(true);
        const result = (
          await requestTogetAllUniversalData<FacebookShareForGroupeData>(
            "FacebookShareForGroupeData"
          )
        ).filter((value) => value.groupeId === groupeId);
        setLoadingData(false);
        if (result.length > 0) {
          setAlreadyExist({ ...result[0] });
          setFacebookPostTitle(result[0].facebookPostTitle);
          setFacebookPostDescription(result[0].facebookPostDescription);
          setFacebookPostImage(result[0].facebookPostImage);

          return;
        }
      } catch (error) {
        setLoadingFail(false);
      }
    };
    getAllData();
  }, []);

  if (loadingData) {
    return (
      <div className="fixed bg-[#000]/50 flex flex-col items-center justify-center top-0 right-0 bottom-0 left-0 z-10">
        Loading...
      </div>
    );
  }

  if (loadingFail) {
    return (
      <div className="fixed bg-[#000]/50 flex flex-col items-center justify-center top-0 right-0 bottom-0 left-0 z-10">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <div className="fixed   bg-[#000]/50 flex flex-col items-center top-0 right-0 bottom-0 left-0 z-10 ">
      <div className="w-[800px] flex flex-col p-0 bg-white mt-[200px] rounded-lg ">
        <div className=" w-full p-2 bg-[#e91e63] text-white flex justify-between items-center rounded-t-lg">
          <p className="font-bold"> Facebook Share Settings</p>
          <button
            title="Fermer"
            type="button"
            onClick={() => {
              setHiddenForAll(true);
              setOpenFacebookGroupeShare(false);
            }}
          >
            <span className="icon-[ooui--close]"></span>
          </button>
        </div>
        <div className="flex flex-col items-start w-full gap-5 mt-1 p-5">
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="PostTitle">FB Post Title</Label>
            <Input
              id="PostTitle"
              placeholder=""
              value={facebookPostTitle}
              onChange={handleFacebookPostTitle}
              className="border-solid border-[1px] border-[#000]/30  "
            />
          </div>
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="postDescription">FB Post Description</Label>
            <Textarea
              id="postDescription"
              placeholder=""
              value={facebookPostDescription}
              onChange={handleFacebookPostDescription}
              className="border-solid border-[1px] border-[#000]/30  "
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="facebookPostImage">FB Post Image</Label>
            <div className="flex items-center gap-2" key="button21">
              <Input
                key="button11"
                id="facebookPostImage"
                name="facebookPostImage"
                value={facebookPostImage}
                placeholder="Image Path"
                onChange={handleFacebookPostImage}
                disabled={stateDownload || startSending}
                className="border-solid border-[1px] border-[#000]/30  "
              />
              <ButtonUploadFile
                name="file1"
                valueForHtml="drop-zone-1"
                key="button111"
                setImageUrl={setFacebookPostImage}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
              />
            </div>
            <p className="text-[10px] ">Recommented Size : 200*200</p>
          </div>
        </div>
        <div className=" mb-2 ml-2">
          {startSending && (
            <div>Patienter l'action est en cours d'éxécution...</div>
          )}

          <Button
            type="button"
            disabled={startSending}
            onClick={submitFacebookShare}
            className=""
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FacebookGroupeShare;

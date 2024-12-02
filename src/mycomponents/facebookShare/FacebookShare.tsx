import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import ButtonUploadFile from "../ui/ButtonUploadFile";
import {
  FacebookShareData,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";

export function FacebookShare({
  communityId,
  title,
  icon,
}: {
  communityId: string;
  title: string;
  icon: JSX.Element;
}) {
  const [facebookPostTitle, setFacebookPostTitle] = useState("");
  const [facebookPostDescription, setFacebookPostDescription] = useState("");
  const [facebookPostImage, setFacebookPostImage] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState<FacebookShareData>();
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
      return;
    }
    const data: FacebookShareData = {
      facebookPostTitle,
      facebookPostDescription,
      facebookPostImage,
      communityId,
    };
    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<FacebookShareData>(
            alreadyExist.id as string,
            "FacebookShareData",
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
    const resultAll = await requestToSetUniversalData<FacebookShareData>(
      "FacebookShareData",
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
          await requestTogetAllUniversalData<FacebookShareData>(
            "FacebookShareData"
          )
        ).find((value) => value.id === communityId);
        setLoadingData(false);
        if (result) {
          setAlreadyExist({ ...result });
          setFacebookPostTitle(result.facebookPostTitle);
          setFacebookPostDescription(result.facebookPostDescription);
          setFacebookPostImage(result.facebookPostImage);

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
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center  gap-1 text-[14px] hover:text-[#e91e63] w-full ">
          {" "}
          <p className="ml-2">
            {icon} <span className="ml-1">{title}</span>
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[530px]">
        <DialogHeader className="bg-[#e91e62] text-white py-2 px-1 text-[18px] mt-0 rounded-md">
          <DialogTitle>Facebook Share Settings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start w-full gap-5 mt-1">
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
        <DialogFooter className="mt-2">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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

import {
  CustumScriptData,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";

export function CustumScript({
  communityId,
  title,
  icon,
}: {
  communityId: string;
  title: string;
  icon: JSX.Element;
}) {
  const [fBRetargetingPixel, setFBRetargetingPixel] = useState("");
  const [perfectAudiencePixel, setPerfectAudiencePixel] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [startSending, setStartSending] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState<CustumScriptData>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const handleFBRetargetingPixel = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setFBRetargetingPixel(e.target.value);
  };

  const handlePerfectAudiencePixel = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setPerfectAudiencePixel(e.target.value);
  };

  const handleCodeSnippet = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setCodeSnippet(e.target.value);
  };

  const submitFacebookShare = async () => {
    if (!fBRetargetingPixel || !perfectAudiencePixel || !codeSnippet) {
      return;
    }
    const data: CustumScriptData = {
      fBRetargetingPixel,
      perfectAudiencePixel,
      codeSnippet,
      communityId,
    };
    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<CustumScriptData>(
            alreadyExist.id as string,
            "CustumScriptData",
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
    const resultAll = await requestToSetUniversalData<CustumScriptData>(
      "CustumScriptData",
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
          await requestTogetAllUniversalData<CustumScriptData>(
            "CustumScriptData "
          )
        ).find((value) => value.communityId === communityId);
        setLoadingData(false);
        if (result) {
          setAlreadyExist({ ...result });
          setFBRetargetingPixel(result.fBRetargetingPixel);
          setCodeSnippet(result.codeSnippet);
          setPerfectAudiencePixel(result.perfectAudiencePixel);

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
          <DialogTitle>Custom Scripts</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start w-full gap-5 mt-1">
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="PostTitle">FB Retargeting Pixel</Label>
            <Textarea
              id="PostTitle"
              placeholder=""
              value={fBRetargetingPixel}
              onChange={handleFBRetargetingPixel}
              className="border-solid border-[1px] border-[#000]/30  "
              disabled={startSending}
            />
            <p className="text-[10px] ">
              <span className="font-bold">Note :</span> This script goes inside
              head tag.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="postDescription">Perfect Audience Pixel</Label>
            <Textarea
              id="postDescription"
              placeholder=""
              value={perfectAudiencePixel}
              onChange={handlePerfectAudiencePixel}
              className="border-solid border-[1px] border-[#000]/30  "
              disabled={startSending}
            />
            <p className="text-[10px] ">
              <span className="font-bold">Note :</span> This script goes inside
              at the beginning of <strong>body</strong> tag.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="codeSnippet">
              Adroll Pixel/Google Analytics/Addthis.com Code Snippet
            </Label>
            <div className="flex items-center gap-2" key="button21">
              <Textarea
                key="button11"
                id="codeSnippet"
                name="codeSnippet"
                value={codeSnippet}
                placeholder="Image Path"
                onChange={handleCodeSnippet}
                disabled={startSending}
                className="border-solid border-[1px] border-[#000]/30  "
              />
            </div>
            <p className="text-[10px] ">
              <strong>Note :</strong> This script goes inside at the end of body
              tag.
            </p>
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

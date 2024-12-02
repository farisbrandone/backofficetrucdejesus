import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import { ChangeEvent, useEffect, useState } from "react";

export type CustumScriptForGroupeData = {
  fBRetargetingPixel: string;
  perfectAudiencePixel: string;
  codeSnippet: string;
  groupeId: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
};

export default function CustumScriptForGroupe({
  groupeId,
  setHiddenForAll,
  setOpenScriptGroupeShare,
}: {
  groupeId: string;
  setHiddenForAll: (x: boolean) => void;
  setOpenScriptGroupeShare: (x: boolean) => void;
}) {
  const [fBRetargetingPixel, setFBRetargetingPixel] = useState("");
  const [perfectAudiencePixel, setPerfectAudiencePixel] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [startSending, setStartSending] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState<CustumScriptForGroupeData>();
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

  const submitCustumScript = async () => {
    if (!fBRetargetingPixel || !perfectAudiencePixel || !codeSnippet) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "tous les champ ne sont pas remplis",
      });
      return;
    }

    const data = {
      fBRetargetingPixel,
      perfectAudiencePixel,
      codeSnippet,
      groupeId,
    };

    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<CustumScriptForGroupeData>(
            alreadyExist.id as string,
            "CustumScriptForGroupeData",
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
      await requestToSetUniversalData<CustumScriptForGroupeData>(
        "CustumScriptForGroupeData",
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
          await requestTogetAllUniversalData<CustumScriptForGroupeData>(
            "CustumScriptForGroupeData"
          )
        ).filter((value) => value.groupeId === groupeId);
        setLoadingData(false);
        if (result.length > 0) {
          setAlreadyExist({ ...result[0] });
          setFBRetargetingPixel(result[0].fBRetargetingPixel);
          setCodeSnippet(result[0].codeSnippet);
          setPerfectAudiencePixel(result[0].perfectAudiencePixel);

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
          <p className="font-bold"> Custom Scripts</p>
          <button
            title="Fermer"
            type="button"
            onClick={() => {
              setHiddenForAll(true);
              setOpenScriptGroupeShare(false);
            }}
          >
            <span className="icon-[ooui--close]"></span>
          </button>
        </div>

        <div className="flex flex-col items-start w-full gap-5 mt-3 p-3">
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
        <div className="mb-2 ml-2">
          {startSending && (
            <div>Patienter l'action est en cours d'éxécution...</div>
          )}

          <Button
            type="button"
            disabled={startSending}
            onClick={submitCustumScript}
            className=""
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
}

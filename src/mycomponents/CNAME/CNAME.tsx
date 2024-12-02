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
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  CNAMEData,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { Input } from "@/components/ui/input";

export function CNAME({
  title,
  icon,
  communityId,
}: {
  title: string;
  icon: JSX.Element;
  communityId: string;
}) {
  const [CNAMEURL, setCNAMEURL] = useState("");

  const [startSending, setStartSending] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState<CNAMEData>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const handleCNAMEURL = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCNAMEURL(e.target.value);
  };

  const submitCNAME = async () => {
    if (!CNAMEURL) {
      return;
    }
    const data: CNAMEData = {
      CNAMEURL,
      communityId,
    };
    if (alreadyExist) {
      try {
        const result = await requestToUpdateUniversalDataWithId<CNAMEData>(
          alreadyExist.id as string,
          "CNAMEData",
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
    const resultAll = await requestToSetUniversalData<CNAMEData>(
      "CNAMEData",
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
          await requestTogetAllUniversalData<CNAMEData>("CNAMEData ")
        ).find((value) => value.communityId === communityId);
        setLoadingData(false);
        if (result) {
          setAlreadyExist({ ...result });
          setCNAMEURL(result.CNAMEURL);
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
          <DialogTitle>CName</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start w-full gap-5 mt-1">
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="PostTitle">CNAME URL</Label>
            <Input
              id="PostTitle"
              placeholder="Entrez ici l'URL de votre domaine ou sous-domaine - https://example.com"
              value={CNAMEURL}
              onChange={handleCNAMEURL}
              className="border-solid border-[1px] border-[#000]/30  "
              disabled={startSending}
            />
            <p className="text-[12px] ">
              Veuillez vous assurer que le <strong>CNAME</strong> pointe vers(
              <strong>trucdejesus.smartcommunity.biz</strong>) <br />
              <br /> <strong>Note:</strong> Pour éviter les erreurs de sécurité,
              assurez-vous que vous avez installé SSL pour le domaine ou le
              sous-domaine que vous voulez mapper avec la communauté. <br />
              Cloudflare fournit un SSL par défaut pour les domaines et
              sous-domaines hébergés.
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
            onClick={submitCNAME}
            className=""
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

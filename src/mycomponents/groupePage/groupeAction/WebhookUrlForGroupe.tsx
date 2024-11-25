import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import { ChangeEvent, useEffect, useState } from "react";

export type WebhookUrlForGroupeData = {
  webhookUrl: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
};

export default function WebhookUrlForGroupe({
  setHiddenForAll,
  setOpenWebhookUrlForGroupe,
}: {
  setHiddenForAll: (x: boolean) => void;
  setOpenWebhookUrlForGroupe: (x: boolean) => void;
}) {
  const [webhookUrl, setWebhookUrl] = useState("");
  webhookUrl;

  const [startSending, setStartSending] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState<WebhookUrlForGroupeData>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const handleWebhookUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWebhookUrl(e.target.value);
  };

  const submitWebhookUrlForGroupe = async () => {
    if (!webhookUrl) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "tous les champ ne sont pas remplis",
      });
      return;
    }

    const data = {
      webhookUrl,
    };

    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<WebhookUrlForGroupeData>(
            alreadyExist.id as string,
            "WebhookUrlForGroupeData",
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
    const resultAll = await requestToSetUniversalData<WebhookUrlForGroupeData>(
      "WebhookUrlForGroupeData",
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
        const result =
          await requestTogetAllUniversalData<WebhookUrlForGroupeData>(
            "WebhookUrlForGroupeData"
          );
        setLoadingData(false);
        if (result.length > 0) {
          setAlreadyExist({ ...result[0] });
          setWebhookUrl(result[0].webhookUrl);

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
          <p className="font-bold"> WEBHOOK URL</p>
          <button
            title="Fermer"
            type="button"
            onClick={() => {
              setHiddenForAll(true);
              setOpenWebhookUrlForGroupe(false);
            }}
          >
            <span className="icon-[ooui--close]"></span>
          </button>
        </div>

        <div className="flex flex-col items-start w-full gap-5 mt-3 p-5">
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="PostTitle">Webhook URL</Label>
            <Input
              id="PostTitle"
              placeholder="Entrez Votre Webhook URL"
              value={webhookUrl}
              onChange={handleWebhookUrl}
              className="border-solid border-[1px] border-[#000]/30  "
              disabled={startSending}
            />
            <p className="text-[12px] ">
              <strong>Note:</strong> Collez l'url du webhook ci-dessus que vous
              voulez passer à la demande de post automatisé. Lorsqu'une action
              optin se produit dans cette communauté, nous envoyons une requête
              HTTP POST au webhook. Nous enverrons une requête HTTP POST à l'URL
              du webhook que vous avez définie ci-dessus.
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
            onClick={submitWebhookUrlForGroupe}
            className=""
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
}

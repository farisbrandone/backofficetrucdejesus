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
import { ChangeEvent, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { requestToSetWebhookUrlData, WebhookUrlData } from "@/fakeData";
import { Input } from "@/components/ui/input";

export function WebhookUrl({
  title,
  icon,
}: {
  title: string;
  icon: JSX.Element;
}) {
  const [webhookUrl, setWebhookUrl] = useState("");
  webhookUrl;

  const [startSending, setStartSending] = useState(false);

  const handleWebhookUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWebhookUrl(e.target.value);
  };

  const submitWebhookUrl = async () => {
    if (!webhookUrl) {
      return;
    }
    const data: WebhookUrlData = {
      webhookUrl,

      date: "",
      id: "",
    };
    const result = await requestToSetWebhookUrlData(data);
    if (result.success) {
      toast({
        title: "Success",
        description: " success",
      });
      setStartSending(() => false);
    }
  };
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
          <DialogTitle>WEBHOOK URL</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start w-full gap-5 mt-1">
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
        <DialogFooter className="mt-2">
          {startSending && (
            <div>Patienter l'action est en cours d'éxécution...</div>
          )}

          <Button
            type="button"
            disabled={startSending}
            onClick={submitWebhookUrl}
            className=""
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

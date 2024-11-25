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
import { ChangeEvent, useState } from "react";
import { toast } from "@/hooks/use-toast";

import { CustumScriptData, requestToSetCustumScriptData } from "@/fakeData";

export function CustumScript({
  title,
  icon,
}: {
  title: string;
  icon: JSX.Element;
}) {
  const [fBRetargetingPixel, setFBRetargetingPixel] = useState("");
  const [perfectAudiencePixel, setPerfectAudiencePixel] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [startSending, setStartSending] = useState(false);

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
      date: "",
      id: "",
    };
    const result = await requestToSetCustumScriptData(data);
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

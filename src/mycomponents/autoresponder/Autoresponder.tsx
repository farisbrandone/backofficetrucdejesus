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
import { useEffect, useState } from "react";
import {
  CheckboxSupprtHTTPS,
  SelectLabelAutoresponder,
  SelectLabelEmail,
  SelectLabelFirstName,
  SelectLabelPhone,
  SelectLabelWebinar,
} from "./SelectLabelAutoresponder";
import {
  AutoresponderDataType,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";

export function Autoresponder({
  title,
  icon,
  communityId,
}: {
  title: string;
  icon: JSX.Element;
  communityId: string;
}) {
  const [webinarValue, setWebinarValue] = useState("");
  const [autoresponderValue, setAutoresponderValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [supportHTTPSValue, setSupportHTTPSValue] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState<AutoresponderDataType>();
  const handleWebinar = (value: string) => {
    setWebinarValue(value);
  };
  const handleAutoresponder = (value: string) => {
    setAutoresponderValue(value);
  };
  const handleFirstName = (value: string) => {
    setFirstNameValue(value);
  };

  const handleEmailValue = (value: string) => {
    setEmailValue(value);
  };
  const handlePhoneValue = (value: string) => {
    setPhoneValue(value);
  };
  const handleSupportHTTPSValue = () => {
    setSupportHTTPSValue((prev) => !prev);
  };

  const submitAutoresponder = async () => {
    if (
      !webinarValue ||
      !autoresponderValue ||
      !firstNameValue ||
      !emailValue ||
      !phoneValue ||
      !supportHTTPSValue
    ) {
      return;
    }
    const data = {
      webinarValue,
      autoresponderValue,
      firstNameValue,
      emailValue,
      phoneValue,
      supportHTTPSValue,
      communityId,
    };
    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<AutoresponderDataType>(
            alreadyExist.id as string,
            "AutoresponderData",
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
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue cotée serveur",
        });
        setStartSending(() => false);
        return;
      }
    }
    const resultAll = await requestToSetUniversalData<AutoresponderDataType>(
      "AutoresponderData",
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
          await requestTogetAllUniversalData<AutoresponderDataType>(
            "AutoresponderData"
          )
        ).find((value) => value.communityId === communityId);
        setLoadingData(false);
        if (result) {
          setAlreadyExist({ ...result });
          setAutoresponderValue(result.autoresponderValue);
          setEmailValue(result.emailValue);
          setFirstNameValue(result.firstNameValue);
          setPhoneValue(result.phoneValue);
          setWebinarValue(result.webinarValue);
          setSupportHTTPSValue(result.supportHTTPSValue);

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
          <DialogTitle>Membres de la Communauté</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start w-full gap-5 mt-1">
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="name">Webinar Integration :</Label>
            <SelectLabelWebinar
              webinarValue={webinarValue}
              handleWebinar={handleWebinar}
            />
          </div>
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="name4">Autoresponder :</Label>
            <SelectLabelAutoresponder
              autoresponderValue={autoresponderValue}
              handleAutoresponder={handleAutoresponder}
            />
          </div>
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="username">Use HTML Form Code</Label>
            <Textarea placeholder="Type your message here." />
          </div>
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="name3">FieldName of 'First Name or Name' :</Label>
            <SelectLabelFirstName
              firstNameValue={firstNameValue}
              handleFirstName={handleFirstName}
            />
          </div>
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="name2">FieldName of 'Email':</Label>
            <SelectLabelEmail
              emailValue={emailValue}
              handleEmailValue={handleEmailValue}
            />
          </div>
          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="name1">FieldName of 'Phone':</Label>
            <SelectLabelPhone
              phoneValue={phoneValue}
              handlePhoneValue={handlePhoneValue}
            />
          </div>
          <div className="flex flex-col gap-3 w-full ">
            <CheckboxSupprtHTTPS
              supportHTTPSValue={supportHTTPSValue}
              handleSupportHTTPSValue={handleSupportHTTPSValue}
            />
          </div>
        </div>
        <DialogFooter className="mt-2">
          {startSending && (
            <div>Patienter l'action est en cours d'éxécution...</div>
          )}

          <Button
            type="button"
            disabled={startSending}
            onClick={submitAutoresponder}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

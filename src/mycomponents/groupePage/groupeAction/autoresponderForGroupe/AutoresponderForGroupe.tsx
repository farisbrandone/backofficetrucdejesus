import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import {
  CheckboxSupprtHTTPS,
  SelectLabelAutoresponder,
  SelectLabelEmail,
  SelectLabelFirstName,
  SelectLabelPhone,
  SelectLabelWebinar,
} from "@/mycomponents/autoresponder/SelectLabelAutoresponder";
import { useEffect, useState } from "react";

export type AutoresponderForGroupeData = {
  webinarValue: string;
  autoresponderValue: string;
  firstNameValue: string;
  emailValue: string;
  phoneValue: string;
  supportHTTPSValue: boolean;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
};

export default function AutoresponderForGroupe({
  setHiddenForAll,
  setOpenAutoresponderForGroupe,
}: {
  setHiddenForAll: (x: boolean) => void;
  setOpenAutoresponderForGroupe: (x: boolean) => void;
}) {
  const [webinarValue, setWebinarValue] = useState("");
  const [autoresponderValue, setAutoresponderValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [supportHTTPSValue, setSupportHTTPSValue] = useState(false);
  const [alreadyExist, setAlreadyExist] =
    useState<AutoresponderForGroupeData>();
  const [startSending, setStartSending] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
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

  const submitAutoresponderGroupe = async () => {
    if (
      !webinarValue ||
      !autoresponderValue ||
      !firstNameValue ||
      emailValue ||
      phoneValue ||
      supportHTTPSValue
    ) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "tous les champ ne sont pas remplis",
      });
      return;
    }

    const data = {
      webinarValue,
      autoresponderValue,
      firstNameValue,
      emailValue,
      phoneValue,
      supportHTTPSValue,
    };

    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<AutoresponderForGroupeData>(
            alreadyExist.id as string,
            "AutoresponderForGroupeData",
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
      await requestToSetUniversalData<AutoresponderForGroupeData>(
        "AutoresponderForGroupeData",
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
          await requestTogetAllUniversalData<AutoresponderForGroupeData>(
            "AutoresponderForGroupeData"
          );
        setLoadingData(false);
        if (result.length > 0) {
          setAlreadyExist({ ...result[0] });
          setAutoresponderValue(result[0].autoresponderValue);
          setEmailValue(result[0].emailValue);
          setFirstNameValue(result[0].firstNameValue);
          setPhoneValue(result[0].phoneValue);
          setWebinarValue(result[0].webinarValue);
          setSupportHTTPSValue(result[0].supportHTTPSValue);

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
          <p className="font-bold"> MEMBRES DU GROUPE</p>
          <button
            title="Fermer"
            type="button"
            onClick={() => {
              setHiddenForAll(true);
              setOpenAutoresponderForGroupe(false);
            }}
          >
            <span className="icon-[ooui--close]"></span>
          </button>
        </div>

        <div className="flex flex-col items-start w-full gap-5 mt-3 p-5">
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
        <div className="mb-2 ml-2">
          {startSending && (
            <div>Patienter l'action est en cours d'éxécution...</div>
          )}

          <Button
            type="button"
            disabled={startSending}
            onClick={submitAutoresponderGroupe}
            className=""
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

import {
  requestToChangeStatus,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import LoadingTotal from "@/mycomponents/ui/LoadingTotal";
import ComplexeDescription from "@/mycomponents/ui/ComplexeDescription";
import { Switch } from "@/components/ui/switch";

export type AchatTabContentGroupeData = {
  authorAchat: string;
  emailAuthorAchat: string;
  subjectAchat: string;
  messageOfEmailAchat: string;
  statusAchat: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
};

function AchatTabContentGroupe() {
  const [authorAchat, setAuthorAchat] = useState("");
  const [emailAuthorAchat, setEmailAuthorAchat] = useState("");
  const [subjectAchat, setSubjectAchat] = useState("");
  const [messageOfEmailAchat, setMessageOfEmailAchat] = useState("");
  const [classAuthorAchat, setClassAuthorAchat] = useState(false);
  const [classEmailAuthorAchat, setClassEmailAuthorAchat] = useState(false);
  const [classSubjectAchat, setClassSubjectAchat] = useState(false);

  const [alreadyExist, setAlreadyExist] = useState<AchatTabContentGroupeData>();
  const [startSending, setStartSending] = useState(false);

  const [loadingData, setLoadingData] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);

  const [switchStateAchat, setSwitchStateAchat] = useState("desactivate");

  const [idEmailNotification, setIdEmailNotification] = useState("");
  const { toast } = useToast();
  console.log(loadingFail);
  const handleSwitch = async () => {
    try {
      setLoadingStatus(true);
      let status;
      if (switchStateAchat === "activate") {
        status = "desactivate";
      } else {
        status = "activate";
      }
      const result = await requestToChangeStatus(
        idEmailNotification,
        status,
        "EmailNotificationData"
      );
      if (result.success) {
        setSwitchStateAchat(status);
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: result.message,
        });
      }

      setLoadingStatus(false);
    } catch (error) {}
  };

  const handleAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAuthorAchat(() => e.target.value);
    setClassAuthorAchat(false);
  };
  const handleEmailAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmailAuthorAchat(() => e.target.value);
    setClassEmailAuthorAchat(false);
  };
  const handleSubject = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSubjectAchat(() => e.target.value);
    setClassSubjectAchat(false);
  };

  const sendAchatNotificationForGroupe = async () => {
    if (
      !authorAchat ||
      !emailAuthorAchat ||
      !subjectAchat ||
      !messageOfEmailAchat
    ) {
      if (!authorAchat) {
        setClassAuthorAchat(true);
      }
      if (!emailAuthorAchat) {
        setClassEmailAuthorAchat(true);
      }
      if (subjectAchat) {
        setClassSubjectAchat(true);
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs n'ont pas été remplis",
      });
      setStartSending(() => false);
      return;
    }

    const data = {
      authorAchat: authorAchat,
      emailAuthorAchat: emailAuthorAchat,
      subjectAchat: subjectAchat,
      messageOfEmailAchat: messageOfEmailAchat,
      statusAchat: switchStateAchat,
    };
    setStartSending(() => true);
    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<AchatTabContentGroupeData>(
            alreadyExist.id as string,
            "AchatTabContentGroupeData",
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
      await requestToSetUniversalData<AchatTabContentGroupeData>(
        "AchatTabContentGroupeData",
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
          await requestTogetAllUniversalData<AchatTabContentGroupeData>(
            "AchatTabContentGroupeData"
          );
        setLoadingData(false);
        if (result.length > 0) {
          setAlreadyExist({ ...result[0] });
          setAuthorAchat(result[0].authorAchat);
          setEmailAuthorAchat(result[0].emailAuthorAchat);
          setSubjectAchat(result[0].subjectAchat);
          setSwitchStateAchat(result[0].statusAchat);
          setMessageOfEmailAchat(result[0].messageOfEmailAchat);
          setIdEmailNotification(result[0].id as string);

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
    <TabsContent value="notification d'achat">
      <Card>
        <CardHeader>
          <CardTitle className="text-[14px] sm:text-[18px] text-[#e91e63]">
            Short Codes
          </CardTitle>
          <CardDescription>
            <p className="text-[12px] ">
              Community name -{" "}
              <span className="text-[#e91e63] ">[community_name]</span>, Admin
              name - <span className="text-[#e91e63] ">[admin_name]</span>,
              Member Name -{" "}
              <span className="text-[#e91e63] ">[member_name]</span>, Member
              Email - <span className="text-[#e91e63] ">[member_email]</span>,
              Member Count -
              <span className="text-[#e91e63] ">[member_count]</span>, Product
              Name -<span className="text-[#e91e63] ">[product_name]</span>
              ,Product Amount -
              <span className="text-[#e91e63] ">[product_amount]</span>
            </p>
            <p className="px-2 rounded-md shadow-xl border-l-[5px] py-1.5 border-l-[#e91e63] mt-3 ">
              <span className="text-[#e91e63] ">Note :</span> Envoyer
              automatiquement des courriels lorsque le client achète un bien ou
              un cours
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[16px] sm:text-[18px]">
          <div className="flex justify-between items-center w-full">
            <p>Etat d'activation</p>
            <div className="flex items-center space-x-2">
              {loadingStatus ? (
                <LoadingTotal />
              ) : (
                <Switch
                  id="airplane-mode"
                  checked={switchStateAchat === "activate"}
                  onCheckedChange={handleSwitch}
                />
              )}
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="title">
              De la part de: Nom <span className="text-red-600">*</span>
            </Label>
            <Input
              id="author"
              name="author"
              value={authorAchat}
              placeholder="Nom"
              onChange={handleAuthor}
              className={`${classAuthorAchat ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="emailAuthor">
              Email <span className="text-red-600">*</span>
            </Label>
            <Input
              id="emailAuthor"
              name="emailAuthor"
              value={emailAuthorAchat}
              placeholder="Email "
              onChange={handleEmailAuthor}
              required
              className={`${classEmailAuthorAchat ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1 ">
            <Label htmlFor="subject">Subject</Label>
            <div className="flex items-center gap-2">
              <Input
                id="subject"
                name="subject"
                value={subjectAchat}
                placeholder="Subject"
                onChange={handleSubject}
                disabled={startSending}
                className={`${classSubjectAchat ? "border-red-600" : ""}`}
              />
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <ComplexeDescription
                label="Message de l'email"
                value={messageOfEmailAchat}
                placeHolder="Commencer à saisir ..."
                onBlurValue={(newContent) => setMessageOfEmailAchat(newContent)}
              />
            </div>
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter>
          <Button
            disabled={startSending}
            onClick={sendAchatNotificationForGroupe}
          >
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

export default AchatTabContentGroupe;

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

export type MembreTabContentGroupeData = {
  authorMembre: string;
  emailAuthorMembre: string;
  subjectMembre: string;
  messageOfEmailMembre: string;
  statusMembre: string;
  groupeId: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
};

function MembreNotificationForGroupe({ groupeId }: { groupeId: string }) {
  const [authorMembre, setAuthorMembre] = useState("");
  const [emailAuthorMembre, setEmailAuthorMembre] = useState("");
  const [subjectMembre, setSubjectMembre] = useState("");
  const [messageOfEmailMembre, setMessageOfEmailMembre] = useState("");
  const [classAuthorMembre, setClassAuthorMembre] = useState(false);
  const [classEmailAuthorMembre, setClassEmailAuthorMembre] = useState(false);
  const [classSubjectMembre, setClassSubjectMembre] = useState(false);

  const [alreadyExist, setAlreadyExist] =
    useState<MembreTabContentGroupeData>();
  const [startSending, setStartSending] = useState(false);

  const [loadingData, setLoadingData] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);

  const [switchStateMembre, setSwitchStateMembre] = useState("desactivate");

  const [idEmailNotification, setIdEmailNotification] = useState("");
  const { toast } = useToast();
  console.log(loadingFail);
  const handleSwitch = async () => {
    try {
      setLoadingStatus(true);
      let status;
      if (switchStateMembre === "activate") {
        status = "desactivate";
      } else {
        status = "activate";
      }
      const result = await requestToChangeStatus(
        idEmailNotification,
        status,
        "MembreNotificationForGroupeData"
      );
      if (result.success) {
        setSwitchStateMembre(status);
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
    setAuthorMembre(() => e.target.value);
    setClassAuthorMembre(false);
  };
  const handleEmailAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmailAuthorMembre(() => e.target.value);
    setClassEmailAuthorMembre(false);
  };
  const handleSubject = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSubjectMembre(() => e.target.value);
    setClassSubjectMembre(false);
  };

  const sendMembreNotificationForGroupe = async () => {
    if (
      !authorMembre ||
      !emailAuthorMembre ||
      !subjectMembre ||
      !messageOfEmailMembre
    ) {
      if (!authorMembre) {
        setClassAuthorMembre(true);
      }
      if (!emailAuthorMembre) {
        setClassEmailAuthorMembre(true);
      }
      if (subjectMembre) {
        setClassSubjectMembre(true);
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs n'ont pas été remplis",
      });

      return;
    }

    const data = {
      authorMembre: authorMembre,
      emailAuthorMembre: emailAuthorMembre,
      subjectMembre: subjectMembre,
      messageOfEmailMembre: messageOfEmailMembre,
      statusMembre: switchStateMembre,
      groupeId,
    };
    setStartSending(() => true);
    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<MembreTabContentGroupeData>(
            alreadyExist.id as string,
            "MembreTabContentGroupeData",
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
      await requestToSetUniversalData<MembreTabContentGroupeData>(
        "MembreTabContentGroupeData",
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
          await requestTogetAllUniversalData<MembreTabContentGroupeData>(
            "MembreTabContentGroupeData"
          )
        ).filter((value) => value.groupeId === groupeId);
        setLoadingData(false);
        if (result.length > 0) {
          setAlreadyExist({ ...result[0] });
          setAuthorMembre(result[0].authorMembre);
          setEmailAuthorMembre(result[0].emailAuthorMembre);
          setSubjectMembre(result[0].subjectMembre);
          setSwitchStateMembre(result[0].statusMembre);
          setMessageOfEmailMembre(result[0].messageOfEmailMembre);
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
    <TabsContent value="notification de nouveau membre">
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
              <span className="text-[#e91e63] ">Note :</span> Envoyez
              manuellement une notification par courrier électronique.
              Fonctionne pour les offres groupées et les promotions.
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
                  checked={switchStateMembre === "activate"}
                  onCheckedChange={handleSwitch}
                />
              )}
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="title">
              De la part de: Nom<span className="text-red-600">*</span>
            </Label>
            <Input
              id="author"
              name="author"
              value={authorMembre}
              placeholder="Nom"
              onChange={handleAuthor}
              className={`${classAuthorMembre ? "border-red-600" : ""}`}
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
              value={emailAuthorMembre}
              placeholder="Email "
              onChange={handleEmailAuthor}
              required
              className={`${classEmailAuthorMembre ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1 ">
            <Label htmlFor="subject">Subject</Label>
            <div className="flex items-center gap-2">
              <Input
                id="subject"
                name="subject"
                value={subjectMembre}
                placeholder="Subject"
                onChange={handleSubject}
                disabled={startSending}
                className={`${classSubjectMembre ? "border-red-600" : ""}`}
              />
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <ComplexeDescription
                label="Message de l'email"
                value={messageOfEmailMembre}
                placeHolder="Commencer à saisir l'email..."
                onBlurValue={(newContent) =>
                  setMessageOfEmailMembre(newContent)
                }
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
            onClick={sendMembreNotificationForGroupe}
          >
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

export default MembreNotificationForGroupe;
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

export type NotificationTabContentGroupeData = {
  author: string;
  emailAuthor: string;
  subject: string;
  messageOfEmail: string;
  status: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
};

function NotificationTabContentGroupe() {
  const [author, setAuthor] = useState("");
  const [emailAuthor, setEmailAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [messageOfEmail, setMessageOfEmail] = useState("");
  const [classAuthor, setClassAuthor] = useState(false);
  const [classEmailAuthor, setClassEmailAuthor] = useState(false);
  const [classSubject, setClassSubject] = useState(false);
  const [alreadyExist, setAlreadyExist] =
    useState<NotificationTabContentGroupeData>();
  const [startSending, setStartSending] = useState(false);

  const [loadingData, setLoadingData] = useState(false);

  const [switchState, setSwitchState] = useState("desactivate");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const [idEmailNotification, setIdEmailNotification] = useState("");
  const { toast } = useToast();
  console.log(loadingFail);
  const handleSwitch = async () => {
    try {
      setLoadingStatus(true);
      let status;
      if (switchState === "activate") {
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
        setSwitchState(status);
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
    setAuthor(() => e.target.value);
    setClassAuthor(false);
  };
  const handleEmailAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmailAuthor(() => e.target.value);
    setClassEmailAuthor(false);
  };
  const handleSubject = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSubject(() => e.target.value);
    setClassSubject(false);
  };

  const sendEmailNotificationForGroupe = async () => {
    if (!author || !emailAuthor || !subject) {
      if (!author) {
        setClassAuthor(true);
      }
      if (!emailAuthor) {
        setClassEmailAuthor(true);
      }
      if (subject) {
        setClassSubject(true);
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "tous les champ ne sont pas remplis",
      });
      return;
    }

    const data = {
      author: author,
      emailAuthor: emailAuthor,
      subject: subject,
      messageOfEmail: messageOfEmail,
      status: switchState,
    };

    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<NotificationTabContentGroupeData>(
            alreadyExist.id as string,
            "NotificationTabContentGroupeData",
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
      await requestToSetUniversalData<NotificationTabContentGroupeData>(
        "NotificationTabContentGroupeData",
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
          await requestTogetAllUniversalData<NotificationTabContentGroupeData>(
            "NotificationTabContentGroupeData"
          );
        setLoadingData(false);
        if (result.length > 0) {
          setAlreadyExist({ ...result[0] });
          setAuthor(result[0].author);
          setEmailAuthor(result[0].emailAuthor);
          setSubject(result[0].subject);
          setSwitchState(result[0].status);
          setMessageOfEmail(result[0].messageOfEmail);
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
    <TabsContent value="notification d'inscription">
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
              <span className="text-[#e91e63] ">Note :</span> Envoi automatique
              de courriels lorsque de nouveaux membres s'inscrivent dans la
              communauté.
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
                  checked={switchState === "activate"}
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
              value={author}
              placeholder="Nom"
              onChange={handleAuthor}
              className={`${classAuthor ? "border-red-600" : ""}`}
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
              value={emailAuthor}
              placeholder="Email "
              onChange={handleEmailAuthor}
              required
              className={`${classEmailAuthor ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1 ">
            <Label htmlFor="subject">Subject</Label>
            <div className="flex items-center gap-2">
              <Input
                id="subject"
                name="subject"
                value={subject}
                placeholder="Subject"
                onChange={handleSubject}
                disabled={startSending}
                className={`${classSubject ? "border-red-600" : ""}`}
              />
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <ComplexeDescription
                label="Message de l'email"
                value={messageOfEmail}
                placeHolder="Commencer à saisir ..."
                onBlurValue={(newContent) => setMessageOfEmail(newContent)}
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
            onClick={sendEmailNotificationForGroupe}
          >
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

export default NotificationTabContentGroupe;

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
import LoadingTotal from "../ui/LoadingTotal";
import { Switch } from "@radix-ui/react-switch";
import {
  EmailNotificationDataType,
  requestToChangeStatus,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import ComplexeDescription from "../ui/ComplexeDescription";
function NotificationTabContent({ communityId }: { communityId: string }) {
  const [author, setAuthor] = useState("");
  const [emailAuthor, setEmailAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [messageOfEmail, setMessageOfEmail] = useState("");
  const [classAuthor, setClassAuthor] = useState(false);
  const [classEmailAuthor, setClassEmailAuthor] = useState(false);
  const [classSubject, setClassSubject] = useState(false);

  const [startSending, setStartSending] = useState(false);

  const [switchState, setSwitchState] = useState("desactivate");
  const [loadingStatus, setLoadingStatus] = useState(false);

  const [idEmailNotification, setIdEmailNotification] = useState("");
  const [alreadyExist, setAlreadyExist] = useState<EmailNotificationDataType>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const { toast } = useToast();

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

  const sendEmailNotification = async () => {
    setStartSending(() => true);
    if (!author || !emailAuthor || !subject || !messageOfEmail) {
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
        description: "Tous les champs n'ont pas été remplis",
      });
      setStartSending(() => false);
      return;
    }
    let data = {
      title: author,
      emailAuthor: emailAuthor,
      subject: subject,
      messageOfEmail: messageOfEmail,
      communityId,
      status: switchState,
    };
    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<EmailNotificationDataType>(
            alreadyExist.id as string,
            "EmailNotificationData",
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
      await requestToSetUniversalData<EmailNotificationDataType>(
        "EmailNotificationData",
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

  /*  useEffect(() => {

     var data = {
          title: author,
          emailAuthor: emailAuthor,
          subject: subject,
          messageOfEmail: messageOfEmail,
         communityId,
          status: switchState,
        };


    const getEmailNotificationData = async () => {
      try {
        const result = await requestTogetAllEmailNotificationData();
        const data = result[0];
        setAuthor(data.title);
        setEmailAuthor(data.emailAuthor);
        setSubject(data.subject);
        setSwitchState(data.status);
        setMessageOfEmail(data.messageOfEmail);
        setIdEmailNotification(data.id);
      } catch (error) {
        setLoadingFail(true);
      }

      getEmailNotificationData();
    };
  }, []); */

  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoadingData(true);
        const result = (
          await requestTogetAllUniversalData<EmailNotificationDataType>(
            "EmailNotificationData"
          )
        ).find((value) => value.communityId === communityId);
        setLoadingData(false);
        if (result) {
          setAlreadyExist({ ...result });
          setAuthor(result.title);
          setEmailAuthor(result.emailAuthor);
          setSubject(result.subject);
          setSwitchState(result.status);
          setMessageOfEmail(result.messageOfEmail);
          setIdEmailNotification(result.id as string);

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
            <Label htmlFor="title">De la part de: Nom *</Label>
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
            <Label htmlFor="emailAuthor">Email *</Label>
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
                placeHolder="Commencer à saisir l'email..."
                onBlurValue={(newContent) => setMessageOfEmail(newContent)}
              />
            </div>
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter>
          <Button disabled={startSending} onClick={sendEmailNotification}>
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

export default NotificationTabContent;

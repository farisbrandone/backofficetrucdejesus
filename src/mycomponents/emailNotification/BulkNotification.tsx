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

import { Switch } from "@radix-ui/react-switch";
import {
  BulkNotificationDataType,
  requestToChangeStatus,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import LoadingTotal from "@/mycomponents/ui/LoadingTotal";
import ComplexeDescription from "@/mycomponents/ui/ComplexeDescription";

function BulkNotification({ communityId }: { communityId: string }) {
  const [authorBulk, setAuthorBulk] = useState("");
  const [emailAuthorBulk, setEmailAuthorBulk] = useState("");
  const [subjectBulk, setSubjectBulk] = useState("");
  const [messageOfEmailBulk, setMessageOfEmailBulk] = useState("");
  const [classAuthorBulk, setClassAuthorBulk] = useState(false);
  const [classEmailAuthorBulk, setClassEmailAuthorBulk] = useState(false);
  const [classSubjectBulk, setClassSubjectBulk] = useState(false);

  const [startSending, setStartSending] = useState(false);

  const [switchStateBulk, setSwitchStateBulk] = useState("desactivate");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState<BulkNotificationDataType>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [idEmailNotification, setIdEmailNotification] = useState("");
  const { toast } = useToast();
  console.log(loadingFail);
  const handleSwitch = async () => {
    try {
      setLoadingStatus(true);
      let status;
      if (switchStateBulk === "activate") {
        status = "desactivate";
      } else {
        status = "activate";
      }
      const result = await requestToChangeStatus(
        idEmailNotification,
        status,
        "BulkNotificationData"
      );
      if (result.success) {
        setSwitchStateBulk(status);
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
    setAuthorBulk(() => e.target.value);
    setClassAuthorBulk(false);
  };
  const handleEmailAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmailAuthorBulk(() => e.target.value);
    setClassEmailAuthorBulk(false);
  };
  const handleSubject = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSubjectBulk(() => e.target.value);
    setClassSubjectBulk(false);
  };

  const sendBulkNotification = async () => {
    setStartSending(() => true);
    if (
      !authorBulk ||
      !emailAuthorBulk ||
      !subjectBulk ||
      !messageOfEmailBulk
    ) {
      if (!authorBulk) {
        setClassAuthorBulk(true);
      }
      if (!emailAuthorBulk) {
        setClassEmailAuthorBulk(true);
      }
      if (subjectBulk) {
        setClassSubjectBulk(true);
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs n'ont pas été remplis",
      });
      setStartSending(() => false);
      return;
    }
    var data = {
      titleBulk: authorBulk,
      emailAuthorBulk: emailAuthorBulk,
      subjectBulk: subjectBulk,
      messageOfEmailBulk: messageOfEmailBulk,
      communityId,
      statusBulk: switchStateBulk,
    };
    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<BulkNotificationDataType>(
            alreadyExist.id as string,
            "BulkNotificationData",
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
    const resultAll = await requestToSetUniversalData<BulkNotificationDataType>(
      "BulkNotificationData",
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

  /*  
 
   var data = {
          titleBulk: authorBulk,
          emailAuthorBulk: emailAuthorBulk,
          subjectBulk: subjectBulk,
          messageOfEmailBulk: messageOfEmailBulk,
          date: "",
          id: getResult[0].id,
          statusBulk: switchStateBulk,
        };
 
 useEffect(() => {
    const getEmailNotificationData = async () => {
      try {
        const result = await requestTogetAllBulkNotificationData();
        const data = result[0];
        setAuthorBulk(data.titleBulk);
        setEmailAuthorBulk(data.emailAuthorBulk);
        setSubjectBulk(data.subjectBulk);
        setSwitchStateBulk(data.statusBulk);
        setMessageOfEmailBulk(data.messageOfEmailBulk);
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
          await requestTogetAllUniversalData<BulkNotificationDataType>(
            "BulkNotificationData"
          )
        ).find((value) => value.communityId === communityId);
        setLoadingData(false);
        if (result) {
          setAlreadyExist({ ...result });
          setAuthorBulk(result.titleBulk);
          setEmailAuthorBulk(result.emailAuthorBulk);
          setSubjectBulk(result.subjectBulk);
          setSwitchStateBulk(result.statusBulk);
          setMessageOfEmailBulk(result.messageOfEmailBulk);
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
    <TabsContent value="notification en masse">
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
                  checked={switchStateBulk === "activate"}
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
              value={authorBulk}
              placeholder="Nom"
              onChange={handleAuthor}
              className={`${classAuthorBulk ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="emailAuthor">Email *</Label>
            <Input
              id="emailAuthor"
              name="emailAuthor"
              value={emailAuthorBulk}
              placeholder="Email "
              onChange={handleEmailAuthor}
              required
              className={`${classEmailAuthorBulk ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1 ">
            <Label htmlFor="subject">Subject</Label>
            <div className="flex items-center gap-2">
              <Input
                id="subject"
                name="subject"
                value={subjectBulk}
                placeholder="Subject"
                onChange={handleSubject}
                disabled={startSending}
                className={`${classSubjectBulk ? "border-red-600" : ""}`}
              />
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <ComplexeDescription
                label="Message de l'email"
                value={messageOfEmailBulk}
                placeHolder="Commencer à saisir l'email..."
                onBlurValue={(newContent) => setMessageOfEmailBulk(newContent)}
              />
            </div>
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter>
          <Button disabled={startSending} onClick={sendBulkNotification}>
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

export default BulkNotification;

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
  requestToChangeStatus,
  requestTogetAllMembreNotificationData,
  requestToUpdateMembreNotificationData,
} from "@/fakeData";
import ComplexeDescription from "../ui/ComplexeDescription";
function MembreNotification() {
  const [authorMembre, setAuthorMembre] = useState("");
  const [emailAuthorMembre, setEmailAuthorMembre] = useState("");
  const [subjectMembre, setSubjectMembre] = useState("");
  const [messageOfEmailMembre, setMessageOfEmailMembre] = useState("");
  const [classAuthorMembre, setClassAuthorMembre] = useState(false);
  const [classEmailAuthorMembre, setClassEmailAuthorMembre] = useState(false);
  const [classSubjectMembre, setClassSubjectMembre] = useState(false);

  const [startSending, setStartSending] = useState(false);

  const [switchStateMembre, setSwitchStateMembre] = useState("desactivate");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
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
        "MembreNotificationData"
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

  const sendMembreNotification = async () => {
    setStartSending(() => true);
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
      setStartSending(() => false);
      return;
    }
    try {
      const getResult = await requestTogetAllMembreNotificationData();
      if (
        getResult[0].emailAuthorMembre !== emailAuthorMembre ||
        getResult[0].titleMembre !== authorMembre ||
        getResult[0].subjectMembre !== subjectMembre
      ) {
        var data = {
          titleMembre: authorMembre,
          emailAuthorMembre: emailAuthorMembre,
          subjectMembre: subjectMembre,
          messageOfEmailMembre: messageOfEmailMembre,
          date: "",
          id: getResult[0].id,
          statusMembre: switchStateMembre,
        };
        const result = await requestToUpdateMembreNotificationData(data);
        console.log(result);

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
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Aucune modification n'a été effectuer",
        });
        setStartSending(() => false);
        return;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue, vérifier votre connexion",
      });
      setStartSending(() => false);
      console.error("");
    }
  };

  useEffect(() => {
    const getEmailNotificationData = async () => {
      try {
        const result = await requestTogetAllMembreNotificationData();
        const data = result[0];
        setAuthorMembre(data.titleMembre);
        setEmailAuthorMembre(data.emailAuthorMembre);
        setSubjectMembre(data.subjectMembre);
        setSwitchStateMembre(data.statusMembre);
        setMessageOfEmailMembre(data.messageOfEmailMembre);
        setIdEmailNotification(data.id);
      } catch (error) {
        setLoadingFail(true);
      }

      getEmailNotificationData();
    };
  }, []);

  /* if ((!author || !emailAuthor) && !loadingFail) {
      return (
        <div className="w-full text-center pt-4">
          Le document est en cours de chargement ...
        </div>
      );
    }
  
    if (loadingFail) {
      return (
        <div className="w-full text-center pt-4">
          Une erreur est survenue pendant le chargement ou problème de connexion
        </div>
      );
    } */

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
              <span className="text-[#e91e63] ">Note :</span> Envoyer
              automatiquement des courriels aux administrateurs de la communauté
              lorsqu'ils reçoivent un nouveau membre.
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
            <Label htmlFor="title">De la part de: Nom *</Label>
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
            <Label htmlFor="emailAuthor">Email *</Label>
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
          <Button disabled={startSending} onClick={sendMembreNotification}>
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

export default MembreNotification;

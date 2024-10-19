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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ButtonUploadFile from "../ui/ButtonUploadFile";
import { ChangeEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import DataTable from "../tableComponent/DataTable";
import NotificationDetails from "../notificationDetail/NotificationDetails";

export function MyBody() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [redirectionUrl, setRedirectionUrl] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [classTitle, setClassTitle] = useState(false);
  const [classBody, setClassBody] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [tabPage, setTabPage] = useState("envoyer les notifications");
  const [myid, setMyid] = useState("");
  const { toast } = useToast();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(() => e.target.value);
    setClassTitle(false);
  };
  const handleBody = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBody(() => e.target.value);
    setClassBody(false);
  };
  const handleImageUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImageUrl(() => e.target.value);
  };
  const handleUrlRedirection = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRedirectionUrl(() => e.target.value);
  };
  const sendNotification = async () => {
    setStartSending(() => true);
    if (!title || !body) {
      if (!title) {
        setClassTitle(true);
      }
      if (!body) {
        setClassBody(true);
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
      var data = {
        title: title,
        body: body,
        iconUrl: imageUrl,
        actionUrl: redirectionUrl,
      };
      const result = await axios.post(
        "https://serverbackofficetrucdejesus.onrender.com/api/firebase/send-multiple-notification",
        /*"http://localhost:4000/api/firebase/send-multiple-notification",*/
        data
      );
      console.log(result);

      if (result.status === 200) {
        toast({
          title: "Success",
          description: "La Notification a été envoyé avec success",
        });
        setTitle(() => "");
        setClassTitle(false);
        setBody(() => "");
        setClassBody(false);
        setImageUrl(() => "");
        setRedirectionUrl(() => "");
        setStartSending(() => false);
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue cotée serveur",
        });
        setStartSending(() => false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Une erreur est survenue pendant l'envoie de la notification, vérifier votre connexion",
      });
      setStartSending(() => false);
      console.error("");
    }
  };

  return (
    <Tabs value={tabPage} className="max-w-screen-xl mx-auto  ">
      <TabsList className="grid w-full grid-cols-3 pt-2 sm:h-[60px]">
        <TabsTrigger
          value="envoyer les notifications"
          onClick={() => setTabPage("envoyer les notifications")}
          className="text-[14px] sm:text-[18px]"
        >
          Envoyer{" "}
          <span className="max-[600px]:hidden pl-2">des Notifications</span>
        </TabsTrigger>
        <TabsTrigger
          value="notifications envoyées"
          onClick={() => setTabPage("notifications envoyées")}
          className="text-[14px] sm:text-[18px] "
        >
          Notifications{" "}
          <span className="max-[600px]:hidden pl-2">envoyées</span>
        </TabsTrigger>
        <TabsTrigger
          value="détails notifications"
          onClick={() => setTabPage("détails notifications")}
          className="text-[14px] sm:text-[18px]"
        >
          Détails{" "}
          <span className="max-[600px]:hidden pl-2"> notifications</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="envoyer les notifications">
        <Card>
          <CardHeader>
            <CardTitle className="text-[12px] sm:text-[18px]">
              Notification
            </CardTitle>
            <CardDescription>
              Remplir les champs et envoyer des notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[16px] sm:text-[18px]">
            <div className="space-y-1">
              <Label htmlFor="title">Titre de la notification *</Label>
              <Input
                id="title"
                name="title"
                value={title}
                placeholder="Entrer un titre"
                onChange={handleTitle}
                className={`${classTitle ? "border-red-600" : ""}`}
                disabled={startSending}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="body">Corps de la notification *</Label>
              <Input
                id="body"
                name="body"
                value={body}
                placeholder="Entrer le corps de la notification"
                onChange={handleBody}
                required
                className={`${classBody ? "border-red-600" : ""}`}
                disabled={startSending}
              />
            </div>
            <div className="space-y-1 ">
              <Label htmlFor="imageUrl">
                Insérer une url d'image {" (optionnel)"}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={imageUrl}
                  placeholder="Entrer une url d'image"
                  onChange={handleImageUrl}
                  disabled={stateDownload || startSending}
                />
                <ButtonUploadFile
                  setImageUrl={setImageUrl}
                  setStateDownload={setStateDownload}
                  stateDownload={stateDownload}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="redirectionUrl">
                Insérer une url de redirection {" (optionnel)"}
              </Label>
              <Input
                id="redirectionUrl"
                name="redirectionUrl"
                value={redirectionUrl}
                onChange={handleUrlRedirection}
                placeholder="Entrer une url de redirection"
                disabled={startSending}
              />
            </div>
          </CardContent>
          {startSending && (
            <div>Patienter l'action est en cours d'éxécution...</div>
          )}
          <CardFooter>
            <Button disabled={stateDownload} onClick={sendNotification}>
              Envoyer la notification
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notifications envoyées">
        <div className="pt-4 min-h-screen bg-gray-50">
          <DataTable myid={myid} setMyid={setMyid} setTabPage={setTabPage} />
        </div>
      </TabsContent>
      <TabsContent value="détails notifications">
        <div className="pt-4 min-h-screen bg-gray-50">
          <NotificationDetails myid={myid} setTabPage={setTabPage} />
        </div>
      </TabsContent>
    </Tabs>
  );
}

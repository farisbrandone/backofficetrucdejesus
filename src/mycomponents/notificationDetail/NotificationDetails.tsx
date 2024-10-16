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
import {
  deleteDataWithId,
  seedDataWithId,
  setDataWithId,
  User,
} from "@/fakeData";
import React, { ChangeEvent, useEffect, useState } from "react";
import ButtonUploadFile from "../ui/ButtonUploadFile";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { format } from "date-fns";
interface typeNotificationDetails {
  myid: string;
  setTabPage: React.Dispatch<React.SetStateAction<string>>;
}

export function NotificationDetails({
  myid,
  setTabPage,
}: typeNotificationDetails) {
  const [loadingFail, setLoadingFail] = useState(false);
  const [singleData, setSingleData] = useState<User>();
  const [imageUrl, setImageUrl] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [dateDetails, setDateDetails] = useState("");
  const [classTitle, setClassTitle] = useState(false);
  const [classBody, setClassBody] = useState(false);
  const [redirectionUrl, setRedirectionUrl] = useState("");
  const [startSending, setStartSending] = useState(false);
  const { toast } = useToast();
  stateDownload;
  const handleImageUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImageUrl(() => e.target.value);
  };
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
  const handleUrlRedirection = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRedirectionUrl(() => e.target.value);
  };

  const updateNotification = async () => {
    setStartSending(true);
    const {
      updateid,
      updateTitle,
      updateBody,
      updateIconUrl,
      updateActionUrl,
    } = {
      updateid: myid,
      updateTitle: title,
      updateBody: body,
      updateIconUrl: imageUrl,
      updateActionUrl: redirectionUrl,
    };
    const data: User = {
      id: updateid,
      title: updateTitle,
      body: updateBody,
      iconUrl: updateIconUrl,
      actionUrl: updateActionUrl,
      date: format(Date.now(), "'le' dd/MM/yyyy 'à' kk:mm"),
    };
    try {
      const result = await setDataWithId(data);
      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Echec de la mise à jour",
          description: result.message,
        });
        setStartSending(false);
        return;
      }
      toast({
        title: "Success de la mise à jour",
        description: result.message,
      });
      setStartSending(false);
      setTabPage("notifications envoyées");
      return;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Echec de la mise à jour",
        description: "Problème de connexion",
      });
      setStartSending(false);
      return;
    }
  };

  const deleteNotification = async () => {
    setStartSending(true);
    try {
      const result = await deleteDataWithId(myid);
      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Echec de la suppression",
          description: result.message,
        });
        setStartSending(false);
        return;
      }
      toast({
        title: "Success de la suppression",
        description: result.message,
      });
      setStartSending(false);
      setTabPage("notifications envoyées");
      return;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Echec de la mise à jour",
        description: "Problème de connexion",
      });
      setStartSending(false);
      return;
    }
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
        "http://localhost:4000/api/firebase/send-notification",
        data
      );
      console.log(result);

      if (result.status === 200) {
        toast({
          title: "Success",
          description: "La Notification a été envoyé avec success",
        });
        setTabPage("notifications envoyées");
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

  useEffect(() => {
    const getDataWithId = async () => {
      try {
        const data = await seedDataWithId(myid);
        setSingleData(data);
        setImageUrl(data.iconUrl);
        setTitle(data.title);
        setBody(data.body);
        setRedirectionUrl(data.actionUrl);
        setDateDetails(data.date);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getDataWithId();
  }, []);

  if (!myid) {
    return <div className="w-full text-center pt-4">Aucune donnée trouvée</div>;
  }

  if (!singleData && !loadingFail) {
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
  }

  return (
    <div>
      {" "}
      <Card>
        <CardHeader>
          <CardTitle>Notification publiée {dateDetails} </CardTitle>
          <CardDescription>
            Ci-dessous les détails de la notifications à vérifier,
            modifier,supprimer ou envoyer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={handleTitle}
              className={`${classTitle ? "border-red-600" : ""}`}
              required
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="body">Corps de la notification</Label>
            <Input
              id="body"
              name="body"
              value={body}
              onChange={handleBody}
              className={`${classBody ? "border-red-600" : ""}`}
              required
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="icon">Image de la notification</Label>
            <div className="flex items-center gap-2">
              <Input
                id="icon"
                name="imageUrl"
                value={imageUrl}
                onChange={handleImageUrl}
                disabled={stateDownload || startSending}
              />
              <ButtonUploadFile
                setImageUrl={setImageUrl}
                setStateDownload={setStateDownload}
                stateDownload={stateDownload}
              />
            </div>
            <img src={singleData?.iconUrl} alt="Aucune" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="actionUrl">Action d'url</Label>
            <Input
              id="actionUrl"
              value={redirectionUrl}
              onChange={handleUrlRedirection}
              disabled={startSending}
            />
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter className="flex flex-wrap justify-around">
          <Button
            onClick={updateNotification}
            disabled={startSending}
            className="text-white bg-[#bd10e0] disabled:opacity-30"
          >
            Mettre à jour
          </Button>
          <Button
            onClick={deleteNotification}
            disabled={startSending}
            className="text-white bg-red-700 disabled:opacity-30"
          >
            Supprimer
          </Button>
          <Button
            onClick={sendNotification}
            disabled={startSending}
            className="text-white bg-[#f8e71c] disabled:opacity-30 self-center"
          >
            Reenvoyer la notification
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default NotificationDetails;

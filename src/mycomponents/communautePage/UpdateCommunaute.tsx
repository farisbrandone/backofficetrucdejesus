import { faker } from "@faker-js/faker";
import { Fragment } from "react/jsx-runtime";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import ButtonUploadFile from "../ui/ButtonUploadFile";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NavLink } from "react-router-dom";
import { seedCommunityDataWithId } from "@/fakeData";

export const communauteIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M10.275 12q-.7 0-1.15-.525T8.8 10.25l.3-1.8q.2-1.075 1.013-1.763T12 6q1.1 0 1.913.688t1.012 1.762l.3 1.8q.125.7-.325 1.225T13.75 12zm.6-2h2.275l-.2-1.225q-.05-.35-.325-.562T12 8t-.612.213t-.313.562zM3.1 12.975q-.575.025-.988-.225t-.537-.775q-.05-.225-.025-.45t.125-.425q0 .025-.025-.1q-.05-.05-.25-.6q-.05-.3.075-.575T1.8 9.35l.05-.05q.05-.475.388-.8t.837-.325q.075 0 .475.1l.075-.025q.125-.125.325-.187T4.375 8q.275 0 .488.088t.337.262q.025 0 .038.013t.037.012q.35.025.612.212t.388.513q.05.175.038.338t-.063.312q0 .025.025.1q.175.175.275.388t.1.437q0 .1-.15.525q-.025.05 0 .1l.05.4q0 .525-.437.9t-1.063.375zM20 13q-.825 0-1.412-.587T18 11q0-.3.088-.562t.237-.513l-.7-.625q-.25-.2-.088-.5T18 8.5h2q.825 0 1.413.588T22 10.5v.5q0 .825-.587 1.413T20 13M0 17v-.575q0-1.1 1.113-1.763T4 14q.325 0 .625.013t.575.062q-.35.5-.525 1.075T4.5 16.375V18H1q-.425 0-.712-.288T0 17m6 0v-.625q0-1.625 1.663-2.625t4.337-1q2.7 0 4.35 1T18 16.375V17q0 .425-.288.713T17 18H7q-.425 0-.712-.288T6 17m14-3q1.8 0 2.9.663t1.1 1.762V17q0 .425-.288.713T23 18h-3.5v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14m-8 .75q-1.425 0-2.55.375T8.125 16H15.9q-.225-.5-1.338-.875T12 14.75M12.025 9"
    />
  </svg>
);

export interface communityDataType {
  title: string;
  description: string;
  logoUrl: string;
  banniereUrl: string;
}

function UpdateCommunaute() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [banniereUrl, setBanniereUrl] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [classTitle, setClassTitle] = useState(false);
  const [classDescription, setClassDescription] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);

  const { toast } = useToast();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(() => e.target.value);
    setClassTitle(false);
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescription(() => e.target.value);
    setClassDescription(false);
  };
  const handleLogoUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLogoUrl(() => e.target.value);
  };
  const handleBanniereUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBanniereUrl(() => e.target.value);
  };

  const sendModificationOnCommunity = async () => {
    console.log("banga");
    setStartSending(() => true);
    if (!title || !description) {
      if (!title) {
        setClassTitle(true);
      }
      if (!description) {
        setClassDescription(true);
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs requis n'ont pas été remplis",
      });
      setStartSending(() => false);
      return;
    }
    try {
      console.log("inside try");
      var data = {
        title: title,
        description: description,
        logoUrl: logoUrl,
        banniereUrl: banniereUrl,
      };
      const result = await axios.post(
        /* "https://serverbackofficetrucdejesus.onrender.com/api/firebase/send-multiple-notification", */
        "http://localhost:4000/api/firebase/send-modification-on-community",
        data
      );
      console.log(result);

      if (result.status === 200) {
        console.log("shunga");
        toast({
          title: "Success",
          description: "La Notification a été envoyé avec success",
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
    async function getCommunityData() {
      try {
        const data = await seedCommunityDataWithId();
        setLogoUrl(data.logoUrl);
        setTitle(data.title);
        setDescription(data.description);
        setBanniereUrl(data.banniereUrl);
      } catch (error) {
        setLoadingFail(true);
      }
    }
    getCommunityData();
  }, []);

  if ((!description || !title) && !loadingFail) {
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
    <Fragment>
      {/* <HeaderForAllBackOffice /> */}
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {communauteIcon("30", "30")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                Mettre à jour la communauté
              </h1>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <p className="align-middle self-center">Communauté</p>
          <select
            title="Select element"
            id="countries"
            className=" w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>{faker.word.words(2)}</option>
          </select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[12px] sm:text-[18px]">
            Mise à jour de la page communauté
          </CardTitle>
          <CardDescription>
            Remplir les champs suivants et mettre à jour la page communauté
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[16px] sm:text-[18px]">
          <div className="space-y-1">
            <Label htmlFor="title">
              Nom de la communauté <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="title"
              name="title"
              value={title}
              placeholder="Entrer le nom de la communauté"
              onChange={handleTitle}
              className={`${classTitle ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">
              Description de la communauté{" "}
              <span className="text-[#e91e63]">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              placeholder="Entrer une description de la communauté"
              onChange={handleDescription}
              required
              className={`${classDescription ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1 ">
            <Label htmlFor="logoUrl">
              Insérer le logo de la communauté {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="logoUrl"
                name="logUrl"
                value={logoUrl}
                placeholder="Entrer une image représentant le logo de la communauté"
                onChange={handleLogoUrl}
                disabled={stateDownload || startSending}
              />
              <ButtonUploadFile
                setImageUrl={setLogoUrl}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
                name="updateCommunaute"
                valueForHtml="updateCommunaute"
                key="updateCommunaute"
              />
            </div>
          </div>

          <div className="space-y-1 ">
            <Label htmlFor="banniereUrl">
              Mettre à jour l'image bannière de la communauté {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="banniereUrl"
                name="banniereUrl"
                value={banniereUrl}
                placeholder="Entrer une image représentant la bannière de la communauté"
                onChange={handleBanniereUrl}
                disabled={stateDownload || startSending}
              />
              <ButtonUploadFile
                setImageUrl={setBanniereUrl}
                setStateDownload={setStateDownload}
                stateDownload={stateDownload}
              />
            </div>
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter className="flex items-center gap-3">
          <Button
            disabled={stateDownload || startSending}
            onClick={sendModificationOnCommunity}
          >
            Envoyer les modifications
          </Button>
          <Button
            disabled={stateDownload || startSending}
            className="p-0 flex items-center justify-center bg-[#e91e63] hover:bg-[#e91e62e0]"
          >
            <NavLink
              to="/COMMUNAUTES"
              className="w-full h-full flex items-center justify-center p-2"
            >
              Retour à la page communauté
            </NavLink>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default UpdateCommunaute;

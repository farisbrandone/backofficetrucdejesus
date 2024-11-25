import { Fragment } from "react/jsx-runtime";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  BannersAdsDataType,
  GroupeDataType,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
} from "@/fakeData";
import ButtonUploadFile from "@/mycomponents/ui/ButtonUploadFile";
import LoadingTotal from "@/mycomponents/ui/LoadingTotal";
import { Checkbox } from "@/components/ui/checkbox";

import { HoverInfoButton } from "@/mycomponents/ui/HoverInfoButton";
import { Switch } from "@/components/ui/switch";

function CreerBannersAds() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [status, setStatus] = useState("activate");
  const [statusGroupePage, setStatusGroupePage] = useState("activate");
  const [statusCommunityPage, setStatusCommunityPage] = useState("activate");
  const [groupePageAssociateTotal, setGroupePageAssociateTotal] = useState<
    GroupeDataType[]
  >([]);
  const [groupePageAssociate, setGroupePageAssociate] = useState<
    GroupeDataType[]
  >([]);
  const [stateDownload, setStateDownload] = useState(false);
  const [classTitle, setClassTitle] = useState(false);
  const [classTargetUrl, setClassTargetUrl] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [loadingGroupeData, setLoadingGroupeData] = useState(false);
  const { toast } = useToast();

  const handleGroupePageAssociate = (value: GroupeDataType) => {
    const result = groupePageAssociate.find((val) => {
      return value.id === val.id;
    });

    if (result) {
      const newResult = groupePageAssociate.filter(
        (val) => val.id !== value.id
      );
      setGroupePageAssociate([...newResult]);
      return;
    }
    setGroupePageAssociate((prev) => [...prev, value]);

    setGroupePageAssociate((prev) => [...prev, value]);
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(() => e.target.value);
    setClassTitle(false);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImage(() => e.target.value);
  };

  const handleTargetUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTargetUrl(() => e.target.value);
    setClassTargetUrl(false);
  };

  const handleStatusCommunityPage = () => {
    if (statusCommunityPage === "activate") {
      setStatusCommunityPage("desactivate");
      return;
    }
    setStatusCommunityPage("activate");
  };

  const handleStatusGroupePage = () => {
    if (statusGroupePage === "activate") {
      setStatusGroupePage("desactivate");
      return;
    }
    setStatusGroupePage("activate");
  };

  const handleChangeStatus = () => {
    console.log(status);
    if (status === "activate") {
      setStatus("desactivate");
      return;
    }
    setStatus("activate");
  };

  const CreateNew = async () => {
    console.log("banga");
    setStartSending(() => true);
    if (!title || !targetUrl) {
      if (!title) {
        setClassTitle(true);
      }
      if (!targetUrl) {
        setClassTargetUrl(true);
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
      var data: BannersAdsDataType = {
        title: title,
        targetUrl: targetUrl,
        image: image,
        statusCommunityPage: statusCommunityPage,
        groupePageAssociate: groupePageAssociate,
        statusGroupePage: statusGroupePage,
        status: status,
        dateOfCreation: "",
        dateOfUpdate: "",
      };
      console.log(data);
      const result = await requestToSetUniversalData<BannersAdsDataType>(
        "BannersAdsData",
        data
      );
      console.log(result);

      if (result.success) {
        console.log("shunga");
        toast({
          title: "Success",
          description: "Le groupe à été crée avec success",
        });
        setStartSending(() => false);
        window.location.replace("/GROUPES");
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
          "Une erreur est survenue pendant la création du groupe, vérifier votre connexion",
      });
      setStartSending(() => false);
      console.error("");
    }
  };

  useEffect(() => {
    const getAllPopupBanners = async () => {
      console.log("mimi");
      try {
        setLoadingGroupeData(true);

        const groupeData = await requestTogetAllUniversalData<GroupeDataType>(
          "GroupeData"
        );
        setGroupePageAssociateTotal({ ...groupeData });
        setLoadingGroupeData(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Les données n'ont pas pu etre télécharger, vérifier votre connexion",
        });
        setStartSending(() => false);
      }
    };
    getAllPopupBanners();
  }, []);

  return (
    <Fragment>
      {/* <HeaderForAllBackOffice /> */}
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              <span className="icon-[tabler--square] text-3xl"></span>
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                Popup Banners
              </h1>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[12px] sm:text-[18px]">
            Création d'un nouveau Popup Banners
          </CardTitle>
          <CardDescription>
            Remplir les champs suivants et créer un nouveau Popup Banners
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 flex flex-col gap-3 text-[16px] sm:text-[18px] max-w-[800px]">
          <div className="space-y-1">
            <Label htmlFor="title">
              Nom <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="title"
              name="title"
              value={title}
              placeholder=""
              onChange={handleTitle}
              className={`${classTitle ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="targetUrl">
              Target Url <span className="text-[#e91e63]">*</span>
            </Label>
            <Input
              id="targetUrl"
              name="targetUrl"
              value={targetUrl}
              placeholder="https://examle.com"
              onChange={handleTargetUrl}
              required
              className={`${classTargetUrl ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>

          <div className="flex items-center gap-1">
            <Switch
              id="airplane-mode1"
              checked={statusGroupePage === "activate"}
              onCheckedChange={handleStatusGroupePage}
            />
            <div className="flex items-center ">
              <p className="-mr-2">Community Page</p>
              <HoverInfoButton text="Activer le Switch pour afficher la Bannière Popup dans la page de la communauté" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Switch
              id="airplane-mode2"
              checked={statusCommunityPage === "activate"}
              onCheckedChange={handleStatusCommunityPage}
            />
            <div className="flex items-center gap-1">
              <p className="-mr-3">Groupe</p>
              <HoverInfoButton text="Activer le Switch pour afficher la Bannière Popup dans les groupes sélectionnés ci-dessous" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Switch
              id="airplane-mode3"
              checked={status === "activate"}
              onCheckedChange={handleChangeStatus}
            />
            <div className="flex items-center gap-1">
              <p className="-mr-3">Activation du Popup Banner</p>
              <HoverInfoButton text="Activer le Popup Banner pour que celui-ci soit fonctionnel" />
            </div>
          </div>

          {loadingGroupeData ? (
            <LoadingTotal />
          ) : (
            <div className="space-y-5 w-[350px] h-[250px] rounded-xl shadow-xl bg-[#eeeded] text-[#191919] overflow-y-scroll flex flex-col items-center gap-3  ">
              <p className="text-[18px] pl-3">Selectionner les groupes</p>
              <div className=" flex flex-col items-center gap-2 overflow-y-auto">
                {groupePageAssociateTotal.length &&
                  groupePageAssociateTotal?.map((value, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <Checkbox
                        id="terms"
                        onCheckedChange={() => handleGroupePageAssociate(value)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {value.titleGroupe}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <div className="space-y-1 " key="button2">
            <Label htmlFor="image">Image du Banner</Label>
            <div className="flex items-center gap-2" key="button21">
              <Input
                key="button21"
                id="image"
                name="image"
                value={image}
                placeholder="Url de l'image"
                onChange={handleImage}
                disabled={stateDownload || startSending}
              />
              <ButtonUploadFile
                name="file2"
                valueForHtml="drop-zone-2"
                key="button211"
                setImageUrl={setImage}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
              />
            </div>
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter className="flex items-center gap-3">
          <Button disabled={stateDownload || startSending} onClick={CreateNew}>
            Enregistrer
          </Button>
          <Button
            disabled={stateDownload || startSending}
            className="p-0 flex items-center justify-center bg-[#e91e63] hover:bg-[#e91e62e0]"
          >
            <NavLink
              to="/BANNERSADS"
              className="w-full h-full flex items-center justify-center p-2"
            >
              Retour
            </NavLink>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default CreerBannersAds;

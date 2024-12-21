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
import ButtonUploadFile from "../ui/ButtonUploadFile";
import { Button } from "@/components/ui/button";
import { NavLink, useParams } from "react-router-dom";
import { ChangeEvent, useState, Fragment, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  requestToGetAssetsDataWithId,
  requestToUpdateAssetsData,
} from "@/fakeData";
import { AssetsDataType } from "@/fakeData";

import { Textarea } from "@/components/ui/textarea";

import "react-quill/dist/quill.snow.css";

export const gererMembreIcon = (width: string, heigth: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={heigth}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M1 20v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20zm18 0v-3q0-1.1-.612-2.113T16.65 13.15q1.275.15 2.4.513t2.1.887q.9.5 1.375 1.112T23 17v3zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m10-4q0 1.65-1.175 2.825T15 12q-.275 0-.7-.062t-.7-.138q.675-.8 1.038-1.775T15 8t-.362-2.025T13.6 4.2q.35-.125.7-.163T15 4q1.65 0 2.825 1.175T19 8"
      />
    </svg>
  );
};

function UpdateAssets() {
  const [titleAssets, setTitleAssets] = useState("");

  const [imageAssets, setImageAssets] = useState("");
  const [webhookUrlAssets, setWebhookUrlAssets] = useState("");
  const [amountAssets, setAmountAsset] = useState("");
  const [valueAssets, setValueAssets] = useState("");
  const [shortDescriptionAssets, setShortDescriptionAssets] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [classAssets, setClassAssets] = useState(false);
  const [classShortDescriptionAssets, setClassShortDescriptionAssets] =
    useState(false);

  const [classAmountAsset, setClassAmountAsset] = useState(false);
  const [classValueAssets, setClassValueAssets] = useState(false);
  const [classImageAssetss, setClassImageAssetss] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const [status, setStatus] = useState("activate");
  const { toast } = useToast();
  const { assetsId } = useParams<string>();
  const handleAmountAsset = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAmountAsset(() => e.target.value);
    setClassAmountAsset(false);
  };

  const handleValueAssets = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValueAssets(() => e.target.value);
    setClassValueAssets(false);
  };

  const handleTitleAssets = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleAssets(() => e.target.value);
    setClassAssets(false);
  };
  const handleShortDescriptionAssets = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setShortDescriptionAssets(() => e.target.value);
    setClassShortDescriptionAssets(false);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImageAssets(() => e.target.value);
    setClassImageAssetss(false);
  };

  const handleUrlAssetss = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWebhookUrlAssets(() => e.target.value);
  };

  const handleChangeStatusAssetss = () => {
    if (status === "activate") {
      setStatus("desactivate");
      return;
    }
    setStatus("activate");
  };

  const updateNewAssets = async () => {
    setStartSending(() => true);
    if (
      !titleAssets ||
      !amountAssets ||
      !valueAssets ||
      !shortDescriptionAssets
    ) {
      if (!titleAssets) {
        setClassAssets(true);
      }
      if (!shortDescriptionAssets) {
        setClassShortDescriptionAssets(true);
      }
      if (!amountAssets) {
        setClassAmountAsset(true);
      }
      if (!valueAssets) {
        setClassValueAssets(true);
      }

      if (!imageAssets) {
        setClassImageAssetss(true);
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
      var data: AssetsDataType = {
        titleAssets,
        shortDescriptionAssets,
        imageAssets,
        amountAssets: amountAssets,
        valueAssets: valueAssets,
        webhookUrlAssets,
        status,
        id: assetsId ? assetsId : "",
      };

      const result = await requestToUpdateAssetsData(data);

      if (result.success) {
        toast({
          title: "Success",
          description: "Le membre a été crée avec success",
        });
        setStartSending(() => false);
        window.location.replace("/GERER LES ASSETS");
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
        description: "Une erreur est survenue pendant la creation de ce membre",
      });
      setStartSending(() => false);
      console.error("");
    }
  };

  useEffect(() => {
    async function getEventDataForUpdateWithId() {
      try {
        const data = await requestToGetAssetsDataWithId(assetsId as string);
        setTitleAssets(data.titleAssets);
        setShortDescriptionAssets(data.shortDescriptionAssets);
        setAmountAsset(data.amountAssets);
        setValueAssets(data.valueAssets);
        setImageAssets(data.imageAssets);
        setWebhookUrlAssets(data.webhookUrlAssets);
        setStatus(data.status);
      } catch (error) {
        setLoadingFail(true);
      }
    }
    getEventDataForUpdateWithId();
  }, []);

  if ((!titleAssets || !shortDescriptionAssets) && !loadingFail) {
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
              <span className="icon-[streamline--investment-selection] text-3xl mr-1"></span>{" "}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                AJOUTER UN ASSET
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
            <option selected>Un Truc de Jesus!</option>
          </select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[12px] sm:text-[18px]">
            Ajout un nouvel asset
          </CardTitle>
          <CardDescription>
            Remplir les champs suivants et ajouter un nouvel asset
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[16px] sm:text-[18px]">
          <div className="space-y-1">
            <Label htmlFor="titleAssets">
              Nom de l'asset <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="titleAssets"
              name="titleAssets"
              type="text"
              value={titleAssets}
              placeholder="Entrer le titre de l'asset"
              onChange={handleTitleAssets}
              className={`${classAssets ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="shortDescriptionAssets">
              Courte description de l'asset
              <span className="text-[#e91e63]">*</span>
            </Label>
            <Textarea
              id="shortDescriptionAssets"
              name="shortDescriptionAssets"
              value={shortDescriptionAssets}
              placeholder="Entrer une courte description de l'asset"
              onChange={handleShortDescriptionAssets}
              required
              className={`${
                classShortDescriptionAssets ? "border-red-600" : ""
              }`}
              disabled={startSending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amountAssets">
              Enter le montant de l'asset{" "}
              <span className="text-[#e91e63]">*</span>
            </Label>
            <div className="flex items-center gap-1">
              <span className="icon-[fontisto--euro] text-xl"></span>
              <Input
                type="amountAssets"
                id="amountAssets"
                name="amountAssets"
                value={amountAssets}
                placeholder="Entrer le montant de l'asset"
                onChange={handleAmountAsset}
                required
                className={`${
                  classAmountAsset
                    ? "border-red-600 focus:rounded-l-none"
                    : "focus:rounded-l-none"
                }`}
                disabled={startSending}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valueAssets">
              Enter la valeur de l'asset{" "}
              <span className="text-[#e91e63]">*</span>
            </Label>
            <div className="flex items-center gap-1">
              <span className="icon-[fontisto--euro] text-xl"></span>
              <Input
                type="valueAssets"
                id="valueAssets"
                name="valueAssets"
                value={valueAssets}
                placeholder="Enter la valeur de l'asset"
                onChange={handleValueAssets}
                required
                className={`${
                  classValueAssets
                    ? "border-red-600 focus:rounded-l-none"
                    : "focus:rounded-l-none"
                }`}
                disabled={startSending}
              />
            </div>
          </div>

          <div className="felx flex-col items-center space-y-2">
            <input
              type="checkbox"
              id="statusId"
              value={status}
              checked={status === "activate"}
              onChange={handleChangeStatusAssetss}
            />
            <label
              htmlFor="statusId"
              className="ml-2 text-[16px] font-semibold"
            >
              Activé l'asset(status)
            </label>
          </div>

          <div className="space-y-2 " key="button1">
            <Label htmlFor="imageAssets">
              Insérer une image bannière pour l'asset {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2" key="button21">
              <Input
                key="button11"
                id="imageAssets"
                name="imageAssets"
                value={imageAssets}
                placeholder="Entrer une imageAssets représentant le logo du groupe"
                onChange={handleImage}
                disabled={stateDownload || startSending}
                className={` w-[80%] ${
                  classImageAssetss
                    ? "border-red-600 focus:rounded-l-none"
                    : "focus:rounded-l-none"
                } space-y-2`}
              />
              <ButtonUploadFile
                name="file1"
                valueForHtml="drop-zone-1"
                key="button111"
                setImageUrl={setImageAssets}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
              />
            </div>
          </div>

          <div className="space-y-2 ">
            <Label htmlFor="webhookUrlAssets">
              Entrer le webhook url de l'asset (optionnel){" "}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="webhookUrlAssets"
                name="webhookUrlAssets"
                value={webhookUrlAssets}
                placeholder=" Entrer le webhook url de l'asset"
                onChange={handleUrlAssetss}
                disabled={startSending}
                className={` w-[80%] ${
                  webhookUrlAssets
                    ? "border-red-600 focus:rounded-l-none"
                    : "focus:rounded-l-none"
                } space-y-2`}
              />
            </div>
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter className="flex items-center gap-3 space-y-2">
          <Button
            disabled={stateDownload || startSending}
            onClick={updateNewAssets}
          >
            Enregistrer
          </Button>
          <Button
            disabled={stateDownload || startSending}
            className="p-0 flex items-center justify-center bg-[#e91e63] hover:bg-[#e91e62e0]"
          >
            <NavLink
              to="/GERER LES ASSETS"
              className="w-full h-full flex items-center justify-center p-2"
            >
              Retour aux assets
            </NavLink>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default UpdateAssets;

import Asterix from "../ui/Asterix";
import SaveContent from "../ui/SaveContent";
import RetourContent from "../ui/RetourContent";
import timeZoneData from "./timeZoneData.json";
import ButtonUploadFile from "../ui/ButtonUploadFile";
import { toast } from "@/hooks/use-toast";
import {
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
export interface CommunityDataType {
  title: string;
  description: string;
  logoUrl: string;
  banniereUrl: string;
  communityUrl: string;
  faviconUrl: string;
  timeZone: string;
  status: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export default function CommunityDetails({
  setCommunityId,
  comunityId,
}: {
  comunityId: string;
  setCommunityId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [title, setTitle] = useState("");
  const [classTitle, setClassTitle] = useState(false);
  const [description, setDescription] = useState("");
  const [classDescription, setClassDescription] = useState(false);
  const [timeZone, setTimeZone] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [banniereUrl, setBanniereUrl] = useState("");
  const [stateDownloadProps, setStateDownloadProps] = useState(false);
  const [stateDownloadProps2, setStateDownloadProps2] = useState(false);
  const [stateDownloadProps3, setStateDownloadProps3] = useState(false);
  const [communityUrl, setCommunityUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [startSending, setStartSending] = useState(false);
  const [classCommunityUrl, setClassCommunityUrl] = useState(false);
  const navigate = useNavigate();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
    setClassTitle(false);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescription(e.target.value);
    setClassDescription(false);
  };

  const handleTimeZone = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setTimeZone(e.target.value);
  };

  const handleLogoUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLogoUrl(e.target.value);
  };

  const handleBanniereUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBanniereUrl(e.target.value);
  };
  const handleCommunityUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCommunityUrl(e.target.value);
  };

  const handleFaviconUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFaviconUrl(e.target.value);
  };

  const SaveCommunityData = async () => {
    console.log("banga");
    setStartSending(() => true);
    if (!title || !communityUrl || !description) {
      if (!title) {
        setClassTitle(true);
      }
      if (!description) {
        setClassDescription(true);
      }
      if (!communityUrl) {
        setClassCommunityUrl(true);
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs requis n'ont pas été remplis",
      });
      setStartSending(() => false);
      return;
    }
    var data: CommunityDataType = {
      title,
      description,
      logoUrl,
      banniereUrl,
      communityUrl,
      faviconUrl,
      timeZone,
      status: "desactivate",
    };

    console.log({ data: data });

    if (comunityId) {
      const result =
        await requestToUpdateUniversalDataWithId<CommunityDataType>(
          comunityId as string,
          "CommunityData",
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
    }

    const resultAll = await requestToSetUniversalData<CommunityDataType>(
      "CommunityData",
      data
    );
    if (resultAll.success) {
      const result = await requestTogetAllUniversalData<CommunityDataType>(
        "CommunityData"
      );

      const myResult = result.find(
        (val) =>
          val.title === title &&
          val.banniereUrl === banniereUrl &&
          val.communityUrl === communityUrl
      );

      setCommunityId(myResult?.id as string);
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

  return (
    <div className="flex flex-col mx-10 shadow-xl border-[1px] ">
      <div className="h-[500px] flex flex-col flex-wrap gap-4 px-8 ">
        <div className="flex flex-col ">
          <label htmlFor="nom">
            Nom de la communauté <Asterix />
          </label>
          <input
            type="text"
            id="nom"
            value={title}
            onChange={handleTitle}
            className={`${
              classTitle ? " border-red-600" : " inputStyle rounded-r-md"
            }`}
            disabled={startSending}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="description">Description de la communauté</label>
          <textarea
            name="description"
            id="description"
            value={description}
            rows={3}
            onChange={handleDescription}
            className={`${
              classDescription
                ? "border-red-600 max-w-[800px] "
                : " border-[#191919] focus:border-[#e91e63] border-[1px] border-solid focus:outline-none rounded-md px-2 max-w-[800px]  "
            }`}
            disabled={startSending}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="timeZone"> Time Zone </label>
          <select
            name="timeZone"
            id="timeZone"
            value={timeZone}
            onChange={handleTimeZone}
            disabled={startSending}
            className="inputStyle rounded-r-md"
          >
            {timeZoneData.map((value) => (
              <option value={value.value}> {value.text} </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="logoUrl">Logo de la communauté </label>
          <div className="flex items-center max-w-[800px] ">
            <div className="flex items-center justify-center w-[36px] h-[36px] bg-[#e9ecef] border-[1px] border-solid border-[#e9ecef] ">
              <span className="icon-[fa-solid--image] text-[16px] "></span>
            </div>
            <input
              type="text"
              id="logoUrl"
              className="inputStyle flex-1"
              value={logoUrl}
              onChange={handleLogoUrl}
              disabled={startSending || stateDownloadProps}
            />
            <ButtonUploadFile
              name="logoUrl1"
              valueForHtml="logoUrl1"
              key="logoUrl1"
              setImageUrl={setLogoUrl}
              setStateDownloadProps={setStateDownloadProps}
              stateDownloadProps={stateDownloadProps}
            />
            {logoUrl && (
              <img
                src={logoUrl}
                alt="AV"
                className="object-cover w-[36px] h-[36px] ml-1 "
                height={36}
                width={36}
              />
            )}
          </div>
          <p className="text-[12px] ">
            Maximum Size(px): 200*50 [Format PNG or JPEG]
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="banniereUrl">Image bannière de la communauté </label>
          <div className="flex items-center max-w-[800px] ">
            <div className="flex items-center justify-center w-[36px] h-[36px] bg-[#e9ecef] border-[1px] border-solid border-[#e9ecef]">
              <span className="icon-[fa-solid--image] text-[16px] "></span>
            </div>
            <input
              type="text"
              id="banniereUrl"
              className="inputStyle flex-1"
              value={banniereUrl}
              onChange={handleBanniereUrl}
              disabled={startSending || stateDownloadProps2}
            />
            <ButtonUploadFile
              name="banniereUrl1"
              valueForHtml="banniereUrl1"
              key="banniereUrl1"
              setImageUrl={setBanniereUrl}
              setStateDownloadProps={setStateDownloadProps2}
              stateDownloadProps={stateDownloadProps2}
            />
            {banniereUrl && (
              <img
                src={banniereUrl}
                alt="BA"
                className="object-cover w-[36px] h-[36px] ml-1 "
                width={36}
                height={36}
              />
            )}
          </div>
          <p className="text-[12px] ">
            Maximum Size(px): 1200*250 [Format PNG or JPEG]
          </p>
        </div>

        <div className="flex flex-col max-w-[800px] ">
          <label htmlFor="communityUrl">
            URL de la communauté <Asterix />{" "}
          </label>
          <div className="flex items-center">
            <p className="h-[36px] font-bold flex items-center justify-center px-1 bg-[#e9ecef] border-[1px] border-solid border-[#e9ecef]">
              https://
            </p>
            <input
              type="text"
              id="communityUrl"
              value={communityUrl}
              onChange={handleCommunityUrl}
              className={`${
                classCommunityUrl
                  ? "border-red-600 flex-1"
                  : " inputStyle flex-1"
              }`}
              disabled={startSending}
            />
            <p className="h-[36px] font-bold flex items-center justify-center px-1 bg-[#e9ecef] border-[1px] border-solid border-[#e9ecef]">
              .vercel.com
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="faviconUrl">Favicon</label>
          <div className="flex items-center max-w-[800px] ">
            <div className="flex items-center justify-center w-[36px] h-[36px] bg-[#e9ecef] border-[1px] border-solid border-[#e9ecef]">
              <span className="icon-[fa-solid--image] text-[16px] "></span>
            </div>
            <input
              type="text"
              id="faviconUrl"
              className="inputStyle flex-1"
              value={faviconUrl}
              onChange={handleFaviconUrl}
              disabled={startSending || stateDownloadProps3}
            />
            <ButtonUploadFile
              name="faviconUrl1"
              valueForHtml="faviconUrl1"
              key="faviconUrl1"
              setImageUrl={setFaviconUrl}
              setStateDownloadProps={setStateDownloadProps3}
              stateDownloadProps={stateDownloadProps3}
            />
            {faviconUrl && (
              <img
                src={faviconUrl}
                alt="FA"
                className="object-cover w-[36px] h-[36px] ml-1 "
                width={36}
                height={36}
              />
            )}
          </div>
          <p className="text-[12px] ">
            Recommended Size(px): 32*32 [Format PNG or JPEG or ICO]
          </p>
        </div>
      </div>
      {startSending && (
        <div>Patienter l'action est en cours d'éxécution...</div>
      )}
      <div className="flex items-center gap-2 mb-6">
        <button
          className="saveButton"
          onClick={SaveCommunityData}
          disabled={startSending}
        >
          {" "}
          <SaveContent />
        </button>
        <button
          title="Retour"
          className="buttonRetour"
          onClick={() => navigate("/COMMUNAUTES")}
          disabled={startSending}
        >
          <RetourContent />
        </button>
      </div>
    </div>
  );
}

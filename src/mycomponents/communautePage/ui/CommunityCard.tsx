import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { CommunityDataType } from "../CommunityDetails";
import { AvatarBackoffice } from "@/mycomponents/ui/AvatarBackofice";
import { DropdownMenuBackoffice } from "@/mycomponents/ui/DropdownMenuBackoffice";
import { toast } from "@/hooks/use-toast";
import {
  requestToChangeStatus,
  requestTogetAllUniversalData,
} from "@/fakeData";
import LoadingTotal from "@/mycomponents/ui/LoadingTotal";

export interface timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface CarteCreerType {
  title: string;
  date: string;
  subTitle: string;
  value: number;
}

export default function CommunityCard({
  valueCommunity,
  setCommunityData,
  setLoadingFail,
}: {
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
  setCommunityData: React.Dispatch<
    React.SetStateAction<CommunityDataType[] | undefined>
  >;
  valueCommunity: CommunityDataType;
}) {
  const [move, setMove] = useState(false);
  const [switchState, setSwitchState] = useState(status);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const navigate = useNavigate();

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
        valueCommunity.id as string,
        status,
        "CommunityData"
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

  useEffect(() => {
    const getAllGroupeData = async () => {
      try {
        const data = await requestTogetAllUniversalData<CommunityDataType>(
          "CommunityData"
        );
        setCommunityData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllGroupeData();
  }, [switchState]);

  return (
    <div
      className={`relative flex flex-col w-[400px] h-[370px]  items-center shadow-2xl rounded-xl border-[2px] `}
      onMouseEnter={() => setMove(true)}
      onMouseLeave={() => setMove(false)}
    >
      <div className=" absolute flex items-center justify-center gap-1 top-[200px] w-full ">
        <button
          className="   flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px] rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500"
          onClick={() => navigate(`/COMMUNAUTES/update/${valueCommunity.id}`)}
        >
          <span className="icon-[material-symbols--edit] mr-1"></span>
          <p>Edit</p>
        </button>
        <button
          className="   flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px] rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500 "
          onClick={() => navigate(`/GROUPES/${valueCommunity.id}`)}
        >
          <span className="icon-[fa6-solid--people-group] mr-1"></span>
          <p>Groupes</p>
        </button>
        <a
          className="flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px]  rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500"
          href={`https://reseausocial-trucdejesus.vercel.app/community/${valueCommunity.id}`}
          target="_blank"
        >
          <span className="icon-[mynaui--arrow-up-right-square-solid] text-[12px] mr-1"></span>
          <p>Visit</p>
        </a>
        <button className="flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px]  rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500">
          <span className="icon-[bi--rocket-takeoff] mr-1"></span>
          <p>Lauch Community</p>
        </button>
      </div>

      <div
        className={clsx(
          "object-cover w-full  flex items-center justify-center rounded-t-xl h-[230px] px-1 ",
          {
            "-translate-y-16 transition-transform ease-in-out": move,
          },
          { "translate-y-0 transition-transform ease-in-out": !move }
        )} /* className="w-full h-[150px] flex items-center justify-center " */
      >
        {valueCommunity.banniereUrl &&
        valueCommunity.banniereUrl.includes(".mp4") ? (
          <video autoPlay={true} muted={true}>
            <source src={valueCommunity.banniereUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        ) : (
          <img
            src={valueCommunity.banniereUrl}
            alt="Image bannière"
            className={clsx(
              "object-cover w-full h-[220px]  ",
              {
                "-translate-y-12 transition-transform ease-in-out": move,
              },
              { "translate-y-0 transition-transform ease-in-out": !move }
            )}
          />
        )}
      </div>
      <div className="w-full mt-[10px]">
        <div className="flex justify-between items-center w-full h-[25px] p-0">
          <p className="ml-4  max-w-[200px] text-ellipsis overflow-hidden h-[25px] leading-[25px] align-middle ">
            {valueCommunity.title}
          </p>
          <div className="flex items-center space-x-2 mr-3">
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
        <div className="text-[12px] mt-2 ">
          <p className="flex items-center ml-4">
            {" "}
            <span className="icon-[bxs--calendar] text-xl mr-1 "></span>{" "}
            <span>
              {format(
                new Date(valueCommunity.dateOfUpdate as string),
                "dd MMM yyyy"
              )}
            </span>
          </p>
          <p className="ml-4">{valueCommunity.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-3">
        <div className="flex ml-4 ">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={`${index > 0 ? "-ml-4" : ""}`}>
              <AvatarBackoffice />
            </div>
          ))}
        </div>
        <div className="mr-4">
          <DropdownMenuBackoffice
            title="ACTIONS"
            valueCommunity={valueCommunity}
          />
        </div>
      </div>
    </div>
  );
}

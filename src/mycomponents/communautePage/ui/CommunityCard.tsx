import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { format } from "date-fns";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { CommunityDataType } from "../CommunityDetails";
import { AvatarBackoffice } from "@/mycomponents/ui/AvatarBackofice";
import { DropdownMenuBackoffice } from "@/mycomponents/ui/DropdownMenuBackoffice";

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
}: {
  valueCommunity: CommunityDataType;
}) {
  const [move, setMove] = useState(false);
  const navigate = useNavigate();

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
        <button className="flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px]  rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500">
          <span className="icon-[mynaui--arrow-up-right-square-solid] text-[12px] mr-1"></span>
          <p>Visit</p>
        </button>
        <button className="flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px]  rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500">
          <span className="icon-[bi--rocket-takeoff] mr-1"></span>
          <p>Lauch Community</p>
        </button>
      </div>

      <div
        className={clsx(
          "object-cover w-full  flex items-center justify-center rounded-t-xl h-[223px] px-1 ",
          {
            "-translate-y-16 transition-transform ease-in-out": move,
          },
          { "translate-y-0 transition-transform ease-in-out": !move }
        )} /* className="w-full h-[150px] flex items-center justify-center " */
      >
        <video autoPlay={true} muted={true} className="rounded-t-xl">
          <source
            src="https://d1yei2z3i6k35z.cloudfront.net/5322770/65fc0be058c63_HeaderAppUnTrucdeJESUS.mp4"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>
      <div className="w-full mt-[10px]">
        <div className="flex justify-between items-center w-full h-[25px] p-0">
          <p className="ml-4  max-w-[200px] text-ellipsis overflow-hidden h-[25px] leading-[25px] align-middle ">
            {valueCommunity.title}
          </p>
          <div className="flex items-center space-x-2 mr-4">
            <Switch id="airplane-mode" />
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

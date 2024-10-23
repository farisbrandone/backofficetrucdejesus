import { Switch } from "@/components/ui/switch";

import { AvatarBackoffice } from "./AvatarBackofice";
import {
  DropdownMenuBackoffice,
  DropdownMenuForGroupe,
} from "./DropdownMenuBackoffice";

export interface CarteCreerType {
  title: string;
  date: string;
  subTitle: string;
  value: number;
}

export default function CarteCreer({
  title,
  date,
  subTitle,
  value,
}: CarteCreerType) {
  return (
    <div
      className={`flex flex-col w-[300px] h-[300px] items-center ${
        value === 5 ? "justify-self-start" : ""
      }`}
    >
      <div className="w-full h-[150px] flex items-center justify-center ">
        <video autoPlay={true} muted={true}>
          <source
            src="https://d1yei2z3i6k35z.cloudfront.net/5322770/65fc0be058c63_HeaderAppUnTrucdeJESUS.mp4"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>
      <div className="w-full mt-5">
        <div className="flex justify-between items-center w-full">
          <p>{title}</p>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
          </div>
        </div>
        <div className="text-[12px] mt-2 ">
          <p>{date}</p>
          <p>{subTitle}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-3 ">
        <div className="flex ">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={`${index > 0 ? "-ml-4" : ""}`}>
              <AvatarBackoffice />
            </div>
          ))}
        </div>
        <div>
          <DropdownMenuBackoffice title="Action" />
        </div>
      </div>
    </div>
  );
}

export interface CarteCreerForGroupType {
  titleGroupe: string;
  descriptionGroupe: string;
  typeAccess: string;
  dateGroupe: string;
  logoUrlGroupe: string;
  banniereGroupe: string;
  groupeId: string;
}

export function CarteCreerForGroup({
  titleGroupe,
  descriptionGroupe,
  typeAccess,
  dateGroupe,
  logoUrlGroupe,
  banniereGroupe,
  groupeId,
}: CarteCreerForGroupType) {
  return (
    <div className={`flex flex-col w-[300px] h-[300px] items-center`}>
      <div className="w-full h-[150px] flex items-center justify-center px-2 ">
        {banniereGroupe.includes(".mp4") ? (
          <video autoPlay={true} muted={true}>
            <source src={banniereGroupe} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        ) : (
          <img
            src={banniereGroupe}
            alt="Image bannière"
            className="object-cover w-full "
          />
        )}
      </div>
      <div className="w-full mt-5">
        <div className="flex justify-between items-center w-full">
          <p>{titleGroupe}</p>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
          </div>
        </div>
        <div className="text-[12px] mt-2 ">
          <p>{dateGroupe}</p>
          <p>{descriptionGroupe}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-3 ">
        <div className="flex ">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={`${index > 0 ? "-ml-4" : ""}`}>
              <AvatarBackoffice />
            </div>
          ))}
        </div>
        <div>
          <DropdownMenuForGroupe title="Action" groupeId={groupeId} />
        </div>
      </div>
    </div>
  );
}

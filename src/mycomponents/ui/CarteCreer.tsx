import { Switch } from "@/components/ui/switch";

import { AvatarBackoffice } from "./AvatarBackofice";
import { DropdownMenuBackoffice } from "./DropdownMenuBackoffice";

export interface CarteCreerType {
  title: string;
  date: string;
  subTitle: string;
  value: number;
}

function CarteCreer({ title, date, subTitle, value }: CarteCreerType) {
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

export default CarteCreer;

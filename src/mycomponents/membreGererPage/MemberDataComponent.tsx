import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { eyeCloseIcon, eyeOpenIcon } from "../clientGererPage/ClientGerer";
import { Switch } from "@/components/ui/switch";
/* import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"; */
import {
  requestToChangeStatus,
  requestTogetAllUniversalData,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import LoadingTotal from "../ui/LoadingTotal";
import { DropdownMenuForGroupe } from "../ui/DropdownMenuBackoffice";
import { format } from "date-fns";

export interface MemberDataType {
  name: string;
  email: string;
  motsDepasse: string;
  sexe: string;
  birthDay: string;
  phone: string;
  status: string;
  image: string;
  communityId?: string;
  groupeId?: string[];
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
  nombrePartage: number;
  nombreLikes: number;
  nombreCommentaire: number;
  nombreDeMerciBenis: number;
  nombreDactivite: number;
  nombreDeBadge: number;
}

export interface MemberDataComponentType {
  value: MemberDataType;
  index: number;
  setMembreData: React.Dispatch<
    React.SetStateAction<MemberDataType[] | undefined>
  >;
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
  communityId: string | undefined;
}

export const phoneIcon = (width: string, heigth: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={heigth}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m20.487 17.14l-4.065-3.696a1 1 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66c-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a1 1 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39"
      />
    </svg>
  );
};

function MemberDataComponent({
  communityId,
  value,
  /*  index, */
  setMembreData,
  setLoadingFail,
}: MemberDataComponentType) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [switchState, setSwitchState] = useState(value.status);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  console.log({ value });

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
        value.id as string,
        status,
        "MemberData"
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
    const getAllMembreData = async () => {
      try {
        const data = await requestTogetAllUniversalData<MemberDataType>(
          "MemberData"
        );
        if (communityId) {
          const trueResult = data.filter(
            (value) => value.communityId === communityId
          );

          setMembreData([...trueResult]);
        }
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllMembreData();
  }, [switchState]);

  return (
    <div className="w-full grid grid-cols-10  mb-2">
      <div className="avatarNameEmail flex items-center ml-3 ">
        <div>
          <Avatar className={`text-[20px] flex items-center justify-center `}>
            <AvatarImage src={value.image} alt="img" />
            <AvatarFallback>
              {value?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col px-2">
          <p className="text-[14px] "> {value.name.split(" ")[0]} </p>
          <p className="text-[10px] "> {value.email} </p>
        </div>
      </div>
      <div className="place-content-center mx-auto">
        <img
          src={value.image}
          alt=""
          className="object-cover w-[30px] h-[30px] rounded-full "
        />
      </div>
      <div className="place-content-center mx-auto ">
        <input
          type={!isPasswordVisible ? "password" : "text"}
          title="enter password"
          value={value.motsDepasse}
          className="outline-none w-[50px] "
        />
        <button onClick={togglePasswordVisibility} className="pl-2">
          {isPasswordVisible
            ? eyeOpenIcon("15", "15")
            : eyeCloseIcon("15", "15")}
        </button>
      </div>
      <div className=" place-content-center mx-auto">{value.sexe}</div>
      <div className=" place-content-center mx-auto flex items-center overflow-auto">
        {" "}
        <span className="mr-1 pt-[6px] "> {phoneIcon("15", "15")} </span>{" "}
        {value.phone}
      </div>
      <div className=" place-content-center mx-auto overflow-hidden">
        {value.birthDay}
      </div>
      <div className=" place-content-center mx-auto overflow-hidden text-center">
        {format(new Date(value.dateOfCreation as string), "'le' dd MMM yyyy")}
      </div>
      <div className="place-content-center mx-auto overflow-hidden text-center">
        {format(new Date(value.dateOfUpdate as string), "'le' dd MMM yyyy")}
      </div>
      <div className="place-content-center mx-auto">
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

      {/* <div className="place-content-center mx-auto">
        <Switch id="airplane-mode" />
      </div> */}
      {/*  <div className=" place-content-center mx-auto ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-center"
            >
              ...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#191919] text-white">
            <DropdownMenuGroup>
              <DropdownMenuItem>update</DropdownMenuItem>
              <DropdownMenuItem>delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}

      <div className=" place-content-center mx-auto ">
        <DropdownMenuForGroupe
          title="..."
          groupeId={value.id as string}
          baseUrl="GERER LES MEMBRES/update-membre-page"
          groupeForEventSelect={[]}
        />
      </div>
    </div>
  );
}

export default MemberDataComponent;

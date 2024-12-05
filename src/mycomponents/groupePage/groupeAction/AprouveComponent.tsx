import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  GroupeDataType,
  requestTogetAllUniversalData,
  requestToGetAllUniversalDataWithId,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { format } from "date-fns";
import LoadingTotal from "@/mycomponents/ui/LoadingTotal";
import { MemberDataType } from "@/mycomponents/membreGererPage/MemberDataComponent";

export interface MemberDataComponentType {
  groupeId: string;
  value: MemberDataType;
  index: number;
  setMembreData: React.Dispatch<
    React.SetStateAction<MemberDataType[] | undefined>
  >;
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
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

function AprouveComponent({
  groupeId,
  value,
  /*  index, */
  setMembreData,
  setLoadingFail,
}: MemberDataComponentType) {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [myGroupeData, setMyGroupeData] = useState<GroupeDataType>();
  const [switchState, setSwitchState] = useState("desactivate");
  const handleSwitch = async (memberId: string) => {
    try {
      setLoadingStatus(true);
      if (myGroupeData) {
        if (switchState === "activate") {
          const result = myGroupeData?.memberId?.filter(
            (value) => value !== memberId
          );
          const changeGroupe = await requestToUpdateUniversalDataWithId(
            groupeId,
            "GroupeData",
            { memberId: result }
          );
          console.log(changeGroupe);

          setSwitchState("desactivate");
        } else {
          const result = myGroupeData?.memberId?.push(memberId);
          const changeGroupe = await requestToUpdateUniversalDataWithId(
            groupeId,
            "GroupeData",
            { memberId: result }
          );
          console.log(changeGroupe);
          setSwitchState("activate");
        }
      }
      /*  const result = await requestToChangeStatus(
        value.id,
        status,
        ""
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
      } */

      setLoadingStatus(false);
    } catch (error) {}
  };
  useEffect(() => {
    const getAllMembreData = async () => {
      try {
        setLoadingStatus(true);
        const data = await requestTogetAllUniversalData<MemberDataType>(
          "MemberData"
        );
        const groupeData =
          await requestToGetAllUniversalDataWithId<GroupeDataType>(
            groupeId,
            "GroupeData"
          );
        setMyGroupeData({ ...groupeData });
        setMembreData([...data]);
        if (groupeData.memberId?.includes(value.id as string)) {
          setSwitchState("activate");
        }
        setLoadingStatus(false);
      } catch (error) {
        setLoadingStatus(false);
        setLoadingFail(true);
      }
    };
    getAllMembreData();
  }, [switchState]);

  return (
    <div className="w-full grid grid-cols-5  mb-2">
      <div className="avatarNameEmail flex items-center ml-3 ">
        <div>
          <Avatar className={`text-[20px] flex items-center justify-center `}>
            <AvatarImage src={value.image} alt="img" />
            <AvatarFallback>
              {value.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col px-2">
          <p className="text-[14px] "> {value.name.split(" ")[0]} </p>
          <p className="text-[10px] "> {value.email} </p>
        </div>
      </div>

      <div className=" place-content-center mx-auto flex items-center overflow-auto">
        {" "}
        <span className="mr-1 pt-[6px] "> {phoneIcon("15", "15")} </span>{" "}
        {value.phone}
      </div>
      <div className=" place-content-center mx-auto overflow-hidden">
        {format(new Date(value.birthDay), "dd/MM/yyyy")}
      </div>
      <div className=" place-content-center mx-auto overflow-hidden text-center">
        {format(new Date(value.dateOfCreation as string), "'le' dd MMM yyyy")}
      </div>
      <div className="place-content-center mx-auto">
        {loadingStatus ? (
          <LoadingTotal />
        ) : (
          <Switch
            id="airplane-mode"
            checked={switchState === "activate"}
            onCheckedChange={() => handleSwitch(value.id as string)}
          />
        )}
      </div>
    </div>
  );
}

export default AprouveComponent;

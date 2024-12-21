import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { eyeCloseIcon, eyeOpenIcon } from "../clientGererPage/ClientGerer";
import { Switch } from "@/components/ui/switch";

import {
  MemberWaitingDataType,
  requestToChangeStatus,
  requestToDeleteUniversalDataWithId,
  requestTogetAllUniversalData,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import LoadingTotal from "../ui/LoadingTotal";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface MemberWaitingDataComponentType {
  value: MemberWaitingDataType;
  index: number;
  setMembreData: React.Dispatch<
    React.SetStateAction<MemberWaitingDataType[] | undefined>
  >;
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
  communityId: string | undefined;
}

interface axiosType {
  success: string;
  error: string;
  alreadyExist: boolean;
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

function MemberWaitingDataComponent({
  communityId,
  value,
  /*  index, */
  setMembreData,
  setLoadingFail,
}: MemberWaitingDataComponentType) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [switchState, setSwitchState] = useState(value.status);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [startSending, setStartSending] = useState(false);
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
        "MemberWaitingData"
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

  const addMember = async () => {
    setStartSending(() => true);

    try {
      /*   const result = await requestToSetUniversalData(
        "MemberWaitingData",
        value
      );

      if (result.success) {
        toast({
          title: "Success",
          description: "Le membre a été crée avec success",
        });
        setStartSending(() => false); */

      const result = await axios.post<axiosType, axiosType>(
        " https://serverbackofficetrucdejesus.onrender.com/api/frontoffice/acceptsignup",
        value
      );

      /* 
      http://localhost:4000
      https://serverbackofficetrucdejesus.onrender.com */

      if (result.alreadyExist) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: result.success,
        });
      }

      const deleteResult = await requestToDeleteUniversalDataWithId(
        value.id as string,
        "MemberWaitingData"
      );
      console.log({ result, deleteResult });
      if (deleteResult.success) {
        window.location.replace(`/GERER LES MEMBRES/${value.communityId}`);
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue cotée serveur",
        });
        setStartSending(() => false);
      }
      /*  } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue cotée serveur",
        });
        setStartSending(() => false);
      } */
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
    const getAllMembreData = async () => {
      try {
        const data = await requestTogetAllUniversalData<MemberWaitingDataType>(
          "MemberWaitingData"
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

      <div className=" place-content-center mx-auto ">
        <Button onClick={addMember} disabled={startSending}>
          {" "}
          Ajouter{" "}
          {startSending && (
            <span className="icon-[eos-icons--three-dots-loading] text-xl"></span>
          )}{" "}
        </Button>
      </div>
    </div>
  );
}

export default MemberWaitingDataComponent;

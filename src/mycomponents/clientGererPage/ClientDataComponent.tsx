import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { eyeCloseIcon, eyeOpenIcon } from "../clientGererPage/ClientGerer";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ClientDataType,
  requestToChangeStatus,
  requestTodeleteClientDataWithId,
  requestTogetAllClientData,
} from "@/fakeData";
import { NavLink } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import LoadingTotal from "../ui/LoadingTotal";

export interface UserDataType {
  name: string;
  email: string;
  motsDepasse: string;
  dateCreation: string;
  dateMiseAJour: string;
  status: boolean;
  image: string;
}

export interface ClientDataComponentType {
  value: ClientDataType;
  index: number;
  setClientData: React.Dispatch<
    React.SetStateAction<ClientDataType[] | undefined>
  >;
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
}

function ClientDataComponent({
  value,
  index,
  setClientData,
  setLoadingFail,
}: ClientDataComponentType) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [pageForDeletion, setPageForDeletion] = useState(false);
  const [stateSuppression, setStateSuppression] = useState(false);
  const { toast } = useToast();
  const [switchState, setSwitchState] = useState(value.statusClient);
  const [loadingStatus, setLoadingStatus] = useState(false);
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
        value.id,
        status,
        "ClientData"
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
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const deleteGroupe = async () => {
    setStateSuppression(() => true);
    const result = await requestTodeleteClientDataWithId(value.id);
    if (result && !result.success) {
      toast({
        variant: "destructive",
        title: result.message,
        description: result.message,
      });
      setPageForDeletion(false);
      setStateSuppression(() => false);
      return;
    }

    toast({
      variant: "default",
      title: result && result.message,
      description: result && result.message,
    });
    setStateSuppression(() => false);
    setPageForDeletion(false);
    window.location.reload();
  };

  useEffect(() => {
    const getAllClientData = async () => {
      try {
        const data = await requestTogetAllClientData();
        setClientData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllClientData();
  }, [switchState]);

  return (
    <div className="w-full grid grid-cols-7  mb-2">
      {pageForDeletion && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-transparent backdrop-blur-lg z-50">
          <div className="relative w-[330px] h-[330px] flex flex-col items-center justify-center bg-[#344767] rounded-2xl drop-shadow-xl  ">
            <p className="text-[#fff] w-full text-center font-bold text-[18px] p-2 ">
              {" "}
              Voulez-vous vraiment supprimer ce client ?
            </p>
            {stateSuppression && (
              <div className="absolute bottom-8 text-center w-full">
                Le document est en cours de suppression...
              </div>
            )}
            <div className="absolute bottom-4 mx-auto flex items-center gap-2">
              <button
                type="button"
                className="bg-[#e91e63] text-white px-3 py-2 flex items-center justify-center hover:bg-[#e91e62d0] transition-all duration-500 rounded-lg disabled:bg-[#e91e627e]"
                onClick={deleteGroupe}
                disabled={stateSuppression}
              >
                Supprimer
              </button>
              <button
                type="button"
                className="bg-[#fff] text-[#191919] px-3 py-2 flex items-center justify-center hover:bg-[#ffffffc7] transition-all duration-500 rounded-lg disabled:bg-[#fff8]"
                onClick={() => setPageForDeletion(false)}
                disabled={stateSuppression}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="avatarNameEmail flex items-center ml-3 ">
        <div>
          <Avatar
            className={` ${
              (index + 1) % 2 === 0
                ? "bg-[#191919] text-white "
                : "bg-[#e91e63] text-white"
            } text-[20px] flex items-center justify-center `}
          >
            {value.nomClient.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <div className="flex flex-col px-2">
          <p className="text-[14px] "> {value.nomClient.split(" ")[0]} </p>
          <p className="text-[10px] "> {value.emailClient} </p>
        </div>
      </div>
      <div className="place-content-center mx-auto">
        <img
          src={value.logoClient}
          alt=""
          className="object-cover w-[30px] h-[30px] rounded-full "
        />
      </div>
      <div className="place-content-center mx-auto ">
        <input
          type={!isPasswordVisible ? "password" : "text"}
          title="enter password"
          value={value.passwordClient}
          className="outline-none w-[50px] "
        />
        <button onClick={togglePasswordVisibility} className="pl-2">
          {isPasswordVisible
            ? eyeOpenIcon("15", "15")
            : eyeCloseIcon("15", "15")}
        </button>
      </div>
      <div className=" place-content-center mx-auto">{value.dateCreated}</div>
      <div className="place-content-center mx-auto ">{value.dateUpdated}</div>
      <div className="flex items-center space-x-2">
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
              <DropdownMenuItem>
                <NavLink to="/GERER LES CLIENS/update-client-page">
                  Mettre à jour
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setPageForDeletion(true)}
                className="cursor-pointer"
              >
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default ClientDataComponent;

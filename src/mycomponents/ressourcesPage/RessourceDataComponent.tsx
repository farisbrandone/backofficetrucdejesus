import { useEffect } from "react";

import { requestTogetAllRessourcesData, RessourcesDataType } from "@/fakeData";

import { DropdownMenuForGroupe } from "../ui/DropdownMenuBackoffice";
import { format } from "date-fns";

export interface RessourcesDataComponentType {
  value: RessourcesDataType;
  index: number;
  setRessourcesData: React.Dispatch<
    React.SetStateAction<RessourcesDataType[] | undefined>
  >;
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
}

function RessourceDataComponent({
  value,
  /*  index, */
  setRessourcesData,
  setLoadingFail,
}: RessourcesDataComponentType) {
  /*  const [isPasswordVisible, setIsPasswordVisible] = useState(false); */
  /* const [switchState, setSwitchState] = useState(value.status); */
  /* const [loadingStatus, setLoadingStatus] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  console.log({ value }); */

  /* const handleSwitch = async () => {
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
        "MembreData"
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
  }; */
  useEffect(() => {
    const getAllRessourcesData = async () => {
      try {
        const data = await requestTogetAllRessourcesData();
        setRessourcesData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllRessourcesData();
  }, []);

  return (
    <div className="w-full grid grid-cols-6  mb-2">
      <div className="place-content-center mx-auto ">
        {value.titleRessource}
      </div>
      <div className="place-content-center mx-auto">
        <img
          src={value.imageRessource}
          alt=""
          className="object-cover w-[30px] h-[30px] rounded-full "
        />
      </div>
      <div className="place-content-center mx-auto text-[#e91e63] ">
        {value.typeRessources}
      </div>
      <div className=" place-content-center mx-auto">
        {format(new Date(value.date), "dd/MM/yyyy")}
      </div>
      <div className=" place-content-center mx-auto ">
        {value.textButtonRessource}
      </div>

      {/*  <div className="place-content-center mx-auto">
        {loadingStatus ? (
          <LoadingTotal />
        ) : (
          <Switch
            id="airplane-mode"
            checked={switchState === "activate"}
            onCheckedChange={handleSwitch}
          />
        )}
      </div> */}

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
          groupeId={value.id}
          baseUrl="GERER LES RESSOURCES/update-ressources-page"
        />
      </div>
    </div>
  );
}

export default RessourceDataComponent;

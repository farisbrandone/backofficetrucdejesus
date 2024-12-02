import { useEffect, useState } from "react";

import {
  requestToChangeStatus,
  requestTogetAllRessourcesData,
  RessourcesDataType,
} from "@/fakeData";

import { DropdownMenuForGroupe } from "../ui/DropdownMenuBackoffice";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import LoadingTotal from "../ui/LoadingTotal";
import { Switch } from "@/components/ui/switch";
import RessourceFormulaireForUpdate from "./RessourceFormulaireForUpdate";

export interface RessourcesDataComponentType {
  communityId: string;
  value: RessourcesDataType;
  index: number;
  setRessourcesData: React.Dispatch<
    React.SetStateAction<RessourcesDataType[] | undefined>
  >;
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
}

function RessourceDataComponent({
  communityId,
  value,
  /*  index, */
  setRessourcesData,
  setLoadingFail,
}: RessourcesDataComponentType) {
  const [switchState, setSwitchState] = useState(value.status);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [openStateForUpdate, setOpenStateForUpdate] = useState(false);
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
        "RessourcesData"
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
    <div className="w-full grid grid-cols-7  mb-2">
      {openStateForUpdate && (
        <RessourceFormulaireForUpdate
          communityId={communityId}
          setOpenStateForUpdate={setOpenStateForUpdate}
          ressourceId={value.id as string}
        />
      )}
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
        {format(new Date(value.dateOfUpdate as string), "dd/MM/yyyy")}
      </div>

      <div className=" place-content-center mx-auto ">
        {value.textButtonRessource}
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
        <DropdownMenuForGroupe
          communityId={communityId}
          title="..."
          groupeId={value.id as string}
          baseUrl="GERER LES RESSOURCES/update-ressources-page"
          groupeForEventSelect={[]}
          setOpenStateForUpdate={setOpenStateForUpdate}
        />
      </div>
    </div>
  );
}

export default RessourceDataComponent;

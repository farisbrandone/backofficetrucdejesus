import { useEffect, useState } from "react";

import {
  AssetsDataType,
  requestToChangeStatus,
  requestTogetAllUniversalData,
} from "@/fakeData";

import { DropdownMenuForGroupe } from "../ui/DropdownMenuBackoffice";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import LoadingTotal from "../ui/LoadingTotal";
import { Switch } from "@/components/ui/switch";

export interface AssetsDataComponentType {
  value: AssetsDataType;
  index: number;
  setAssetsData: React.Dispatch<
    React.SetStateAction<AssetsDataType[] | undefined>
  >;
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
}

const databaseName = "AssetsData";

function AssetsComponent({
  value,
  /*  index, */
  setAssetsData,
  setLoadingFail,
}: AssetsDataComponentType) {
  const [switchState, setSwitchState] = useState(value.status);
  const [loadingStatus, setLoadingStatus] = useState(false);

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
        value.id,
        status,
        "AssetsData"
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
    const getAllAssetsData = async () => {
      try {
        const data = await requestTogetAllUniversalData<AssetsDataType>(
          databaseName
        );
        setAssetsData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllAssetsData();
  }, []);

  return (
    <div className="w-full grid grid-cols-6  mb-2">
      <div className="place-content-center mx-auto ">{value.titleAssets}</div>
      <div className="place-content-center mx-auto">
        <img
          src={value.imageAssets}
          alt=""
          className="object-cover w-[30px] h-[30px] rounded-full "
        />
      </div>
      <div className="place-content-center mx-auto text-[#e91e63] ">
        {value.amountAssets}
      </div>
      <div className=" place-content-center mx-auto">
        {format(new Date(value.date), "dd/MM/yyyy")}
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
          title="..."
          groupeId={value.id}
          baseUrl="GERER LES ASSETS/update-assets-page"
          groupeForEventSelect={[]}
        />
      </div>
    </div>
  );
}

export default AssetsComponent;

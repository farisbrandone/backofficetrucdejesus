import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Fragment, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  requestToChangeStatus,
  requestTogetAllUniversalData,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import LoadingTotal from "@/mycomponents/ui/LoadingTotal";
import { DropdownMenuForGroupe } from "@/mycomponents/ui/DropdownMenuBackoffice";
import { format } from "date-fns";

export type UniversalDataComponentType<U> = {
  value: U;
  index: number;
  setData: React.Dispatch<React.SetStateAction<U[] | undefined>>;
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
  baseUrl: string;
  databaseName: string;
};
type AnyObject = Record<string, any>;

function UniversalDataComponent<U extends AnyObject>({
  value,
  baseUrl,
  setData,
  setLoadingFail,
  databaseName,
}: UniversalDataComponentType<U>) {
  type dat = keyof U;
  const val = "status" as dat;
  const id = "id" as dat;
  const [switchState, setSwitchState] = useState(value[val] as string);
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
        value[id] as string,
        status,
        "Data"
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
    const getAllData = async () => {
      try {
        const data = await requestTogetAllUniversalData<U>(databaseName);
        setData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllData();
  }, [switchState]);

  return (
    <div className="w-full grid grid-cols-10  mb-2">
      {Object.entries(value).map((val, index) => (
        <Fragment key={index}>
          {"image" === val[0] && (
            <Avatar className={`text-[20px] flex items-center justify-center `}>
              <AvatarImage src={value.image} alt="img" />
              <AvatarFallback>{value.image}</AvatarFallback>
            </Avatar>
          )}
          {"title" === val[0] && (
            <div className="place-content-center mx-auto">{value.name}</div>
          )}
          {"types" === val[0] && (
            <div className="place-content-center mx-auto">{value.type}</div>
          )}
          {"dateOfCreation" === val[0] && (
            <div className=" place-content-center mx-auto overflow-hidden">
              {format(new Date(value.dateOfCreation), "dd/MM/yyyy")}
            </div>
          )}
          {"dateOfUpdate" === val[0] && (
            <div className=" place-content-center mx-auto overflow-hidden">
              {format(new Date(value.dateOfUpdate), "dd/MM/yyyy")}
            </div>
          )}
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
              baseUrl={baseUrl}
              groupeForEventSelect={[]}
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default UniversalDataComponent;

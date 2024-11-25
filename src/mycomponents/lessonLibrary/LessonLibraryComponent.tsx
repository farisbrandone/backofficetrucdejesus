import { useEffect, useState } from "react";

import {
  LessonLibraryDataType,
  requestToChangeStatus,
  requestTogetAllLessonLibraryData,
} from "@/fakeData";

import { DropdownMenuForGroupe } from "../ui/DropdownMenuBackoffice";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import LoadingTotal from "../ui/LoadingTotal";
import { Switch } from "@/components/ui/switch";

export interface LessonLibraryDataComponentType {
  value: LessonLibraryDataType;
  index: number;
  setLessonLibraryData: React.Dispatch<
    React.SetStateAction<LessonLibraryDataType[] | undefined>
  >;
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
}

function LessonLibraryComponent({
  value,
  /*  index, */
  setLessonLibraryData,
  setLoadingFail,
}: LessonLibraryDataComponentType) {
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
        "LessonLibraryData"
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
    const getAllLessonLibraryData = async () => {
      try {
        const data = await requestTogetAllLessonLibraryData();
        setLessonLibraryData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllLessonLibraryData();
  }, []);

  return (
    <div className="w-full grid grid-cols-7  mb-2">
      <div className="place-content-center mx-auto ">
        {value.titleLessonLibrary}
      </div>
      <div className="place-content-center mx-auto">
        <img
          src={value.imageLessonLibrary}
          alt=""
          className="object-cover w-[30px] h-[30px] rounded-full "
        />
      </div>
      <div className="place-content-center mx-auto text-[#e91e63] ">
        {value.typeLessonLibrary}
      </div>
      <div className=" place-content-center mx-auto">
        {format(new Date(value.date), "dd/MM/yyyy")}
      </div>

      <div className=" place-content-center mx-auto ">
        {value.textButtonLessonLibrary}
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
          baseUrl="GERER LES LEÇONS/update-lesson-page"
          groupeForEventSelect={[]}
        />
      </div>
    </div>
  );
}

export default LessonLibraryComponent;

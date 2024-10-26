import { requestTogetAllGroupeData } from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export interface stateGroupeEvent {
  groupeId: string;
  titleGroupe: string;
  checked: boolean;
}
function UseselectGroupeInEvent() {
  const [groupeForEventSelect, setGroupeForEventSelect] = useState<
    stateGroupeEvent[]
  >([]);
  const [loadinggroupeForEvent, setLoadingGroupeForEvent] = useState(false);
  const [totalgroupeForEvent, setTotalGroupeForEvent] = useState<
    stateGroupeEvent[]
  >([]);

  const handleSelectGroupeEvent = (groupeId: string, titleGroupe: string) => {
    console.log({ groupeId, titleGroupe });
    const result = groupeForEventSelect.find((value) => {
      return value.groupeId === groupeId;
    });
    console.log({ result });
    if (result) {
      const newResult = groupeForEventSelect.filter(
        (value) => value.groupeId !== groupeId
      );
      setGroupeForEventSelect([...newResult]);
      return;
    }
    setGroupeForEventSelect((prev) => [
      ...prev,
      { groupeId, titleGroupe, checked: true },
    ]);
  };

  useEffect(() => {
    const getGroupeData = async () => {
      try {
        setLoadingGroupeForEvent(true);
        const result = await requestTogetAllGroupeData();
        console.log({ monrésultat: result });
        const resultClean = result.map((value) => {
          return {
            groupeId: value.id,
            titleGroupe: value.titleGroupe,
            checked: false,
          };
        });
        console.log({ resultClean });
        setTotalGroupeForEvent([...resultClean]);
        setLoadingGroupeForEvent(false);
      } catch (error) {
        setLoadingGroupeForEvent(false);
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Une erreur est survenue pendant la récupération des données",
        });
      }
    };
    getGroupeData();
  }, []);

  return {
    groupeForEventSelect,
    setGroupeForEventSelect,
    loadinggroupeForEvent,
    totalgroupeForEvent,
    handleSelectGroupeEvent,
  };
}

export default UseselectGroupeInEvent;

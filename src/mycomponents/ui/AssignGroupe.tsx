import {
  EventDataType,
  GroupeDataType,
  requestTogetAllUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { ChangeEvent, useEffect, useState } from "react";
import { CommunityDataType } from "../communautePage/CommunityDetails";
import { toast } from "@/hooks/use-toast";

export default function AssignGroupe({
  setPageForAssignGroupe,
  eventData,
  eventId,
  communityId,
}: {
  eventData: EventDataType[];
  setPageForAssignGroupe: (val: boolean) => void;
  eventId: string;
  communityId: string;
}) {
  const [groupeAssign, setGroupeAssign] = useState<GroupeDataType[]>([]);
  const [totalGroupe, setTotalGroupe] = useState<GroupeDataType[]>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [starting, setStarting] = useState(false);
  /* const navigate = useNavigate(); */
  console.log(communityId && "chouca chouca");
  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const myGroupe = totalGroupe?.find((value) => value.id === e.target.value);
    const otherGroupe = groupeAssign.find(
      (value) => value.id === e.target.value
    );
    if (myGroupe && !otherGroupe) {
      setGroupeAssign((prev) => {
        return [...prev, myGroupe];
      });
    }
    if (myGroupe && otherGroupe) {
      const result = groupeAssign.filter(
        (value) => value.id !== e.target.value
      );
      setGroupeAssign([...result]);
    }
  };

  const submitAssignGroupe = async () => {
    try {
      setStarting(true);
      const data = eventData.find((value) => value.id === eventId);
      const res: EventDataType = {
        ...(data as EventDataType),
        groupeForEventSelect: groupeAssign.map((value) => ({
          groupeId: value.id as string,
          checked: true,
          titleGroupe: value.titleGroupe,
        })),
      };
      const result = await requestToUpdateUniversalDataWithId<EventDataType>(
        eventId,
        "EventData",
        res
      );
      toast({
        title: "Success",
        description: result.message,
      });
      setStarting(false);
      window.location.reload(/* `/EVENEMENTS/${eventData[0].communityId}` */);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue, vérifier votre connexion",
      });
      setStarting(false);
    }
  };

  useEffect(() => {
    const getAllMembreData = async () => {
      try {
        const data = await requestTogetAllUniversalData<GroupeDataType>(
          "GroupeData"
        );

        const tab = eventData[0].groupeForEventSelect.map(
          (value) => value.groupeId
        );
        const trueResult = data.filter(
          (value) => value.communityId === eventData[0].communityId
        );
        const grouGroup = trueResult.filter((value) =>
          tab.includes(value.id as string)
        );
        setGroupeAssign(grouGroup);
        setTotalGroupe([...trueResult]);
      } catch (error) {
        setLoadingFail(true);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue, vérifier votre connexion",
        });
        setPageForAssignGroupe(false);
      }
    };
    getAllMembreData();
  }, []);

  if (!totalGroupe && !loadingFail) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#191919]/30 flex items-center justify-center z-10">
        Le document est en cours de chargement ...
      </div>
    );
  }

  if (loadingFail) {
    return (
      <div className="w-full text-center pt-4">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  const findData = (
    value: GroupeDataType[],
    searchValue: GroupeDataType
  ): boolean => {
    const result = value.find((val) => val.id === searchValue.id);
    if (result) {
      return true;
    }
    return false;
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#191919]/30 flex items-center justify-center z-10">
      <div className="w-[500px] h-[500px] overflow-y-auto bg-white rounded-xl p-0 ">
        <div className="flex items-center justify-between w-full p-3 bg-[#e91e63] rounded-t-xl mb-3 ">
          <p className=" text-white font-bold ">ASSIGN GROUPE</p>
          <button
            title="Fermer"
            type="button"
            onClick={() => {
              setPageForAssignGroupe(false);
            }}
          >
            <span className="icon-[ooui--close]"></span>
          </button>
        </div>

        {totalGroupe?.map((value) => (
          <div className="flex items-center gap-2 ml-3" key={value.id}>
            <input
              type="checkbox"
              id={value.id}
              value={value.id}
              onChange={handleCheckbox}
              checked={findData(groupeAssign, value)}
              disabled={starting}
            />
            <label htmlFor={value.id}> {value.titleGroupe} </label>
          </div>
        ))}
        {starting && <div>Patienter l'action est en cours d'éxécution...</div>}
        <button
          className="px-2 py-1.5 bg-[#191919] text-white hover:bg-[#e91e63] flex items-center gap-1 ml-3 rounded-md mt-10 "
          onClick={submitAssignGroupe}
          disabled={starting}
        >
          <span className="icon-[fa-solid--save]"></span> <p>Enregistrer</p>{" "}
        </button>
      </div>
    </div>
  );
}

export function AssignGroupeForMember({
  setPageForAssignGroupeForMember,
}: {
  setPageForAssignGroupeForMember: (val: boolean) => void;
}) {
  const [groupeAssign, setGroupeAssign] = useState<GroupeDataType[]>([]);
  const [totalGroupe, setTotalGroupe] = useState<GroupeDataType[]>();
  const [loadingFail, setLoadingFail] = useState(false);

  const handleCheckbox = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const myGroupe = totalGroupe?.find((value) => value.id === e.target.value);
    const otherGroupe = groupeAssign.find(
      (value) => value.id === e.target.value
    );
    if (myGroupe && !otherGroupe) {
      setGroupeAssign((prev) => {
        return [...prev, myGroupe];
      });
    }
    if (myGroupe && otherGroupe) {
      const result = groupeAssign.filter(
        (value) => value.id !== e.target.value
      );
      setGroupeAssign([...result]);
    }
  };

  useEffect(() => {
    const getAllMembreData = async () => {
      try {
        const data = await requestTogetAllUniversalData<GroupeDataType>(
          "GroupeData"
        );
        setTotalGroupe([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllMembreData();
  }, []);

  if (!totalGroupe && !loadingFail) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#191919]/30 flex items-center justify-center z-10">
        Le document est en cours de chargement ...
      </div>
    );
  }

  if (loadingFail) {
    return (
      <div className="w-full text-center pt-4">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  const findData = (
    value: GroupeDataType[],
    searchValue: GroupeDataType
  ): boolean => {
    const result = value.find((val) => val.id === searchValue.id);
    if (result) {
      return true;
    }
    return false;
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#191919]/30 flex items-center justify-center z-10">
      <div className="w-[500px] h-[500px] overflow-y-auto bg-white rounded-xl p-0 ">
        <div className="flex items-center justify-between w-full p-3 bg-[#e91e63] rounded-t-xl mb-3 ">
          <p className=" text-white font-bold ">ASSIGN GROUPE</p>
          <button
            title="Fermer"
            type="button"
            onClick={() => {
              setPageForAssignGroupeForMember(false);
            }}
          >
            <span className="icon-[ooui--close]"></span>
          </button>
        </div>

        {totalGroupe?.map((value) => (
          <div className="flex items-center gap-2 ml-3" key={value.id}>
            <input
              type="checkbox"
              id={value.id}
              value={value.id}
              onChange={handleCheckbox}
              checked={findData(groupeAssign, value)}
            />
            <label htmlFor={value.id}> {value.titleGroupe} </label>
          </div>
        ))}
        <button className="px-2 py-1.5 bg-[#191919] text-white hover:bg-[#e91e63] flex items-center gap-1 ml-3 rounded-md mt-10 ">
          <span className="icon-[fa-solid--save]"></span> <p>Enregistrer</p>{" "}
        </button>
      </div>
    </div>
  );
}

export function AssignCommunity({
  setPageForAssignCommunity,
}: {
  setPageForAssignCommunity: (val: boolean) => void;
}) {
  const [groupeAssign, setCommunityAssign] = useState<CommunityDataType[]>([]);
  const [totalCommunity, setTotalCommunity] = useState<CommunityDataType[]>();
  const [loadingFail, setLoadingFail] = useState(false);
  console.log(setTotalCommunity, setLoadingFail);
  const handleCheckbox = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const myCommunity = totalCommunity?.find(
      (value) => value.id === e.target.value
    );
    const otherCommunity = groupeAssign.find(
      (value) => value.id === e.target.value
    );
    if (myCommunity && !otherCommunity) {
      setCommunityAssign((prev) => {
        return [...prev, myCommunity];
      });
    }
    if (myCommunity && otherCommunity) {
      const result = groupeAssign.filter(
        (value) => value.id !== e.target.value
      );
      setCommunityAssign([...result]);
    }
  };

  useEffect(() => {
    const getAllMembreData = async () => {
      /*  try {
        const data = await requestTogetAllCommunityData();
        setTotalCommunity([...data]);
      } catch (error) {
        setLoadingFail(true);
      } */
    };
    getAllMembreData();
  }, []);

  if (!totalCommunity && !loadingFail) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#191919]/30 flex items-center justify-center z-10">
        Le document est en cours de chargement ...
      </div>
    );
  }

  if (loadingFail) {
    return (
      <div className="w-full text-center pt-4">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  const findData = (
    value: CommunityDataType[],
    searchValue: CommunityDataType
  ): boolean => {
    const result = value.find((val) => val.id === searchValue.id);
    if (result) {
      return true;
    }
    return false;
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#191919]/30 flex items-center justify-center z-10">
      <div className="w-[500px] h-[500px] overflow-y-auto bg-white rounded-xl p-0 ">
        <div className="flex items-center justify-between w-full p-3 bg-[#e91e63] rounded-t-xl mb-3 ">
          <p className=" text-white font-bold ">ASSIGN GROUPE</p>
          <button
            title="Fermer"
            type="button"
            onClick={() => {
              setPageForAssignCommunity(false);
            }}
          >
            <span className="icon-[ooui--close]"></span>
          </button>
        </div>

        {totalCommunity?.map((value) => (
          <div className="flex items-center gap-2 ml-3" key={value.id}>
            <input
              type="checkbox"
              id={value.id}
              value={value.id}
              onChange={handleCheckbox}
              checked={findData(groupeAssign, value)}
            />
            <label htmlFor={value.id}> {/* {value.titleCommunity} */} </label>
          </div>
        ))}
        <button className="px-2 py-1.5 bg-[#191919] text-white hover:bg-[#e91e63] flex items-center gap-1 ml-3 rounded-md mt-10 ">
          <span className="icon-[fa-solid--save]"></span> <p>Enregistrer</p>{" "}
        </button>
      </div>
    </div>
  );
}

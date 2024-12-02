import { Switch } from "@/components/ui/switch";
import {
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import LoadingTotal from "@/mycomponents/ui/LoadingTotal";

export type GroupeSettingForGroupeData = {
  Leaderboard: string;
  Member: string;
  Channels: string;
  VideoPost: string;
  Events: string;
  AudioPost: string;
  QuotaLimitation: string;
  Chatwithmembers: string;
  ClosedGroup: string;
  groupeId: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
};

export default function GroupeSettingForGroupe({
  groupeId,
  setHiddenForAll,
  setOpenGroupeSettingForGroupe,
}: {
  groupeId: string;
  setHiddenForAll: (x: boolean) => void;
  setOpenGroupeSettingForGroupe: (x: boolean) => void;
}) {
  const [manualPaymentStatus, setApprovePostsStatus] = useState("desactivate");
  const [Leaderboard, setLeaderboard] = useState("desactivate");
  const [Member, setMember] = useState("desactivate");
  const [Channels, setChannels] = useState("desactivate");
  const [VideoPost, setVideoPost] = useState("desactivate");
  const [Events, setEvents] = useState("desactivate");
  const [AudioPost, setAudioPost] = useState("desactivate");
  const [QuotaLimitation, setQuotaLimitation] = useState("desactivate");
  const [Chatwithmembers, setChatwithmembers] = useState("desactivate");
  const [ClosedGroup, setClosedGroup] = useState("desactivate");

  const [alreadyExist, setAlreadyExist] =
    useState<GroupeSettingForGroupeData>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [startSending, setStartSending] = useState(false);

  const handleAudioPost = () => {
    if (AudioPost === "activate") {
      setAudioPost("desactivate");
      return;
    }
    setAudioPost("activate");
  };

  const handleQuotaLimitation = () => {
    if (QuotaLimitation === "activate") {
      setQuotaLimitation("desactivate");
      return;
    }
    setQuotaLimitation("activate");
  };

  const handleChatwithmembers = () => {
    if (Chatwithmembers === "activate") {
      setChatwithmembers("desactivate");
      return;
    }
    setChatwithmembers("activate");
  };

  const handleClosedGroup = () => {
    if (ClosedGroup === "activate") {
      setClosedGroup("desactivate");
      return;
    }
    setClosedGroup("activate");
  };

  const handleApprovePostsStatus = () => {
    if (manualPaymentStatus === "activate") {
      setApprovePostsStatus("desactivate");
      return;
    }
    setApprovePostsStatus("activate");
  };

  const handleLeaderboard = () => {
    if (Leaderboard === "activate") {
      setLeaderboard("desactivate");
      return;
    }
    setLeaderboard("activate");
  };

  const handleMember = () => {
    if (Member === "activate") {
      setMember("desactivate");
      return;
    }
    setMember("activate");
  };

  const handleChannels = () => {
    if (Channels === "activate") {
      setChannels("desactivate");
      return;
    }
    setChannels("activate");
  };

  const handleVideoPost = () => {
    if (VideoPost === "activate") {
      setVideoPost("desactivate");
      return;
    }
    setVideoPost("activate");
  };

  const handleEvents = () => {
    if (Events === "activate") {
      setEvents("desactivate");
      return;
    }
    setEvents("activate");
  };

  const saveOtherSetting = async () => {
    const data = {
      Leaderboard,
      Member,
      Channels,
      VideoPost,
      Events,
      AudioPost,
      QuotaLimitation,
      Chatwithmembers,
      ClosedGroup,
      groupeId,
    };
    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<GroupeSettingForGroupeData>(
            alreadyExist.id as string,
            "GroupeSettingForGroupeData",
            data
          );

        if (result.success) {
          toast({
            title: "Success",
            description: " success",
          });
          setStartSending(() => false);
          return;
        } else {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "Une erreur est survenue cotée serveur",
          });
          setStartSending(() => false);
          return;
        }
      } catch (error) {}
    }
    const resultAll =
      await requestToSetUniversalData<GroupeSettingForGroupeData>(
        "GroupeSettingForGroupeData",
        data
      );
    if (resultAll.success) {
      toast({
        title: "Success",
        description: " success",
      });
      setStartSending(() => false);
      return;
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue cotée serveur",
      });
      setStartSending(() => false);
      return;
    }
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoadingData(true);
        const result = (
          await requestTogetAllUniversalData<GroupeSettingForGroupeData>(
            "GroupeSettingForGroupeData"
          )
        ).filter((value) => value.groupeId === groupeId);
        setLoadingData(false);
        if (result.length > 0) {
          setAlreadyExist({ ...result[0] });
          setClosedGroup(result[0].ClosedGroup);
          setChannels(result[0].Channels);
          setMember(result[0].Member);
          setQuotaLimitation(result[0].QuotaLimitation);
          setAudioPost(result[0].AudioPost);
          setChatwithmembers(result[0].Chatwithmembers);
          setVideoPost(result[0].VideoPost);
          setLeaderboard(result[0].Leaderboard);
          setEvents(result[0].Events);
          return;
        }
      } catch (error) {
        setLoadingFail(false);
      }
    };
    getAllData();
  }, []);

  const classSimilar =
    "flex flex-col gap-4 text-[#344767] border-[1px] border-solid border-[#e91e63] p-5 text-[16px] max-w-[550px] rounded-lg  flex-shrink-0";

  if (loadingData) {
    return (
      <div className="fixed  bg-[#000]/50 flex flex-col items-center justify-center top-0 right-0 bottom-0 left-0 z-10">
        Loading...
      </div>
    );
  }

  if (loadingFail) {
    return (
      <div className="fixed  bg-[#000]/50 flex flex-col items-center justify-center top-0 right-0 bottom-0 left-0 z-10">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <div className="fixed  bg-[#000]/50 flex flex-col items-center top-0 right-0 bottom-0 left-0 z-10 ">
      <div className="w-[1200px] h-[700px]  flex flex-col items-center p-0 bg-white mt-[50px] rounded-lg   ">
        <div className=" w-full p-2 bg-[#e91e63] text-white flex justify-between items-center rounded-t-lg">
          <p className="font-bold text-[20px] "> Group Settings</p>
          <button
            title="Fermer"
            type="button"
            onClick={() => {
              setHiddenForAll(true);
              setOpenGroupeSettingForGroupe(false);
            }}
          >
            <span className="icon-[ooui--close]"></span>
          </button>
        </div>
        <div className="  h-[800px] pl-10  flex  flex-wrap gap-5 mt-5  overflow-y-auto mx-auto  ">
          <div className={classSimilar}>
            <div className="flex justify-between px-2">
              <p className="text-[20px] ">Approve Posts</p>
              <Switch onChange={handleApprovePostsStatus} />
            </div>
            <p>
              When you enable this section. Members post will be in pending
              status till they get approved by admin.
            </p>
          </div>

          <div className={classSimilar}>
            <div className="flex justify-between px-2">
              <p className="text-[20px] ">Leaderboard</p>
              <Switch onChange={handleLeaderboard} />
            </div>
            <p>
              When you enable this section. Members,Leaderboard,Events and
              Channels will display in the Group.
            </p>
          </div>

          <div className={classSimilar}>
            <div className="flex justify-between px-2">
              <p className="text-[20px] ">Member</p>
              <Switch onChange={handleMember} />
            </div>

            <div className="flex justify-between px-2">
              <p className="text-[20px] ">Channels</p>
              <Switch onChange={handleChannels} />
            </div>
            <div className="flex justify-between px-2">
              <p className="text-[20px] ">Events</p>
              <Switch onChange={handleEvents} />
            </div>

            <p>
              When you enable this section. Members,Events and Channels will not
              display in the Group.
            </p>
          </div>

          <div className={classSimilar}>
            <div className="flex justify-between px-2">
              <p className="text-[20px] ">Video Post</p>
              <Switch onChange={handleVideoPost} />
            </div>
            <p>
              When you enable this section. Video Post option will not display
              in the Group Feed.
            </p>
          </div>

          <div className={classSimilar}>
            <div className="flex justify-between px-2">
              <p className="text-[20px] ">Audio Post</p>
              <Switch onChange={handleAudioPost} />
            </div>
            <p>
              When you enable this section. Audio Post option will not display
              in the Group Feed.
            </p>
          </div>
          <div className={classSimilar}>
            <div className="flex justify-between px-2">
              <p className="text-[20px] ">Quota Limitation</p>
              <Switch onChange={handleQuotaLimitation} />
            </div>
            <p>
              When you enable this section. Members will be limited to the
              number you provide to join the group.
            </p>
          </div>
          <div className={classSimilar}>
            <div className="flex justify-between px-2">
              <p className="text-[20px] ">Chat with members</p>
              <Switch onChange={handleChatwithmembers} />
            </div>
            <p>
              When you enable this section. Chat with members option will not
              display in the Group.
            </p>
          </div>

          <div className={classSimilar}>
            <div className="flex justify-between px-2">
              <p className="text-[20px] ">Closed Group</p>
              <Switch onChange={handleClosedGroup} />
            </div>
            <p>
              When you enable this section. The E-mail ids which are uploaded
              below will be able to join the group.
            </p>
            <p className="text-[20px]  ">
              <strong>Upload Members ( csv file )</strong>
            </p>
            <input type="file" placeholder="Choisir un fichier" />
            <button
              title="download"
              type="button"
              className="bg-[#191919] text-white  hover:bg-[#e91e63] px-2 py-1.5 rounded-sm  flex items-center w-[200px] "
            >
              {" "}
              <span className="icon-[ls--download] mr-2"></span>{" "}
              <p className="text-[12px] font-bold ">DOWNLOAD SIMPLE CSV</p>
            </button>
          </div>
        </div>
        <div className="w-full flex items-start pl-5 mt-4 mb-5 ">
          <button
            type="button"
            title="Enregistrer"
            className=" flex items-center justify-center bg-[#191919] text-white rounded-md h-[30px] p-5 text-[18px] "
            onClick={saveOtherSetting}
            disabled={startSending}
          >
            <span> Enregistrer</span> {startSending && <LoadingTotal />}
          </button>
        </div>
      </div>
    </div>
  );
}

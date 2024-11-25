import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  CreateBadgeData,
  GroupeDataType,
  requestToDeleteUniversalDataWithId,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { PlusIcon } from "@/mycomponents/clientGererPage/ClientGerer";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebaseConfig";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import LoadingTotal from "@/mycomponents/ui/LoadingTotal";
import { TabsContent } from "@/components/ui/tabs";
import clsx from "clsx";
/* const CreateBadgeData= {
    nomBadge: string;
    imageBadge: string;
    groupeData: GroupeDataType;
    dateOfCreation?: string;
    dateOfUpdate?: string;
    savedState: boolean;
    id?: string;
  } */

function CreateBadge({
  groupeData,
}: {
  groupeData: GroupeDataType | undefined;
}) {
  const [addState, setAddState] = useState<CreateBadgeData[]>([]);
  const [progress2, setProgress2] = useState(0);
  const [stateDownloadPropse, setStateDownloadPropse] = useState(false);
  const [startSending, setStarSending] = useState(false);
  const [classNomBadge, setClassNomBadge] = useState(false);
  const [classPointNecessaire, setClassPointNecessaire] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const initialCreateFieldData = {
    nomBadge: "",
    imageBadge: "",
    groupeData: groupeData as GroupeDataType,
    savedState: false,
    pointNecessaire: 0,
  };
  const addFieldCreateData = () => {
    setAddState((prev) => [...prev, { ...initialCreateFieldData }]);
  };

  const handleNomBadge = (
    e: ChangeEvent<HTMLInputElement>,
    indexRef: number
  ) => {
    setClassNomBadge(false);
    setAddState((prev) => {
      const choice: CreateBadgeData[] = prev.map((value, index) => {
        if (indexRef === index) {
          return {
            ...value,
            nomBadge: e.target.value,
          };
        } else {
          return value;
        }
      });
      return [...choice];
    });
  };

  const handlePointNecessaire = (
    e: ChangeEvent<HTMLInputElement>,
    indexRef: number
  ) => {
    setClassPointNecessaire(false);
    setAddState((prev) => {
      const choice: CreateBadgeData[] = prev.map((value, index) => {
        if (indexRef === index) {
          return {
            ...value,
            pointNecessaire: parseInt(e.target.value),
          };
        } else {
          return value;
        }
      });

      return [...choice];
    });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>, indexRef: number) => {
    setAddState((prev) => {
      const choice: CreateBadgeData[] = prev.map((value, index) => {
        if (indexRef === index) {
          return {
            ...value,
            imageBadge: e.target.value,
          };
        } else {
          return value;
        }
      });
      return [...choice];
    });
  };

  const handleImageFile = (
    e: ChangeEvent<HTMLInputElement>,
    indexRef: number
  ) => {
    e.preventDefault();

    if (!e?.target.files) return;
    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setStateDownloadPropse(true);
        console.log("sonko");
        const progression = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress2(progression);
      },
      (error) => {
        /*  setErrorDownload("une erreur est survenue pendant le chargement"); */
        setStateDownloadPropse(false);
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "une erreur est survenue pendant le chargement " + error.message,
        });
        console.error(error);
      },
      () => {
        // Get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAddState((prev) => {
            const choice: CreateBadgeData[] = prev.map((value, index) => {
              if (indexRef === index) {
                return {
                  ...value,
                  imageBadge: downloadURL,
                };
              } else {
                return value;
              }
            });
            return [...choice];
          });
          setStateDownloadPropse(false);
          /*  setSuccessDownload("le telechargement s'est fait avec success"); */
          toast({
            title: "Success",
            description: "le telechargement s'est fait avec success",
          });
        });
      }
    );
  };

  const deleteBadge = async (indexRef: number, value: CreateBadgeData) => {
    try {
      setLoadingDelete(true);

      if (value.savedState) {
        const result = await requestToDeleteUniversalDataWithId(
          value.id as string,
          "CreateBadgeData"
        );
        if (result.success) {
          toast({
            title: "Success",
            description: "la suppression s'est fait avec success",
          });
          setAddState((prev) => {
            const dat = prev.filter((_, index) => indexRef !== index);
            return [...dat];
          });
          setLoadingDelete(false);
        } else {
          setLoadingDelete(false);
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "une erreur est survenue pendant le chargement ",
          });
        }
        return;
      }
      if (!value?.savedState) {
        setAddState((prev) => {
          const dat = prev.filter((_, index) => indexRef !== index);
          return [...dat];
        });
        setLoadingDelete(false);
        return;
      }
    } catch (error) {
      setLoadingDelete(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "une erreur est survenue pendant le chargement ",
      });
    }
  };

  const saveBadgeData = async (val: CreateBadgeData) => {
    setStarSending(true);

    if (!val.nomBadge) {
      setClassNomBadge(true);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "tous les champs n'ont pas été remplis ",
      });
      setStarSending(false);
      return;
    }
    if (!val.pointNecessaire) {
      setClassPointNecessaire(true);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "tous les champs n'ont pas été remplis ",
      });
      setStarSending(false);
      return;
    }
    if (!!val.id) {
      val.savedState = true;
      const result = await requestToUpdateUniversalDataWithId<CreateBadgeData>(
        val.id,
        "CreateBadgeData",
        val
      );
      if (result.success) {
        toast({
          title: "Success",
          description: "l'enregistrement s'est fait avec success",
        });
        setStarSending(false);
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "une erreur est survenue pendant l'enregistrement ",
        });
        setStarSending(false);
        return;
      }
    }
    if (!val.id) {
      val.savedState = true;
      const result = await requestToSetUniversalData<CreateBadgeData>(
        "CreateBadgeData",
        val
      );
      if (result.success) {
        toast({
          title: "Success",
          description: "l'enregistrement s'est fait avec success",
        });
        setStarSending(false);
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "une erreur est survenue pendant l'enregistrement ",
        });
        setStarSending(false);
        return;
      }
    }
    try {
    } catch (error) {}
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        const result = await requestTogetAllUniversalData<CreateBadgeData>(
          "CreateBadgeData"
        );

        if (result.length > 0) {
          setAddState([...result]);
        }
      } catch (error) {}
    };
    getAllData();
  }, []);

  return (
    <TabsContent value="creation de badge">
      <Card>
        <CardHeader></CardHeader>

        <CardContent className="flex flex-col gap-4  ">
          {addState.length > 0 &&
            addState.map((value, index) => (
              <div key={index} className="grid grid-cols-3 items-center gap-6 ">
                <div className="flex flex-col gap-2 max-w-[180px] h-[80px] ">
                  <label htmlFor="nomBadge">
                    Nom du Badge<span className="text-[#e91e63] ">*</span>{" "}
                  </label>
                  <input
                    id="nomBadge"
                    value={value.nomBadge}
                    onChange={(e) => {
                      handleNomBadge(e, index);
                    }}
                    disabled={startSending}
                    className={clsx(
                      "border-[1px] border-solid border-[#000]/10 h-[30px] bg-white ",

                      {
                        " border-red-600  ": classNomBadge,
                      }
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 max-w-[180px] h-[80px] ">
                  <label htmlFor="pointNecessaire">
                    Point à atteindre <span className="text-[#e91e63] ">*</span>{" "}
                  </label>
                  <input
                    type="number"
                    id="pointNecessaire"
                    value={value.pointNecessaire}
                    onChange={(e) => {
                      handlePointNecessaire(e, index);
                    }}
                    disabled={startSending}
                    className={clsx(
                      "border-[1px] border-solid border-[#000]/10 h-[30px] bg-white",

                      {
                        " border-red-600   ": classPointNecessaire,
                      }
                    )}
                  />
                </div>
                <div className="relative flex flex-col gap-1 h-[80px] ">
                  <label htmlFor="image">Image Badge</label>
                  <div className="flex items-center gap-0">
                    <p className=" flex items-center justify-center bg-[#fff]/40 border-[1px] border-solid border-[#000]/10 h-[30px] w-[30px] p-0 rounded-md">
                      <span className="icon-[mdi--image] text-3xl "></span>
                    </p>
                    <input
                      id="image"
                      type="text"
                      onChange={(e) => {
                        handleImage(e, index);
                      }}
                      disabled={startSending}
                      className="border-[1px] border-solid border-[#000]/10 h-[30px] bg-white "
                    />
                    <label
                      htmlFor="downloadImage"
                      className=" text-white bg-[#191919]  flex items-center justify-center h-[30px] rounded-r-md px-2 cursor-pointer "
                    >
                      {stateDownloadPropse ? (
                        <div className="flex items-center gap-1">
                          <LoadingTotal />
                          <p>{progress2} </p>
                        </div>
                      ) : (
                        "UPLOAD"
                      )}
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      id="downloadImage"
                      onChange={(e) => handleImageFile(e, index)}
                      disabled={startSending}
                    />
                    <div className="flex ml-2 gap-3">
                      {!!value.imageBadge && (
                        <img
                          src={value.imageBadge}
                          alt="Badge Image"
                          className="w-[30px] h-[30px] object-cover rounded-full "
                        />
                      )}
                      <button
                        type="button"
                        title="Supprimer"
                        onClick={() => deleteBadge(index, value)}
                        className="text-white bg-[#e91e63]  rounded-md h-[30px] flex items-center justify-center px-2"
                        disabled={startSending}
                      >
                        {!loadingDelete ? (
                          <span className="icon-[subway--delete]"></span>
                        ) : (
                          <LoadingTotal />
                        )}
                      </button>

                      <button
                        className=" flex items-center justify-center bg-[#191919] text-white rounded-md h-[30px] px-2 "
                        onClick={() => saveBadgeData(value)}
                        disabled={startSending}
                      >
                        <span> Enregistrer</span>{" "}
                        {startSending && <LoadingTotal />}
                      </button>
                    </div>
                  </div>
                  <p className="absolute top-[90px] left-2 text-[12px] -mt-2 ">
                    Maximum Size(px): 200*50 [Format PNG or JPEG]
                  </p>
                </div>
              </div>
            ))}
        </CardContent>

        <CardFooter>
          <div className="flex items-center justify-center mb-3">
            <button
              type="button"
              title="Ajouter de nouveaus Badges"
              className="flex items-center  bg-[#e91e63] hover:bg-[#e91e63]/50 text-white p-3 rounded-lg cursor-pointer "
              onClick={addFieldCreateData}
              disabled={startSending}
            >
              <span className="inline-block mr-1">{PlusIcon("15", "15")}</span>
              <p>Ajouter de nouveaux Badges</p>
            </button>
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

export default CreateBadge;

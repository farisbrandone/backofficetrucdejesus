import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
  PrivacyPolicyData,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import ComplexeDescription from "@/mycomponents/ui/ComplexeDescription";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";

function PrivacyPolicy() {
  const [title, setTitle] = useState("");
  const [privacyPolicyText, setPrivacyPolicyText] = useState("");
  const [startSending, setStartSending] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState<PrivacyPolicyData>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [classTitle, setClassTitle] = useState(false);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
    setClassTitle(false);
  };

  const sendPrivacyPolicy = async () => {
    if (!title || !privacyPolicyText) {
      if (!title) {
        setClassTitle(true);
      }

      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs obligatoire n'ont pas été rempli",
      });
      return;
    }
    const data = {
      title,

      privacyPolicyText,
    };
    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<PrivacyPolicyData>(
            alreadyExist.id as string,
            "PrivacyPolicyData",
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
    const resultAll = await requestToSetUniversalData<PrivacyPolicyData>(
      "PrivacyPolicyData",
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
        const result = await requestTogetAllUniversalData<PrivacyPolicyData>(
          "PrivacyPolicyData"
        );
        setLoadingData(false);
        if (result.length > 0) {
          setAlreadyExist({ ...result[0] });

          setTitle(result[0].title);
          setPrivacyPolicyText(result[0].privacyPolicyText);
          return;
        }
      } catch (error) {
        setLoadingFail(false);
      }
    };
    getAllData();
  }, []);

  if (loadingData) {
    return <div className="w-full text-center pt-4">Loading...</div>;
  }

  if (loadingFail) {
    return (
      <div className="w-full text-center pt-4">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <TabsContent value="privacy policy">
      <Card className="mt-5">
        <CardContent className="space-y-2 text-[16px] sm:text-[18px] flex flex-col gap-3 max-w-[1250px] ">
          <div className="flex flex-col gap-2  ">
            <Label className="">
              Titre<span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              value={title}
              onChange={handleTitle}
              className={clsx(
                "border-[1px] border-solid border-[#000]/50 h-[30px] bg-white ",

                {
                  " border-red-600  ": classTitle,
                }
              )}
            />
          </div>
          <div className="flex flex-col gap-2 items-center ">
            <ComplexeDescription
              label="Privacy Policy"
              value={privacyPolicyText}
              placeHolder="Commencer à saisir ..."
              onBlurValue={(newContent) => setPrivacyPolicyText(newContent)}
            />
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter>
          <Button disabled={startSending} onClick={sendPrivacyPolicy}>
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

export default PrivacyPolicy;

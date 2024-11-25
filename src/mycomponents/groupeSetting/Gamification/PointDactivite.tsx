import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

import {
  GroupeDataType,
  PointDactiviteData,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";

function PointDactivite({
  groupeData,
}: {
  groupeData: GroupeDataType | undefined;
}) {
  const [postScore, setPostScore] = useState(0);
  const [commentScore, setCommentScore] = useState(0);
  const [likesScore, setLikesScore] = useState(0);
  const [viralShareScore, setViralShareScore] = useState(0);
  const [startSending, setStartSending] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const handlePostScore = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (parseInt(e.target.value) > 0) {
      setPostScore(parseInt(e.target.value));
    }
  };

  const handleCommentScore = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (parseInt(e.target.value) > 0) {
      setCommentScore(parseInt(e.target.value));
    }
  };
  const handleLikesScore = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (parseInt(e.target.value) > 0) {
      setLikesScore(parseInt(e.target.value));
    }
  };
  const handleViralShareScore = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (parseInt(e.target.value) > 0) {
      setViralShareScore(parseInt(e.target.value));
    }
  };

  const sendPointDactivite = async () => {
    setStartSending(() => true);
    if (!postScore || !commentScore || !likesScore || !viralShareScore) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tout les champs ne sont pas remplis",
      });
      setStartSending(() => false);
      return;
    }

    try {
      const data = {
        postScore,
        commentScore,
        likesScore,
        viralShareScore,
        groupeData: groupeData as GroupeDataType,
      };

      const getResults = await requestTogetAllUniversalData<PointDactiviteData>(
        "PointDactiviteData"
      );
      const getResult = getResults.find(
        (value) => (value.groupeData.id = groupeData?.id as string)
      );

      if (!getResult) {
        const resultAll = await requestToSetUniversalData<PointDactiviteData>(
          "PointDactiviteData",
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
      }

      if (
        getResult &&
        (getResult.commentScore !== commentScore ||
          getResult.likesScore !== likesScore ||
          getResult.postScore !== postScore ||
          getResult.viralShareScore !== viralShareScore)
      ) {
        const result =
          await requestToUpdateUniversalDataWithId<PointDactiviteData>(
            getResult.id as string,
            "PointDactiviteData",
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
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Aucune modification n'a été effectuer",
        });
        setStartSending(() => false);
        return;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue, vérifier votre connexion",
      });
      setStartSending(() => false);
      console.error("");
    }
  };

  useEffect(() => {
    const getPointDactiviteData = async () => {
      try {
        setLoadingData(true);
        const result = await requestTogetAllUniversalData<PointDactiviteData>(
          "PointDactiviteData"
        );
        setLoadingData(false);
        if (result.length > 0) {
          const data = result.find(
            (value) => value.groupeData.id === groupeData?.id
          );
          if (data) {
            setPostScore(data.postScore);
            setCommentScore(data.commentScore);
            setLikesScore(data.likesScore);
            setViralShareScore(data.viralShareScore);
            return;
          }
        }
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getPointDactiviteData();
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
    <TabsContent value="points d'activités">
      <Card>
        <CardHeader>
          {/*  <CardTitle className="text-[14px] sm:text-[18px] text-[#e91e63]">
            Short Codes
          </CardTitle> */}
        </CardHeader>
        <CardContent className="space-y-2 text-[16px] sm:text-[18px] flex flex-col gap-3 max-w-[500px] ">
          <div className="grid grid-cols-2 items-center ">
            <p>Activité des Membres</p>
            <p>Point fournit</p>
          </div>
          <div className="grid grid-cols-2 items-center ">
            <Label>Post</Label>
            <Input value={postScore} onChange={handlePostScore} />
          </div>
          <div className="grid grid-cols-2 items-center ">
            <Label>Commentaires</Label>
            <Input value={commentScore} onChange={handleCommentScore} />
          </div>
          <div className="grid grid-cols-2 items-center ">
            <Label>Likes</Label>
            <Input value={likesScore} onChange={handleLikesScore} />
          </div>
          <div className="grid grid-cols-2 items-center ">
            <Label>Partage Viral</Label>
            <Input value={viralShareScore} onChange={handleViralShareScore} />
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter>
          <Button disabled={startSending} onClick={sendPointDactivite}>
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

export default PointDactivite;

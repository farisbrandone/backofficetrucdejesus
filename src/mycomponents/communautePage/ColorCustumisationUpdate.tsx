import { Fragment, useEffect, useState } from "react";
import { InputComponent } from "./ui/InputComponent";

import SelectComponent from "./ui/SelectComponent";
import {
  requestToGetAllUniversalDataWithId,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";

import SaveContent from "../ui/SaveContent";

import { ColorCustumisationDataType } from "./ColorCustumisation";

const arrayLabel = [
  "Body Color",
  "Font Color",
  "Button Color",
  "Page Section 1 Color",
  "Menu Font Color",
  "Custom Fonts",
  "Page Section 2 Color",
  "Menu Hover & Active Color",
  "Choose Layout",
];

const custumFontValue = [
  "Inter",
  "Poppins",
  "Open Sans",
  "Montserrat",
  "Oswald",
  "Raleway",
  "Noto Sans Ethiopic",
  "Prompt",
  "Work Sans",
  "Sora",
];
const chooseLayoutValue = ["Layout 1", "Layout 2"];

export default function ColorCustumisationUpdate({
  communityId,
  colorId,
}: {
  communityId: string;
  colorId: string;
}) {
  const [bodyColor, setBodyColor] = useState("#000");
  const [custumFonts, setCustumFonts] = useState("Sora");
  const [fontColor, setFontColor] = useState("#000");
  const [buttonColor, setButtonColor] = useState("#fff");
  const [pageSec1Color, setPageSec1Color] = useState("#fff");
  const [menuFontColor, setMenuFontColor] = useState("#000");
  const [pageSec2Color, setPageSec2Color] = useState("#fff");
  const [menuHoverAndActiveColor, setMenuHoverAndActiveColor] =
    useState("#fff700");
  const [chooseLayout, setChooseLayout] = useState("Layout 1");
  const [startSending, setStartSending] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const SaveColorCustumData = async () => {
    setStartSending(() => true);

    try {
      var data: ColorCustumisationDataType = {
        bodyColor,
        custumFonts,
        fontColor,
        buttonColor,
        pageSec1Color,
        menuFontColor,
        pageSec2Color,
        menuHoverAndActiveColor,
        chooseLayout,
        communityId,
      };

      const result =
        await requestToUpdateUniversalDataWithId<ColorCustumisationDataType>(
          colorId,
          "ColorCustumisationData",
          data
        );

      if (result.success) {
        toast({
          title: "Success",
          description: " success",
        });
        setStartSending(() => false);
        /*  navigate("/COMMUNAUTES"); */
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue cotée serveur",
        });
        setStartSending(() => false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Une erreur est survenue pendant la création du groupe, vérifier votre connexion",
      });
      setStartSending(() => false);
      console.error("");
    }
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoadingData(true);
        console.log("papou");
        const result =
          await requestToGetAllUniversalDataWithId<ColorCustumisationDataType>(
            colorId,
            "ColorCustumisationData"
          );
        setLoadingData(false);
        if (result) {
          setBodyColor(result.bodyColor);
          setButtonColor(result.buttonColor);
          setChooseLayout(result.chooseLayout);
          setCustumFonts(result.custumFonts);
          setFontColor(result.fontColor);
          setMenuFontColor(result.menuFontColor);
          setMenuHoverAndActiveColor(result.menuHoverAndActiveColor);
          setPageSec1Color(result.pageSec1Color);
          setPageSec2Color(result.pageSec2Color);
          return;
        }
      } catch (error) {
        setLoadingFail(false);
      }
    };
    getAllData();
  }, []);

  if (loadingData) {
    return (
      <div className="fixed bg-[#000]/50 flex flex-col items-center justify-center top-0 right-0 bottom-0 left-0 z-10">
        Loading...
      </div>
    );
  }

  if (loadingFail) {
    return (
      <div className="fixed bg-[#000]/50 flex flex-col items-center justify-center top-0 right-0 bottom-0 left-0 z-10">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 p-5 gap-x-5 gap-y-7">
        {arrayLabel.map((val) => (
          <Fragment key={val}>
            {val !== "Custom Fonts" && val !== "Choose Layout" ? (
              <InputComponent
                startSending={startSending}
                label={val}
                inputValue={
                  val === "Body Color"
                    ? bodyColor
                    : val === "Font Color"
                    ? fontColor
                    : val === "Button Color"
                    ? buttonColor
                    : val === "Page Section 1 Color"
                    ? pageSec1Color
                    : val === "Menu Font Color"
                    ? menuFontColor
                    : val === "Page Section 2 Color"
                    ? pageSec2Color
                    : menuHoverAndActiveColor
                }
                setInputValue={
                  val === "Body Color"
                    ? setBodyColor
                    : val === "Font Color"
                    ? setFontColor
                    : val === "Button Color"
                    ? setButtonColor
                    : val === "Page Section 1 Color"
                    ? setPageSec1Color
                    : val === "Menu Font Color"
                    ? setMenuFontColor
                    : val === "Page Section 2 Color"
                    ? setPageSec2Color
                    : setMenuHoverAndActiveColor
                }
              />
            ) : (
              <SelectComponent
                startSending={startSending}
                label={val}
                selectValue={
                  val === "Choose Layout" ? chooseLayout : custumFonts
                }
                setSelectValue={
                  val === "Choose Layout" ? setChooseLayout : setCustumFonts
                }
                arrayOptionsValue={
                  val === "Choose Layout" ? chooseLayoutValue : custumFontValue
                }
              />
            )}
          </Fragment>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-6">
        <button className="saveButton" onClick={SaveColorCustumData}>
          {" "}
          <SaveContent />
        </button>
        {/*  <button
          title="Retour"
          className="buttonRetour"
          onClick={() => navigate("/COMMUNAUTES")}
        >
          <RetourContent />
        </button> */}
      </div>
    </>
  );
}

import { Fragment, useState } from "react";
import { InputComponent } from "./ui/InputComponent";

import SelectComponent from "./ui/SelectComponent";
import { requestToSetUniversalData } from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import SaveContent from "../ui/SaveContent";

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

export interface ColorCustumisationDataType {
  bodyColor: string;
  custumFonts: string;
  fontColor: string;
  buttonColor: string;
  pageSec1Color: string;
  menuFontColor: string;
  pageSec2Color: string;
  menuHoverAndActiveColor: string;
  chooseLayout: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export default function ColorCustumisation() {
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
  const navigate = useNavigate();

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
      };
      console.log(data);
      const result =
        await requestToSetUniversalData<ColorCustumisationDataType>(
          "ColorCustumisationData",
          data
        );
      console.log(result);

      if (result.success) {
        console.log("shunga");
        toast({
          title: "Success",
          description: "Le groupe à été crée avec success",
        });
        setStartSending(() => false);
        navigate("/COMMUNAUTES");
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
        <button
          className="saveButton"
          onClick={SaveColorCustumData}
          disabled={startSending}
        >
          {" "}
          <SaveContent />
        </button>
      </div>
    </>
  );
}

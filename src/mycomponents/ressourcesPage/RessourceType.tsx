import { globalState } from "./RessourcesFormulaire";

function RessourceType({
  title,
  text,
  setFormChoice,
}: {
  title: string;
  text: string;
  setFormChoice: React.Dispatch<React.SetStateAction<globalState>>;
}) {
  const handleFormChoice = () => {
    switch (title) {
      case "Instructions":
        console.log("fff");
        setFormChoice((prev) => {
          prev.choiceState = false;
          prev.instructionState = true;
          return { ...prev };
        });
        break;

      case "Upload File":
        setFormChoice((prev) => ({
          ...prev,
          choiceState: false,
          uploadState: true,
        }));
        break;
      case "External URL":
        setFormChoice((prev) => ({
          ...prev,
          choiceState: false,
          urkState: true,
        }));
        break;

      case "Video":
        setFormChoice((prev) => ({
          ...prev,
          choiceState: false,
          videoState: true,
        }));
        break;
      case "Audio":
        setFormChoice((prev) => ({
          ...prev,
          choiceState: false,
          audioState: true,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative w-[285px] h-[185px] border-[1px] border-[#e91e63] border-solid flex flex-col items-center gap-3 rounded-xl">
      <h1 className="text-center w-full mt-3">{title}</h1>
      <p className="w-full text-center">{text}</p>
      <button
        type="button"
        className="absolute bottom-3 m-auto bg-[#191919] hover:bg-[#e91e63] p-2 transition-colors text-white flex items-center gap-1 rounded-md"
        onClick={handleFormChoice}
      >
        <span className="icon-[icon-park-outline--plus]"></span>
        <p>CHOISIR</p>
      </button>
    </div>
  );
}

export default RessourceType;

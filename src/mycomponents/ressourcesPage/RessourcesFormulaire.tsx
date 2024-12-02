import { useState } from "react";
import RessourceType from "./RessourceType";
import { Fragment } from "react/jsx-runtime";
import Formulaire from "./Formulaire";
const datatypeRessources = [
  {
    title: "Instructions",
    text: "Choose this option if you want to provide them with instructions",
  },
  {
    title: "Upload File",
    text: "Choose this option if you want to provide them with a downloadable content",
  },
  {
    title: "External URL",
    text: "Choose this option if you want to send them to an External URL",
  },
  {
    title: "Video",
    text: "Choose this option if you want to provide them with Video",
  },
  {
    title: "Audio",
    text: "Choose this option if you want to provide them with Audio",
  },
];

export type globalState = {
  choiceState: boolean;
  instructionState: boolean;
  uploadState: boolean;
  urkState: boolean;
  videoState: boolean;
  audioState: boolean;
};

export const initialState: globalState = {
  choiceState: true,
  instructionState: false,
  uploadState: false,
  urkState: false,
  videoState: false,
  audioState: false,
};

export default function RessourcesFormulaire({
  communityId,
  setOpenState,
}: {
  communityId: string;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [viewState, setViewState] = useState<globalState>(initialState);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#191919]/30 flex items-center justify-center z-10">
      <div className="w-[1000px] h-[500px] overflow-y-auto bg-white rounded-xl p-0 ">
        <div className="flex items-center justify-between w-full p-3 bg-[#e91e63] rounded-t-xl mb-3 ">
          <p className="text-white font-bold">CHOISIR LE TYPE DE RESSOURCE</p>
          <button
            title="Fermer"
            type="button"
            onClick={() => {
              setOpenState(false);
            }}
          >
            <span className="icon-[ooui--close]"></span>
          </button>
        </div>
        {!viewState.choiceState && (
          <Formulaire
            formChoice={viewState}
            setFormChoice={setViewState}
            communityId={communityId}
          />
        )}
        {viewState.choiceState && (
          <div className="flex flex-wrap gap-3 justify-center">
            {datatypeRessources.map((value) => (
              <Fragment key={value.title}>
                <RessourceType
                  title={value.title}
                  text={value.text}
                  setFormChoice={setViewState}
                />
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

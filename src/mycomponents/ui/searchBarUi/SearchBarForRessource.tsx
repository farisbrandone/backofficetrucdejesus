import {
  RessourcesDataType,
  requestToGetRessourcesDataBySearchValue,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import { ChangeEvent, FormEvent, useState } from "react";

export interface SearchBackofficeType {
  placeholder: string;
  setRessourcesData: React.Dispatch<
    React.SetStateAction<RessourcesDataType[] | undefined>
  >;
}

function SearchBarForRessource({
  placeholder,
  setRessourcesData,
}: SearchBackofficeType) {
  const [searchValue, setSearchValue] = useState("");
  const [loadingForSearchBar, setLoadingForSearchBar] = useState(false);

  const handleSearchvalue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleSubmitSearchValue = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoadingForSearchBar(() => true);
      const data = await requestToGetRessourcesDataBySearchValue(searchValue);
      setRessourcesData([...data]);
      setLoadingForSearchBar(() => false);
      toast({
        variant: "default",
        title: "Success",
        description: "Le chergement des données s'est fait avec success",
      });
    } catch (error) {
      setLoadingForSearchBar(() => false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur pendant le chargement vérifier votre connexion",
      });
    }
  };

  return (
    <form
      className="searchBar lg:w-[450px] mr-3"
      onSubmit={handleSubmitSearchValue}
    >
      {loadingForSearchBar && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
          <div className="relative w-[330px] h-[330px] flex flex-col items-center justify-center  rounded-2xl drop-shadow-xl  ">
            <p className="text-[#191919] w-full text-center font-bold text-[18px] p-2 ">
              veillez patienter, Chargement des données en cours....
            </p>

            <div className="absolute bottom-4 mx-auto flex items-center gap-2"></div>
          </div>
        </div>
      )}
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className=" outline-none block w-full p-4 ps-10 text-sm text-gray-900 border-[2px] border-gray-300 rounded-lg bg-gray-50 focus:ring-[#e91e63] focus:border-[#e91e63] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearchvalue}
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-[#e91e63] hover:bg-[#e91e62de] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBarForRessource;

import { ChangeEvent } from "react";

type SelectComponentType = {
  startSending: boolean;
  label: string;
  selectValue: string;
  setSelectValue: React.Dispatch<React.SetStateAction<string>>;
  arrayOptionsValue: string[];
};

export default function SelectComponent({
  startSending,
  label,
  selectValue,
  setSelectValue,
  arrayOptionsValue,
}: SelectComponentType) {
  const handleSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="CustumFonts">{label}</label>
      <select
        name="CustumFonts"
        id="CustumFonts"
        value={selectValue}
        onChange={handleSelectValue}
        className="inputStyle rounded-md h-42px w-full"
        disabled={startSending}
      >
        {arrayOptionsValue.map((val) => (
          <option key={val} value={val}>
            {" "}
            {val}{" "}
          </option>
        ))}
      </select>
    </div>
  );
}

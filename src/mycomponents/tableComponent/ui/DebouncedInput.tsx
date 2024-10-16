import { useEffect, useState } from "react";

interface typeDebouncedInput {
  value: any;
  onChange: any;
  className: string;
  debounce: number;
  placeholder: string;
}

function DebouncedInput({
  value: initValue,
  onChange,
  debounce = 500,
  className,
  placeholder,
}: typeDebouncedInput) {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  // *  0.5s after set value in state

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default DebouncedInput;

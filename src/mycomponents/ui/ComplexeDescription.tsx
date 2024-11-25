import { Label } from "@/components/ui/label";
import JoditEditor from "jodit-react";
import { useMemo, useRef } from "react";

export type ComplexeDescriptionProps = {
  label: string;
  value: string;
  placeHolder: string;
  onBlurValue: ((newValue: string) => void) | undefined;
};

function ComplexeDescription({
  label,
  value,
  placeHolder,
  onBlurValue,
}: ComplexeDescriptionProps) {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeHolder,
    }),
    [placeHolder]
  );

  return (
    <div className="space-y-1">
      <Label htmlFor="descriptionLessonLibrary">
        {label}
        <span className="text-[#e91e63]">*</span>
      </Label>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        // tabIndex of textarea
        onBlur={onBlurValue} // preferred to use only this option to update the content for performance reasons
        /* onChange={(newContent) => {
          
        }} */
      />
    </div>
  );
}

export default ComplexeDescription;

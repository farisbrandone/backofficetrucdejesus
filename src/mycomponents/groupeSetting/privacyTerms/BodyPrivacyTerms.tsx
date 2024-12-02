import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrivacyPolicy from "./PrivacyPolicy";
import Terms from "./Terms";

export function BodyPrivacyTerms({ communityId }: { communityId: string }) {
  const [tabPage, setTabPage] = useState("privacy policy");

  return (
    <Tabs value={tabPage} className="max-w-screen-xl ">
      <TabsList className="gap-2 pt-2 sm:h-[60px]">
        <TabsTrigger
          value="privacy policy"
          onClick={() => setTabPage("privacy policy")}
          className="text-[14px] xl:text-[18px] flex items-center "
        >
          <span className="icon-[material-symbols-light--privacy-tip] text-xl mr-1"></span>
          <span className=""> Privacy Policy</span>
        </TabsTrigger>
        <TabsTrigger
          value="terms"
          onClick={() => setTabPage("terms")}
          className="text-[14px] xl:text-[18px] flex items-center "
        >
          <span className="icon-[ic--twotone-format-list-bulleted] text-xl mr-1 "></span>
          <span className="">Terms</span>
        </TabsTrigger>
      </TabsList>
      <PrivacyPolicy communityId={communityId} />
      <Terms communityId={communityId} />
    </Tabs>
  );
}

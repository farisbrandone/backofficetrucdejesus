import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function HoverInfoButton({ text }: { text: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <span className="icon-[raphael--question] tex-xl"></span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 bg-[#191919] text-white rounded-xl ">
        <p className="text-[12px] ">{text}</p>
      </HoverCardContent>
    </HoverCard>
  );
}

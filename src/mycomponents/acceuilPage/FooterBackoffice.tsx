import { format } from "date-fns";

function FooterBackoffice() {
  return (
    <div className="footerAcceuilPage absolute bottom-2 -left-[230px] text-white">
      {format(Date.now(), "yyyy")} ©{" "}
      <strong className="text-[#fff700] ">Truc de JESUS !</strong>
    </div>
  );
}

export { FooterBackoffice };

import "./index.css";
import { MyBody } from "./mycomponents/body/MyBody";
import HeaderBackoffice from "./mycomponents/header/HeaderBackoffice";
import { Toaster } from "@/components/ui/toaster";
function App() {
  return (
    <>
      <HeaderBackoffice />
      <div className=" w-full px-2 flex items-center justify-center mt-[100px] mx-auto ">
        <MyBody />
        <Toaster />
      </div>
    </>
  );
}

export default App;

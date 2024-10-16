import useWindowDimensions from "@/hook/useHeightAndWidthScreen";

function HeaderBackoffice() {
  const windowSize = useWindowDimensions();
  console.log(windowSize);
  return (
    <div className="w-screen fixed top-0">
      <div className="relative w-full  flex items-center justify-center h-[80px] bg-white shadow-2xl p-0 headerclass mx-auto ">
        <div className="w-[40px] h-[40px] absolute top-[20px] left-6 ">
          <img
            src="https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-[#bd10e0] font-bold text-[20px]  text-center font-sans leading-[80px] align-middle m-0 p-0 sm:text-[24px] ">
          Backoffice Button{" "}
          <span className=" ">
            {windowSize.width <= 450 ? "..." : "d'application"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeaderBackoffice;

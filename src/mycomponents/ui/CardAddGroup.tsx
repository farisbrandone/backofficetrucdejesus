export interface CardAddGroupType {
  icon: JSX.Element;
  text: string;
  database: string;
}
function CardAddGroup({ icon, text }: CardAddGroupType) {
  return (
    <div className="w-[400px] h-[370px] flex flex-col items-center justify-center  shadow-2xl border-[2px] cursor-pointer rounded-xl ">
      <div className="flex justify-center item-center w-full opacity-30 text-[#e91e63] ">
        {icon}
      </div>
      <div className="flex flex-col items-center w-full mt-3 mb-4">
        <div className="text-[#e91e63] opacity-40 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 17 17"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M16 6h-4V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h4a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1"
            />
          </svg>
        </div>
        <div className="w-full text-center mt-2 text-[20px] text-[#191919] font-bold opacity-55  ">
          {text}
        </div>
      </div>
    </div>
  );
}

export default CardAddGroup;

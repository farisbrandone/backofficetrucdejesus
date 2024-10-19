interface CardGlogalDataType {
  title: string;
  icon: JSX.Element;
  inscrit: number;
}

export default function CardGlogalData({
  title,
  icon,
  inscrit,
}: CardGlogalDataType) {
  return (
    <div className="inscritCard relative flex justify-between text-[18px] px-3 rounded-xl h-[200px] ">
      <div className="w-[60px] h-[60px] rounded-lg bg-[#191919] py-4 px-2 flex items-center justify-center text-white">
        {icon}
      </div>
      <div className="flex flex-col gap-1 self-baseline translate-y-8">
        <p>Total {title}</p>
        <p className="self-end">{inscrit}</p>
      </div>
      <p className="absolute bottom-3 left-2">{title}</p>
    </div>
  );
}

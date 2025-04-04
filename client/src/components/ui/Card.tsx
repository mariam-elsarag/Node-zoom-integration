import React from "react";

interface cardType {
  data: {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
    action: () => void;
  };
}
const Card: React.FC<cardType> = ({ data }) => {
  return (
    <div
      onClick={data?.action}
      className={`${data?.className} cursor-pointer rounded-2xl p-5 h-full flex flex-col justify-baseline gap-8 `}
    >
      <span className="bg-white/37  w-12 h-12 flex_center rounded-lg ">
        {data?.icon}
      </span>
      <header className="flex flex-col gap-1">
        <h1 className="font-bold text-white text-2xl">{data?.title}</h1>
        <p>{data?.description}</p>
      </header>
    </div>
  );
};

export default Card;

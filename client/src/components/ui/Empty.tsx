import React from "react";
import { EmptyIcon } from "../../assets/Icon";

interface EmptyType {
  className?: string;
  text?: string;
}
const Empty = ({ className = "", text = "No data found" }) => {
  return (
    <section className={`${className} h-[70vh] flex_center flex-col gap-4 `}>
      <EmptyIcon />
      <h1 className="text-lg sm:text-xl font-bold text-white-80">{text}</h1>
    </section>
  );
};

export default Empty;

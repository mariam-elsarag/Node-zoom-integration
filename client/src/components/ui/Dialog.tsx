import React from "react";
import { CloseIcon } from "../../assets/Icon";

interface dialgoType {
  visibility: boolean;
  header?: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const Dialog: React.FC<dialgoType> = ({
  header,
  children,
  visibility = false,
  onClose,
}) => {
  return (
    <section
      className={`modal_container fixed inset-0 bg-[#161925b0] backdrop-blur-sm  flex-col items-center justify-center  ${
        visibility ? "flex" : "hidden"
      } `}
    >
      <div className="modal pt-4 pb-10 px-4 bg-blue-950 w-[520px] max-w-[95%] rounded-lg ">
        <header className="py-4 flex items-center justify-between gap-1">
          <h2 className="text-white text-lg font-semibold">{header}</h2>
          <span
            onClick={onClose}
            className="cursor-pointer flex justify-end ms-auto"
          >
            <CloseIcon width="20" height="21" />
          </span>
        </header>
        <div className="">{children}</div>
      </div>
    </section>
  );
};

export default Dialog;

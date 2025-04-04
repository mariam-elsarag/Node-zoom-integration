import React from "react";
import { useAuth } from "../../context/AuthContext";
import { BurgerIcon } from "../../assets/Icon";

interface navbarType {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
const Navbar: React.FC<navbarType> = ({ setToggle }) => {
  const { user } = useAuth();
  return (
    <nav className="bg-blue-900 py-4 px-8 flex items-center justify-between md:justify-end ">
      <span
        className="bg-white/30 w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer  md:hidden"
        onClick={() => {
          setToggle(true);
        }}
      >
        <BurgerIcon />
      </span>
      <div className="flex items-center  gap-2">
        <img
          src={user?.avatar}
          className="w-8 h-8 rounded-full border border-blue-50"
        />
        <strong className="text-sm text-grey-100">{user?.full_name}</strong>
      </div>
    </nav>
  );
};

export default Navbar;

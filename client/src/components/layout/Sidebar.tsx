import React, { useState } from "react";
import Logo from "../ui/Logo";
import {
  ArrowIcon,
  HomeIcon,
  LogoutIcon,
  PreviousMeetIcon,
  UpcomingMeetIcon,
} from "../../assets/Icon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";

const list = [
  {
    id: 0,
    icon: <HomeIcon />,
    title: "Home",
    path: "/home",
  },
  {
    id: 1,
    icon: <UpcomingMeetIcon />,
    title: "Upcoming",
    path: "/upcoming",
  },
  {
    id: 2,
    icon: <PreviousMeetIcon />,
    title: "Previous",
    path: "/previous",
  },
];
interface sidebarType {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<sidebarType> = ({ toggle, setToggle }) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("full_name");
    Cookies.remove("avatar");
    setToken("");
    navigate("/login");
  };
  return (
    <aside
      className={`sidebar_aside ${
        toggle ? "show auth_form_shadow" : ""
      } w-[250px]  md:w-[230px] lg:w-[250px] bg-blue-900 min-h-screen pb-5 pt-4 px-4 fixed start-0 top-0 flex flex-col`}
    >
      <section className="flex flex-col flex-1">
        <header className="flex items-center justify-between">
          <Link to="/home">
            <Logo className="!justify-start" />
          </Link>
          <span
            className="flex md:hidden cursor-pointer"
            onClick={() => {
              setToggle(false);
            }}
          >
            <ArrowIcon />
          </span>
        </header>
        <ul className="mt-10 flex flex-col gap-3.5 sidebar  ">
          {list?.map((item) => (
            <li key={item?.id}>
              <NavLink
                to={item?.path}
                className="flex rounded-lg  py-3 px-4 gap-2"
              >
                {item?.icon}
                <span>{item?.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
      <footer className="flex flex-col items-start gap-8 ">
        <button
          className="outline-0 shadow-none flex_center gap-1 cursor-pointer"
          onClick={() => {
            handleLogout();
          }}
        >
          <LogoutIcon />
          <span className="text-white">Logout</span>
        </button>
        <span className="text-sm text-blue-50">
          {" "}
          &copy; {new Date().getFullYear()} Zoom Integration
        </span>
      </footer>
    </aside>
  );
};

export default Sidebar;

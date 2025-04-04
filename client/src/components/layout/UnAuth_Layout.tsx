import React from "react";
import { Outlet } from "react-router-dom";
import { VideoIcon } from "../../assets/Icon";
import Logo from "../ui/Logo";

const UnAuth_Layout = () => {
  return (
    <main className="h-screen flex flex-col items-center justify-center overflow-y-auto">
      <section className="my-20 bg-blue-900 auth_form_shadow w-[500px] max-w-[92%] py-8 px-4 sm:px-6 rounded-lg flex flex-col gap-8">
        <Logo />
        <Outlet />
      </section>
    </main>
  );
};

export default UnAuth_Layout;

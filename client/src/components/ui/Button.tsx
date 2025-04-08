import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

interface buttonPropsType {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
  type?: "primary" | "error" | "outline" | "secondary";
  buttonType?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const Button: React.FC<buttonPropsType> = ({
  children,
  onClick,
  to,
  type = "primary",
  buttonType = "submit",
  disabled,
  loading,
  className,
  target,
}) => {
  const base = `outline-none  w-full rounded-full font-normal text-base flex items-center justify-center gap-2 h-[44px] px-4  transation-all ease-in-out duration-300 cursor-pointer`;
  const styles = {
    primary: `${base} border-blue-200 bg-blue-200 text-white hover:bg-blue-100 `,
    secondary: `${base} border-blue-800 bg-blue-800 text-white-80 hover:bg-[#333a59]  `,
    outline: `${base} border border-white/50 text-white  `,
    error: `${base} bg-red-700 text-white`,
  };
  if (to)
    return (
      <Link to={to} target={target} className={`${styles[type]} ${className}`}>
        {children}
      </Link>
    );
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      type={buttonType}
      className={`${styles[type]} ${className}`}
    >
      {children}
      {loading && (
        <Spinner
          className={`${type === "error" ? "!fill-error !w-4 !h-4" : ""}`}
        />
      )}
    </button>
  );
};

export default Button;

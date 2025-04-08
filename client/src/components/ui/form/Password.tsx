import { useState } from "react";
import { EyeOff, EyeOn } from "../../../assets/Icon";

interface passwordType {
  id?: string;
  name?: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}
const Password: React.FC<passwordType> = ({
  id,
  name,
  value,
  handleChange,
  className,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <fieldset className="grid gap-2 relative">
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        name={name || "password"}
        value={value}
        onChange={handleChange}
        className={` ${className} !pr-12`}
        placeholder={placeholder}
      />
      <span
        onClick={() => setShowPassword((pre) => !pre)}
        className={`absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer`}
        role="button"
      >
        {!showPassword ? <EyeOn /> : <EyeOff />}
      </span>
    </fieldset>
  );
};

export default Password;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance, { apiUrl } from "../../services/axiosInstance";
import Form from "../../components/ui/form/Form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { GoogleLogo } from "../../assets/Icon";

export const handleGoogleAuth = () => {
  window.location.href = `${apiUrl}/api/auth/google`;
};
const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 0,
      formType: "input",
      fieldName: "email",
      validator: {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Please enter a valid email, e.g., example@domain.com.",
        },
      },
      label: "email",
      placeholder: "email",
      type: "email",
    },
    {
      id: 1,
      formType: "password",
      fieldName: "password",
      validator: {
        required: "Password is required",
      },
      placeholder: "********",
      label: "password",
    },
  ];
  // ___________________ login ____________________

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/auth/login", data);
      if (response?.status === 200) {
        console.log(response.data);
        setToken(response.data.token);
        Cookies.set("token", response.data.token);
        Cookies.set("avatar", response.data.avatar);
        Cookies.set("full_name", response.data.full_name);
        setUser({
          full_name: response.data.full_name,
          avatar: response.data.avatar,
        });
        navigate("/home");
        toast.success("Successfully loged in");
      }
    } catch (err) {
      if (err?.response?.data?.errors?.length > 1) {
        setError("email", {
          type: "manual",
          message: "Wrong credentials",
        });
        setError("password", {
          type: "manual",
          message: "Wrong credentials",
        });
        toast.error("Wrong credentials");
      } else if (err?.response?.data?.errors?.includes("Invalid email")) {
        setError("email", {
          type: "manual",
          message: "Email is not valid",
        });
      } else {
        setError("email", {
          type: "manual",
          message: "Wrong credentials",
        });
        setError("password", {
          type: "manual",
          message: "Wrong credentials",
        });
        toast.error("Wrong credentials");
      }

      // console.log("error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="grid gap-10">
      <div className="grid gap-4">
        <Form
          formList={formList}
          control={control}
          errors={errors}
          loading={loading}
        />
      </div>
      <footer className="grid gap-4">
        <Button loading={loading}>login</Button>
        <div className="relative flex items-center gap-1">
          <span className="flex items-center  w-1/2 h-[.5px] !bg-white/15"></span>
          <span className="flex px-4 text-base text-(--color-grey-100)">
            Or
          </span>
          <span className="flex items-center  w-1/2 h-[.5px] !bg-white/15"></span>
        </div>
        <Button buttonType="button" type="outline" onClick={handleGoogleAuth}>
          <GoogleLogo />
          <span>Continue with Google</span>
        </Button>
        <span className="text-white-80 text-text-1 text-sm flex_center gap-1 text-center">
          Don't have an account?
          <Link to="/register" className="text-white-80">
            Register
          </Link>
        </span>
      </footer>
    </form>
  );
};

export default Login;

import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogo } from "../../assets/Icon";
import Form from "../../components/ui/form/Form";
import axiosInstance from "../../services/axiosInstance";
import { namePattern, passwordPattern } from "../../utils/validator";
import { useForm } from "react-hook-form";
import { handleGoogleAuth } from "./Login";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    getValues,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      gender: "",
    },
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 1,
      formType: "input",
      fieldName: "full_name",
      validator: {
        required: "Full name is required",
        pattern: {
          value: namePattern,
          message: "Please enter a valid name, e.g., John Doe.",
        },
        maxLength: {
          value: 100,
          message: "Full name should be less than 100 characters",
        },
        minLength: {
          value: 3,
          message: "Full name should be at least 3 characters long",
        },
      },
      label: "full name",
      placeholder: "Full name",
      type: "text",
      isGrouped: true,
      className: "grid grid-cols-2 gap-2",
    },
    {
      id: 2,
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
      groupWith: 1,
    },
    {
      id: 3,
      formType: "password",
      fieldName: "password",
      validator: {
        required: "Password is required",
        pattern: {
          value: passwordPattern,
          message: "Please enter a strong password",
        },
      },
      placeholder: "password",
      label: "password",
      showForgetPassword: false,
      // isGrouped: true,
      // className: "grid grid-cols-2 gap-2",
    },
    {
      id: 4,
      formType: "password",
      fieldName: "confirm_password",
      validator: {
        required: "Confirm password is required",
        validate: (value) => {
          const password = getValues("password");
          return value === password || "Passwords do not match";
        },
      },
      placeholder: "Confirm password",
      label: "Confirm password",
      showForgetPassword: false,
      // groupWith: 3,
    },
  ];
  // ___________________ submit ____________________
  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/auth/register", data);
      if (response?.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      if (err?.response?.data?.errors?.includes("Email already exists")) {
        setError("email", {
          type: "manual",
          message: "Email already exists",
        });
      } else if (
        err?.response?.data?.errors?.includes("Please enter a valid email")
      ) {
        setError("email", {
          type: "manual",
          message: "Please enter a valid email, e.g., example@domain.com.",
        });
      } else if (err?.response?.data?.errors?.includes("Weak password.")) {
        setError("password", {
          type: "manual",
          message: err?.response?.data?.errors,
        });
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="grid gap-10">
      <div className="flex flex-col gap-4">
        <Form
          formList={formList}
          control={control}
          errors={errors}
          loading={loading}
        />
      </div>
      <footer className="grid gap-4">
        <Button loading={loading} buttonType="submit">
          Create an account
        </Button>
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
          Already have an account?
          <Link to="/login" className="text-white-80">
            Login
          </Link>
        </span>
      </footer>
    </form>
  );
};

export default Register;

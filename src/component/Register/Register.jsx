import React, { useContext, useState } from "react";
import "./Register.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { authContext } from "../../context/AuthContext";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { setUserLogin } = useContext(authContext);
  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[A-z].{2,}/, "Must start upper case and min 2 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
    rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}/, "Please Enter Egyptian Phone Number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        data
      );
      setIsSuccess(true);
      setTimeout(() => {
        localStorage.setItem("userToken", response?.data?.token);
        setUserLogin(response?.data?.token);

        setIsSuccess(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      setIsSuccess(false);
      setErrorMsg(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container p-8">
      <h1 className="text-2xl text-center mb-3 font-bold underline text-main decoration-main">
        Register Form
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-sm md:max-w-4xl mx-auto"
      >
        {isSuccess && (
          <div
            className="p-4 mb-6 text-sm rounded-lg bg-green-500 text-slate-100"
            role="alert"
          >
            Registration successful! Please login.
          </div>
        )}

        {errorMsg && (
          <div
            className="p-4 mb-6 text-sm rounded-lg bg-red-500 text-slate-100"
            role="alert"
          >
            {errorMsg}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-main block w-full p-2.5 placeholder-gray-400 dark:focus:ring-main dark:focus:border-main"
            placeholder="User Name"
          />
        </div>

        {errors.name && touchedFields.name && (
          <div
            className="p-4 mb-4 text-sm rounded-lg bg-red-500 text-slate-100"
            role="alert"
          >
            {errors.name.message}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-main block w-full p-2.5 placeholder-gray-400 dark:focus:ring-main dark:focus:border-main"
            placeholder="example@gmail.com"
          />
        </div>

        {errors.email && touchedFields.email && (
          <div
            className="p-4 mb-4 text-sm rounded-lg bg-red-500 text-slate-100"
            role="alert"
          >
            {errors.email.message}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-main block w-full p-2.5 placeholder-gray-400 dark:focus:ring-main dark:focus:border-main"
          />
        </div>

        {errors.password && touchedFields.password && (
          <div
            className="p-4 mb-4 text-sm rounded-lg bg-red-500 text-slate-100"
            role="alert"
          >
            {errors.password.message}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Repeat password
          </label>
          <input
            {...register("rePassword")}
            type="password"
            id="rePassword"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-main block w-full p-2.5 placeholder-gray-400 dark:focus:ring-main dark:focus:border-main"
          />
        </div>

        {errors.rePassword && touchedFields.rePassword && (
          <div
            className="p-4 mb-4 text-sm rounded-lg bg-red-500 text-slate-100"
            role="alert"
          >
            {errors.rePassword.message}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone
          </label>
          <input
            {...register("phone")}
            type="tel"
            id="phone"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-main block w-full p-2.5 placeholder-gray-400 dark:focus:ring-main dark:focus:border-main"
          />
        </div>

        {errors.phone && touchedFields.phone && (
          <div
            className="p-4 mb-4 text-sm rounded-lg bg-red-500 text-slate-100"
            role="alert"
          >
            {errors.phone.message}
          </div>
        )}

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the
            <a
              href="#"
              className="text-green-600 hover:underline dark:text-green-500"
            >
              terms and conditions
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700  w-full lg:w-auto"
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader color="#eee" /> : "Register new account"}
        </button>
      </form>
    </div>
  );
}

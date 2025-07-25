import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { authContext } from "../../context/AuthContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { setUserLogin } = useContext(authContext);

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(SignInSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        data
      );

      if (response.data.token) {
        localStorage.setItem("userToken", response?.data?.token);
        setUserLogin(response?.data?.token);
        setIsSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorMsg(
        error.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container p-8 `}>
      <h1 className="text-2xl text-center mb-6 font-bold text-main underline">
        Login to Your Account
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`min-w-sm md:max-w-4xl  mx-auto `}
      >
        {isSuccess && (
          <div className="p-4 mb-6 text-sm rounded-lg bg-green-100 text-green-800">
            Login successful! Redirecting you to the home page...
          </div>
        )}

        {errorMsg && (
          <div className="p-4 mb-6 text-sm rounded-lg bg-red-100 text-red-800">
            {errorMsg}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="your@email.com"
            autoComplete="email"
          />
          {errors.email && touchedFields.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder=""
            autoComplete="current-password"
          />
          {errors.password && touchedFields.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700  w-full lg:w-auto"
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader color="#eee" /> : "Sign In"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <a href="/register" className="text-green-600 hover:underline">
            Register here
          </a>
        </div>
      </form>
    </div>
  );
}

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function CheckOut() {
  const { cartId, resetValues } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const CheckoutSchema = Yup.object().shape({
    details: Yup.string().required("Details is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}/, "Please Enter Egyptian Phone Number"),
    city: Yup.string().required("City is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CheckoutSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const processOrder = (data) => {
    if (!paymentType) {
      toast.error("Please select a payment method");
      return;
    }

    setIsLoading(true);
    const shippingAddress = {
      details: data.details,
      phone: data.phone,
      city: data.city,
    };

    const endpoint = paymentType === "cash"
      ? `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
      : `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`;

    const config = paymentType === "cash"
      ? { headers }
      : { 
          headers,
          params: { url: "http://localhost:5173" }
        };

    axios.post(endpoint, { shippingAddress }, config)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Order Created Successfully");
          resetValues();
          if (paymentType === "online") {
            window.open(res.data.session.url, "_self");
          }
        }
      })
      .catch((err) => {
        toast.error("Error creating order");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container p-8">
      <form onSubmit={handleSubmit(processOrder)} className="min-w-sm md:max-w-4xl mx-auto">
      <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            City
          </label>
          <input
            {...register("city")}
            type="text"
            id="city"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-main block w-full p-2.5 placeholder-gray-400 dark:focus:ring-main dark:focus:border-main"
            placeholder="Your City"
          />
          {errors.city && (
            <div
              className="p-4 mb-4 text-sm rounded-lg bg-red-500 text-slate-100"
              role="alert"
            >
              {errors.city.message}
            </div>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Address Details
          </label>
          <input
            {...register("details")}
            type="text"
            id="details"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-main block w-full p-2.5 placeholder-gray-400 dark:focus:ring-main dark:focus:border-main"
            placeholder="Street, Building, Apartment"
          />
          {errors.details && (
            <div
              className="p-4 mb-4 text-sm rounded-lg bg-red-500 text-slate-100"
              role="alert"
            >
              {errors.details.message}
            </div>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="phn"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone
          </label>
          <input
            {...register("phone")}
            type="tel"
            id="phn"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-main block w-full p-2.5 placeholder-gray-400 dark:focus:ring-main dark:focus:border-main"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <div
              className="p-4 mb-4 text-sm rounded-lg bg-red-500 text-slate-100"
              role="alert"
            >
              {errors.phone.message}
            </div>
          )}
        </div>
        
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => setPaymentType("cash")}
            className={`py-2 px-4 rounded-lg ${paymentType === "cash" ? "bg-green-600 text-white" : "bg-gray-200"}`}
            disabled={isLoading}
          >
            Cash Order
          </button>
          
          <button
            type="button"
            onClick={() => setPaymentType("online")}
            className={`py-2 px-4 rounded-lg ${paymentType === "online" ? "bg-green-600 text-white" : "bg-gray-200"}`}
            disabled={isLoading}
          >
            Online Payment
          </button>
        </div>

        {paymentType && (
          <button
            type="submit"
            className={`mt-4 w-full py-2 px-4 bg-green-600 text-white rounded-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : `Complete ${paymentType === "cash" ? "Cash" : "Online"} Order`}
          </button>
        )}
      </form>
    </div>
  );
}
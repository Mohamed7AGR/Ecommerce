import React from "react";
import "./Cart.module.css";
import Loading from "../Loading/Loading";
import useCart from "../../CustomHooks/useCart";
import { Link } from "react-router-dom";
export default function Cart() {
  const {
    handelRemoveAllCart,
    totalCartPrice,
    products,
    handelChangeCount,
    handelRemoveCart,
  } = useCart();
  if (!products) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-3">Cart Page</h1>
      
        <h2 className="text-xl text-main font-bold mb-3 ">
          ToTal Cart Price : {totalCartPrice}
        </h2>
      <div className="flex items-center justify-between mb-3">
        <Link
            to={"/checkOut"}
            className="bg-blue-500 p-3 rounded-lg hover:bg-blue-800 duration-500 text-white"
          >
            Check Out
          </Link>
        <button
          onClick={handelRemoveAllCart}
          className="font-medium bg-red-600 p-2 rounded-lg  text-white hover:bg-red-900"
        >
          Clear Cart
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b   border-gray-200 hover:bg-gray-50 "
              >
                <td className="p-4">
                  <img
                    src={product?.product?.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 ">
                  {product?.product?.title?.split(" ").slice(0, 2).join(" ")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handelChangeCount(
                          product.product._id,
                          product.count - 1
                        )
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200     "
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <input
                        type="number"
                        id="first_product"
                        value={product.count}
                        onChange={(e) =>
                          handelChangeCount(
                            product.product._id,
                            parseInt(e.target.value)
                          )
                        }
                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={1}
                        required
                      />
                    </div>
                    <button
                      onClick={() =>
                        handelChangeCount(
                          product.product._id,
                          product.count + 1
                        )
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200     "
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 ">
                  {product.price} EGp
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handelRemoveCart(product.product._id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
     
    </div>
  );
}

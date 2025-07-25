import React, { useContext } from "react";
import { cartContext } from "../context/CartContext";
import toast from "react-hot-toast";

export default function useCart() {
  let { products, totalCartPrice, updateCount, deleteCart, deleteAllCart } =
    useContext(cartContext);
  console.log(products);
  async function handelChangeCount(id, newCount) {
    const res = await updateCount(id, newCount);
    res
      ? toast.success("Product Count  Change ", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#15fb29",
            color: "#fff",
          },
        })
      : toast.error("Error to Change Count  ", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#ff0000",
            color: "#fff",
          },
        });
  }
  async function handelRemoveCart(id) {
    const res = await deleteCart(id);
    res
      ? toast.success("Product Removed From Cart  ", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#15fb29",
            color: "#fff",
          },
        })
      : toast.error("Failed to Remove Product  ", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#ff0000",
            color: "#fff",
          },
        });
  }
  async function handelRemoveAllCart() {
    const res = await deleteAllCart();
    res
      ? toast.success("Cart Clear Successful ", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#15fb29",
            color: "#fff",
          },
        })
      : toast.error("Failed to Clear Cart  ", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#ff0000",
            color: "#fff",
          },
        });
  }
  return {
    handelChangeCount,
    handelRemoveCart,
    handelRemoveAllCart,
    totalCartPrice,
    products,
  };
}

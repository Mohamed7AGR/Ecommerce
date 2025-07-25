import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { userLogin } = useContext(authContext);
  // const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, seTotalPrice] = useState(0);
  const [products, setProducts] = useState(null);
  const [cartId, setCartId] = useState(null)
  function resetValues(){
    seTotalPrice(0)
    setProducts(null)
    setCartId(null)
  }
const numOfCartItems=products?.length;
  async function addProductToCart(productId) {
    const res = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers: { token: userLogin } }
      )
      .then(function (res) {
        console.log(res.data);
        setCartId(res.data.cartId)
        getUserCart();
        return true;
      })
      .catch(function (err) {
        console.log(err);
        return false;
      });
    return res;
  }

  function getUserCart() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: userLogin },
      })
      .then(function (res) {
        // setNumOfCartItems(res.data.numOfCartItems);
        setProducts(res.data.data.products);
        seTotalPrice(res.data.data.totalCartPrice);
        setCartId(res.data.cartId)

      })
      .catch(function (err) {
        console.log(err);
      });
  }

  async function updateCount(id, newCount) {
    const res = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: newCount },
        { headers: { token: userLogin } }
      )
      .then(function (res) {
        // setNumOfCartItems(res.data.numOfCartItems);
        setProducts(res.data.data.products);
        seTotalPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch(function (err) {
        console.log(err);

        return false;
      });
    return res;
  }
  async function deleteCart(id) {
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: userLogin },
      })
      .then(function (res) {
        // setNumOfCartItems(res.data.numOfCartItems);
        setProducts(res.data.data.products);
        seTotalPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch(function (err) {
        console.log(err);
        return false;
      });
    return res;
  }
  async function deleteAllCart() {
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: userLogin },
      })
      .then(function () {
        // setNumOfCartItems(0);
        setProducts([]);
        seTotalPrice(0);
        return true;
      })
      .catch(function (err) {
        console.log(err);
        return false;
      });
    return res;
  }
  useEffect(() => {
    if (userLogin) {
      getUserCart();
    }
  }, [userLogin]);
  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getUserCart,
        numOfCartItems,
        products,
        totalCartPrice,
        updateCount,
        deleteCart,
        deleteAllCart,
        cartId,
        resetValues
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

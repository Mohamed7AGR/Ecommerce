import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { FaPlus, FaStar } from "react-icons/fa6";
import Slider from "react-slick";
import Errors from "../Errors/Errors";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { id, cid } = useParams();
  const { addProductToCart } = useContext(cartContext);
  async function handleAddToCart() {
    const response = await addProductToCart(id);
    if (response) {
      toast.success("Product added successfully to your cart", {
        duration: 3000,
        position: "top-right",style: {
          background: "#15fb29",
          color: "#fff",
        },

      });

    } else {
      toast.error("Failed to add product to cart", { duration: 3000, position: "top-right",style: {
        background: "#ff0000",
        color: "#fff",
      }, });
    }
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const getProductDetails = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  };

  const { isLoading, data, isError } = useQuery({
    queryKey: ["getProductDetails", id],
    queryFn: getProductDetails,
    staleTime: 5000 * 1000,
    retry: 0,
  });

  const productDetails = data?.data?.data;
  const getRelatedProduct = async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return data.data.filter((p) => p.category.name === cid && p._id !== id);
  };

  const { data: relatedData } = useQuery({
    queryKey: ["relatedProducts", cid, id],
    queryFn: getRelatedProduct,
    enabled: !!cid && !!id,
    staleTime: 5000 * 1000,
    retry: 0,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Errors />;
  }
  return (
    <>
      <div className="container p-10 mx-auto flex items-center justify-center w-full">
        <div className="grid grid-cols-12 gap-4 md:gap-16 lg:gap-4 place-items-center ">
          <div className="col-span-12 md:col-span-4  ">
            {productDetails.images.length > 1 ? (
              <Slider {...settings} className="w-[300px]">
                {productDetails?.images.map((src, index) => (
                  <div key={index}>
                    <img
                      src={src}
                      alt=""
                      className="md:max-w-full max-w-80 mx-auto"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <img
                src={productDetails?.imageCover}
                alt=""
                className="md:max-w-full max-w-80 mx-auto "
              />
            )}
          </div>
          <div className="col-span-12 md:col-span-8  self-center">
            <h6 className="mb-2 text-main font-bold">
              {productDetails?.title}
            </h6>
            <p className="mb-3 text-black/40 text-sm">
              {productDetails?.description}
            </p>

            <p className="mb-3 text-main font-bold">
              {productDetails?.category?.name}
            </p>
            <div className="flex justify-between mb-3">
              <span>{productDetails?.price} EGP</span>
              <span className="flex items-center">
                <FaStar className="text-yellow-400" />
                {productDetails?.ratingsAverage}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-green-500 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            >
              <FaPlus className="me-2" /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedData?.length > 0 && (
        <div className="container p-10">
          <h2 className="text-3xl text-center underline text-main font-bold mb-6">
            Related Products
          </h2>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {relatedData.map((product) => (
              <div key={product._id} className='group overflow-hidden  outline-none shadow-none hover:shadow-xl  transition duration-500 hover:shadow-green-300 hover:border hover:border-green-300 rounded-lg   p-2   ' >
              <Link key={product._id} to={`/productDetails/${product._id}/${product.category.name}`}>
             <div  className="product ">
               <img src={product.imageCover} alt={product.title} className='w-full ' />
               <span className="text-main font-bold">{product.category.name}</span>
               <div className="mt-3">
               <h1 className=" ">{product.title.split(' ').slice(0,2).join(' ')}</h1>
               <div className="flex justify-between items-center mt-2">
             <span className="">{product.price} EGY</span>
             <span className="flex items-center"><FaStar className='inline-block ms-2  text-yellow-300 '/>{product.ratingsAverage}</span>
           </div>
               </div>
   
             </div>
            </Link>
           <button onClick={handleAddToCart} className=' flex  items-center justify-center bg-main rounded-lg p-2 text-white group-hover:translate-y-0 transition-all duration-500 translate-y-32 w-full my-2 ' >
           <FaPlus className='me-2 '  /> Add 
           </button>
           </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

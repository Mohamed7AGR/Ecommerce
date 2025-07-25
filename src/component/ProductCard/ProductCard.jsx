import React, { useContext } from 'react'
import './ProductCard.module.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { FaPlus, FaStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Errors from '../Errors/Errors';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
export default function ProductCard() {
  const { addProductToCart } = useContext(cartContext);

  const getProducts = async () =>  await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  const{isLoading, data,isError}=   useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
    staleTime:5000*1000,
    retry:0
  })
  const allProduct=data?.data?.data;
  async function handelAddProduct(id){
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
  if( isLoading){return <Loading/>}
  if (isError) {
    return <Errors/>
  }
  return (
    <>
   
    <div className="container p-10">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3
      md:grid-cols-2 sm:grid-cols-1 gap-4 ">
        {
          allProduct?.map((product)=>
        <div  key={product._id}  className='group overflow-hidden  outline-none shadow-none hover:shadow-xl  transition duration-500 hover:shadow-green-300 hover:border hover:border-green-300 rounded-lg   p-2   ' >
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
        <button onClick={()=>handelAddProduct(product._id)} className=' flex  items-center justify-center bg-main rounded-lg p-2 text-white group-hover:translate-y-0 transition-all duration-500 translate-y-32 w-full my-2 ' >
        <FaPlus className='me-2 '  /> Add 
        </button>
        </div>
          )
        }
      </div>

    </div>
    

    </>
  )
}

import React from 'react'
import './Brands.module.css'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import Errors from '../Errors/Errors';
export default function Brands() {
   
  const getBrands =async()=>await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  const {isLoading,isError,data}=useQuery({
    queryKey: ['brands'],
    queryFn:getBrands,
    staleTime:5000*1000
  })
  const brands=data?.data.data;
  if(isLoading){
    return <Loading/>
  }
  if(isError){
    return <Errors/>}
  return (
    <>
       <div className="container p-10">
       <h1 className="text-main text-4xl text-center mb-4 uppercase font-bold ">All Brands
       </h1>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3
      md:grid-cols-2 sm:grid-cols-1 gap-6  ">
         
        {brands?.map((c)=>
          
        <div key={c._id} className="group overflow-hidden border  outline-none  shadow-xl  transition duration-500 hover:shadow-green-300 hover:border-green-300 rounded-lg   ">

       
          <img src={c.image} className='h-60 object-cover w-full' alt="" />
          <h1 className="text-main text-2xl text-center p-6">{c.name}</h1>

        </div>
        )}

      </div>
    </div>
   
    </>
  )
}

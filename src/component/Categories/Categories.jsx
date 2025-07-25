import React from 'react'
import './Categories.module.css'

import Loading from '../Loading/Loading';
import Errors from '../Errors/Errors';
import useCategories from "../../CustomHooks/useCategories.js";

export default function Categories() {
  const { data, isLoading, isError } = useCategories();
  const categories = data?.data?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Errors />;
  }

  return (
    <>
      <div className="container p-10">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {categories?.map((c) => (
            <div
              key={c._id}
              className="group overflow-hidden outline-none shadow-xl transition duration-500 hover:shadow-green-300 hover:border-green-300 rounded-lg"
            >
              <img src={c.image} className="h-60 object-cover w-full" alt={c.name} />
              <h1 className="text-main text-2xl text-center p-6 font-bold">{c.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


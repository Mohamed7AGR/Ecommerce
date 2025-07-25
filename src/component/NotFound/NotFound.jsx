import React from 'react'
import "./NotFound.module.css"
import error  from "../../assets/images/error.svg"
export default function NotFound() {
  return (
    <>
        <div className="flex container mx-auto justify-center items-center p-8">
          <img src={error} className='lg:w-7/12' alt="" />
        </div>
    </>
  )
}

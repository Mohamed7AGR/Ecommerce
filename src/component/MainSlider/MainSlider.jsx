import React from 'react'

import fixed1 from "../../assets/images/fixed.jpeg"
import fixed2 from "../../assets/images/fixed2.png"
import slider1 from "../../assets/images/slider1.jpeg"
import slider2 from"../../assets/images/slider2.jpeg"
import Slider from 'react-slick'

export default function MainSlider() {
  return (
    <>
      <div className="grid grid-cols-12 mb-9 mt-4">
        <div className="sm:col-span-8 col-span-12 ">
          <Slider arrows={false} dots={true} slidesToShow={1} slidesToScroll={1} autoplay={true} > 
          <img  className='h-[400px] w-full  object-cover'src={slider1} alt="" />
          <img className='h-[400px] w-full   object-cover'src={slider2} alt="" />
          </Slider>
        </div>
        <div className="sm:col-span-4 col-span-12">
          <img className='h-[200px] w-full object-cover ' src={fixed1} alt="" />
          <img className='h-[200px]  w-full object-cover ' src={fixed2} alt="" />
        </div>
      </div>
    </>
  )
}


import React from "react";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import useCategories from "../../CustomHooks/useCategories.js";

export default function CategorySlider() {

  const { data, isLoading } = useCategories()


  let settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    initialSlide: 0,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Slider {...settings}>
        {data?.data?.data?.map((c) => (
          <div key={c._id}>
            <img
              src={c.image}
              alt={c.name}
              className="h-44 object-fill w-full"
            />
            <h6 className="font-normal">{c.name}</h6>
          </div>
        ))}
      </Slider>
    </>
  );
}

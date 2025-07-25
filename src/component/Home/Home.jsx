import React from 'react'
import './Home.module.css'
import ProductCard from '../ProductCard/ProductCard'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
export default function Home() {
  return (
    <>
    <MainSlider/>
    <CategorySlider/>
      <ProductCard/>
    </>
  )
}

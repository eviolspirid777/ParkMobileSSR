"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img0 from "../../Slides/BaseSlidepng.png";
import img1 from "../../Slides/images.jpeg";
import img2 from "../../Slides/Без названия.jpeg";
import img3 from "../../Slides/kotenok-1024x640.jpg.webp";
import img4 from "../../Slides/Без названия (1).jpeg";
import img5 from "../../Slides/Без названия (3).jpeg";
import img6 from "../../Slides/Без названия (2).jpeg";

import Image from "next/image"

export const SwiperList = () => {
  const images = [img0, img1, img2, img3, img4, img5, img6];
  return (
    <>
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image src={image} alt=""/>
          </SwiperSlide>
        ))}
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};

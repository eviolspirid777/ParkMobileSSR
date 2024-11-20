import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const SwiperList = () => {
  const images = [
    "/images/Slides/BaseSlidepng.png",
    "/images/Slides/images.jpeg",
    "/images/Slides/Без названия.jpeg",
    "/images/Slides/kotenok-1024x640.jpg.webp",
    "/images/Slides/Без названия (1).jpeg",
    "/images/Slides/Без названия (3).jpeg",
    "/images/Slides/Без названия (2).jpeg",
  ];
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
            <img src={image} alt="" />
          </SwiperSlide>
        ))}
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};

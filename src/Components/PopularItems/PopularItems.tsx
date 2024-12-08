import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./PopularItems.module.scss";

export const PopularItems = () => {
  const items = [
    {
      image:
        "/images/PopularItemsImages/Снимок экрана 2024-11-09 в 22.58.52.png",
      title: "AirPods Pro 2 USB-C",
      price: "21 190",
    },
    {
      image:
        "/images/PopularItemsImages/Снимок экрана 2024-11-09 в 22.59.01.png",
      title: "Apple Power Adapter 20W",
      price: "2 490",
    },
  ];
  return (
    <div className={styles["popular-items"]}>
      <h2 className={styles["header"]}>Популярные товары</h2>
      <div className={styles["popular-items-block"]}>
        <Swiper
          key={window.screen.width}
          navigation={true}
          modules={[Navigation, Pagination]}
          slidesPerView={window.screen.width > 1024 ? 5 : 1}
          style={{
            paddingTop: "3%",
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles["popular-items-block-item"]}>
                <div className={styles["popular-items-block-item-gurantee"]}>
                  Гарантия
                </div>
                <img src={item.image} alt="" />
                <div className={styles["popular-items-block-price-block"]}>
                  <span className={styles["popular-items-block-item-tag"]}>
                    {item.title}
                  </span>
                  <span className={styles["popular-items-block-item-price"]}>
                    {item.price} ₽
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

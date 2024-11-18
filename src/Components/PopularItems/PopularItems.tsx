import styles from "./PopularItems.module.scss";
import Image from "next/image";

import img1 from "./PopularItemsImages/Снимок экрана 2024-11-09 в 22.58.52.png";
import img2 from "./PopularItemsImages/Снимок экрана 2024-11-09 в 22.59.01.png";

export const PopularItems = () => {
  const items = [
    {
      image: img1,
      title: "AirPods Pro 2 USB-C",
      price: "21 190",
    },
    {
      image: img2,
      title: "Apple Power Adapter 20W",
      price: "2 490",
    },
  ];
  return (
    <div className={styles["popular-items"]}>
      <h2 className={styles["header"]}>Популярные товары</h2>
      <div className={styles["popular-items-block"]}>
        {items.map((item, index) => (
          <div key={index} className={styles["popular-items-block-item"]}>
            <div className={styles["popular-items-block-item-gurantee"]}>
              Гарантия
            </div>
            <Image src={item.image} alt="" />
            <div className={styles["popular-items-block-price-block"]}>
              <span className={styles["popular-items-block-item-tag"]}>
                {item.title}
              </span>
              <span className={styles["popular-items-block-item-price"]}>
                {item.price} ₽
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

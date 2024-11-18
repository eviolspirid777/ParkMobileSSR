import styles from "./UnderSwiperCards.module.scss";
import iphone from "./UnderSwipeCards/Снимок экрана 2024-11-09 в 22.09.33.png";
import watch from "./UnderSwipeCards/Снимок экрана 2024-11-09 в 22.09.52.png";
import ipad from "./UnderSwipeCards/Снимок экрана 2024-11-09 в 22.09.43.png";
import macbook from "./UnderSwipeCards/Снимок экрана 2024-11-09 в 22.10.01.png";

import Image from "next/image";

export const UnderSwiperCards = () => {
  const items = [
    {
      image: iphone,
      tag: "iPhone",
      price: "47 990",
    },
    {
      image: ipad,
      tag: "iPad",
      price: "37 990",
    },
    {
      image: watch,
      tag: "Watch",
      price: "31 990",
    },
    {
      image: macbook,
      tag: "Macbook",
      price: "97 990",
    },
  ];

  return (
    <div className={styles["cards-block"]}>
      {items.map((item, i) => (
        <div key={i} className={styles["cards-block-item"]}>
          <Image src={item.image} alt="" />
          <div className={styles["cards-block-price-block"]}>
            <span className={styles["cards-block-item-tag"]}>{item.tag}</span>
            <span className={styles["cards-block-item-price"]}>
              От {item.price} ₽
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

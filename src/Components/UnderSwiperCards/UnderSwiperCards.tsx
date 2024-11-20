import styles from "./UnderSwiperCards.module.scss";

export const UnderSwiperCards = () => {
  const items = [
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.09.33.png",
      tag: "iPhone",
      price: "47 990",
    },
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.09.43.png",
      tag: "iPad",
      price: "37 990",
    },
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.09.52.png",
      tag: "Watch",
      price: "31 990",
    },
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.10.01.png",
      tag: "Macbook",
      price: "97 990",
    },
  ];

  return (
    <div className={styles["cards-block"]}>
      {items.map((item, i) => (
        <div key={i} className={styles["cards-block-item"]}>
          <img src={item.image} alt="" width="300" />
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

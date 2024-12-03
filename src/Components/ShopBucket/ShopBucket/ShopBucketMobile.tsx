import { FC } from "react";

import styles from "./ShopBucketMobile.module.scss"

type ShopBucketMobileProps = {
  shopBucket:({
    image: string;
    name: string;
    count: number;
    price: string;
    article: string;
    color?: undefined;
    memory?: undefined;
  } | {
    image: string;
    name: string;
    count: number;
    color: string;
    memory: string;
    price: string;
    article: string;
  })[]
  handleItemCount: (el: ({
    image: string;
    name: string;
    count: number;
    price: string;
    article: string;
    color?: undefined;
    memory?: undefined;
  } | {
    image: string;
    name: string;
    count: number;
    color: string;
    memory: string;
    price: string;
    article: string;
  }), type: "minus" | "plus") => void;
  handleDeleteItem: (index: number) => void;
}

export const ShopBucketMobile: FC<ShopBucketMobileProps> = ({
  shopBucket,
  handleItemCount,
  handleDeleteItem
}) => {
  return (
    <main
      style={{
        maxHeight: "65vh"
      }}
    >
      {shopBucket.map((el, index) => (
        <div key={index} className={styles["item-block"]}>
          <img src={el.image} alt="" width={60} />
          <div className={styles["item-data-container"]}>
            <div className={styles["item-block-info"]}>
              <strong>{el.name}</strong>
            </div>
            <div className={styles["item-count-and-price-block"]}>
              <div className={styles["item-block-count"]}>
                <i
                  className="fa-solid fa-minus"
                  onClick={handleItemCount.bind(this, el, "minus")}
                />
                <span>{el.count}</span>
                <i
                  className="fa-solid fa-plus"
                  onClick={handleItemCount.bind(this, el, "plus")}
                />
              </div>
              <span className={styles["item-block-price"]}>{el.price} ₽</span>
            </div>
          </div>
          <div className={styles["item-block-decline"]}>
            <i
              className="fa-regular fa-trash fa-lg"
              onClick={handleDeleteItem.bind(this, index)}
            />
          </div>
        </div>
      ))}
    </main>
  )
}
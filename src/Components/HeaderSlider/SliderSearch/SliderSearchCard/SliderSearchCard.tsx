import styles from "./SliderSearchCard.module.scss";
import { FC } from "react";
import { SearchItemShortType } from "@/Types/SearchItemShortType";

type SliderSearchCardType = {
  card: SearchItemShortType;
};

export const SliderSearchCard: FC<SliderSearchCardType> = ({ card }) => {
  return (
    <div className={styles["slider-search-card"]} onClick={console.log}>
      <img src={`data:image/jpeg;base64,${card.image}`} alt="" />
      <div className={styles["slider-search-card-info"]}>
        <span>{card.name}</span>
        <strong>{card.price} ₽</strong>
      </div>
    </div>
  );
};

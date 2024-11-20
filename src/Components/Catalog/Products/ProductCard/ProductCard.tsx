"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductCard.module.scss";
import { CardType } from "@/Types/CardType";

type ProductCardProps = {
  card: CardType;
};

export const ProductCard: React.FC<ProductCardProps> = ({ card }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (typeof card.image === "string") {
        setImage(`data:image/jpeg;base64,${card.image}`);
      } else {
        console.error("Неизвестный тип данных для изображения:", card.image);
        setImage(null);
      }
    } catch (error) {
      console.error("Ошибка при создании URL изображения:", error);
      setImage(null);
    }
  }, [card.image, card]);

  return (
    <div className={styles["product-card"]}>
      {image && <img src={image} alt="" width="300" height="300" />}
      <div className={styles["product-card-text-block"]}>
        <label className={styles["product-card-text-block-tag"]}>
          {card.name}
        </label>
        <div className={styles["product-card-text-block-tile"]}>Новинка</div>
      </div>
      <span className={styles["product-card-text-block-price"]}>
        {card.price} ₽
      </span>
    </div>
  );
};

import React from "react";
import styles from "./UnderTilesLogos.module.scss";

export const UnderTilesLogos = () => {
  const images = [
    "/images/ItemsLogos/apple.png",
    "/images/ItemsLogos/dyson.png",
    "/images/ItemsLogos/samsung.png",
    "/images/ItemsLogos/sony.png",
  ];

  return (
    <div className={styles["under-tiles-logos-block"]}>
      {images.map((image, key) => (
        <img src={image} key={key} alt="" height="300" width="300" />
      ))}
    </div>
  );
};

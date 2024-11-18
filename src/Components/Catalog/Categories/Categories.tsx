import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import styles from "./Categories.module.scss";
import { useAtom } from "jotai";
import { categoryAtom } from "../../../Store/FiltersStore";

export const Categories = () => {
  const categoriesItems = [
    "Все",
    "iPhone",
    "iPad",
    "Watch",
    "Mac",
    "Airpods",
    "Аксессуары",
    "Гаджеты",
    "Аудио",
    "Смартфоны",
    "Гейминг",
    "Красота и здоровье",
    "TV и Дом",
    "Популярное",
  ];

  const [categories, setCategories] = useAtom(categoryAtom);
  const [selectedValue, setSelectedValue] = useState(categoriesItems[0]);

  useEffect(() => {
    if (!categories) {
      setSelectedValue(categoriesItems[0]);
    }
  }, [categories]);

  const spanRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY >= 2900) {
        setTimeout(() => {
          categoriesItems.forEach((_, index) => {
            const spanElement = spanRefs.current[index];

            if (spanElement) {
              gsap.fromTo(
                spanElement,
                {
                  opacity: 0,
                  y: 30,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                }
              );
            }
          });
        }, 400);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCategory = (event: React.MouseEvent<HTMLSpanElement>) => {
    const newFilter = event.currentTarget.textContent ?? "";
    setSelectedValue(newFilter);
    setCategories(newFilter);
  };

  return (
    <div className={styles["categories-block"]}>
      {categoriesItems.map((el, index) => (
        <span
          key={index}
          ref={(el) => (spanRefs.current[index] = el!)}
          style={
            el === selectedValue
              ? {
                  backgroundColor: "#abbcae",
                  color: "white",
                }
              : {}
          }
          onClick={handleCategory}
        >
          {el}
        </span>
      ))}
    </div>
  );
};

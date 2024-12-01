"use client";
import gsap from "gsap";
import styles from "./Tiles.module.scss";
import { useEffect, useRef } from "react";

type TileItem = {
  title: string;
  description: string;
  img: string;
  key: string;
  href: string;
};

export const Tiles = () => {
  const tilesItems: TileItem[] = [
    {
      title: "Apple Watch",
      description: "Умнее. Ярче. Могущественнее",
      img: "/images/TilesImages/AppleWatchTile/appleWatchTileReviewed.png",
      href: "vk.com",
      key: "1",
    },
    {
      title: "MacBook Pro",
      description: "Сногсшибательный. Вскружит голову.",
      img: "/images/TilesImages/MacBookTile/macBookReviewed.png",
      href: "vk.com",
      key: "2",
    },
    {
      title: "iPad",
      description: "Твой следующий компьютер - это не компьютер",
      img: "/images/TilesImages/IpadTile/ipadTileReviewed.png",
      href: "vk.com",
      key: "3",
    },
    {
      title: "AirPods Pro",
      description: "Никаких проводов. Только магия звука.",
      img: "/images/TilesImages/AirpodsTile/PodsTileReviewed.png",
      href: "vk.com",
      key: "4",
    },
  ];

  const h2Refs = useRef<HTMLHeadingElement[]>([]);
  const spanRefs = useRef<HTMLSpanElement[]>([]);
  const buttonRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 1600) {
        tilesItems.forEach((_, index) => {
          const h2Element = h2Refs.current[index];
          const spanElement = spanRefs.current[index];
          const buttonElement = buttonRefs.current[index];

          if (h2Element && spanElement) {
            const delay = index * 0.5;

            gsap.fromTo(
              h2Element,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
                delay: delay,
              }
            );

            gsap.fromTo(
              spanElement,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
                delay: delay + 0.4,
              }
            );

            gsap.fromTo(
              buttonElement,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
                delay: delay + 0.7,
              }
            );
          }
        });

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles["card-tiles-block"]}>
      {tilesItems.map((el, index) => (
        <div key={index} className={styles["card-item-block"]}>
          <h2
            ref={(el) => {
              h2Refs.current[index] = el!;
            }}
            data-image={el.key}
          >
            {el.title}
          </h2>
          <span
            ref={(el) => {
              spanRefs.current[index] = el!;
            }}
            data-image={el.key}
          >
            {el.description}
          </span>
          <img src={el.img} alt="" />
          <div
            className={styles["card-item-block-button-block"]}
            ref={(el) => {
              buttonRefs.current[index] = el!;
            }}
            data-buttons={el.key}
          >
            <button data-button="подробнее">Подробнее</button>
            <button data-button="купить">Купить</button>
          </div>
        </div>
      ))}
    </div>
  );
};

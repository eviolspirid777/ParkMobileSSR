"use client"
import watchesImg from "./TilesImages/AppleWatchTile/appleWatchTileReviewed.png";
import macbookImg from "./TilesImages/MacBookTile/macBookReviewed.png";
import ipadImg from "./TilesImages/IpadTile/ipadTileReviewed.png";
import airpodsImg from "./TilesImages/AirpodsTile/PodsTileReviewed.png";
import gsap from "gsap";
import styles from "./Tiles.module.scss";
import { useEffect, useRef } from "react";
import Image from "next/image"

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
      img: watchesImg,
      href: "vk.com",
      key: "1",
    },
    {
      title: "MacBook Pro",
      description: "Сногсшибательный. Вскружит голову.",
      img: macbookImg,
      href: "vk.com",
      key: "2",
    },
    {
      title: "iPad",
      description: "Твой следующий компьютер - это не компьютер",
      img: ipadImg,
      href: "vk.com",
      key: "3",
    },
    {
      title: "AirPods Pro",
      description: "Никаких проводов. Только магия звука.",
      img: airpodsImg,
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      }}
    >
      {tilesItems.map((el, index) => (
        <div key={index} className={styles["card-item-block"]}>
          <h2 ref={(el) => (h2Refs.current[index] = el!)} aria-image={el.key}>
            {el.title}
          </h2>
          <span
            ref={(el) => (spanRefs.current[index] = el!)}
            aria-image={el.key}
          >
            {el.description}
          </span>
          <Image src={el.img} alt=""/>
          <div
            className={styles["card-item-block-button-block"]}
            ref={(el) => (buttonRefs.current[index] = el!)}
            aria-buttons={el.key}
          >
            <button aria-button="подробнее">Подробнее</button>
            <button aria-button="купить">Купить</button>
          </div>
        </div>
      ))}
    </div>
  );
};

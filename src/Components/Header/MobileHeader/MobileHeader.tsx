import { FC, useEffect, useState } from "react";
import styles from "./MobileHeader.module.scss";
import { TelegramIcon } from "@/Components/Footer/Telegram";
import { shopBucketAtom } from "@/Store/ShopBucket";
import { useAtom } from "jotai";

type MobileHeaderProps = {
  handleMainMenuRoute: () => void;
  handleShopBag: () => void;
};

export const MobileHeader: FC<MobileHeaderProps> = ({
  handleMainMenuRoute,
  handleShopBag,
}) => {
  const [shopBucket] = useAtom(shopBucketAtom);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useEffect(() => {
    const _html = document.documentElement; // Изменяем html
    const _body = document.body;

    if (isMenuOpened) {
      _html.style.overflow = "hidden"; // Отключаем скролл на html
      _body.style.overflow = "hidden";  // Отключаем скролл на body
    } else {
      _html.style.overflow = "visible"; // Включаем скролл на html
      _body.style.overflow = "visible";  // Включаем скролл на body
    }

    return () => {
      _html.style.overflow = "visible"; // Сбрасываем стили при размонтировании
      _body.style.overflow = "visible"; // Сбрасываем стили при размонтировании
    };
  }, [isMenuOpened]);

  const handleMenuToggle = () => {
    setIsMenuOpened((prev) => !prev);
  };

  return (
    <nav>
      <div className={styles["navbar"]}>
        <div className={`${styles["container"]} ${styles["nav-container"]}`}>
          <input
            className={styles["checkbox"]}
            type="checkbox"
            id="menuToggle"
            checked={isMenuOpened} // Устанавливаем состояние checked
            onChange={handleMenuToggle} // Используем только onChange
          />
          <div className={styles["hamburger-lines"]} onClick={handleMenuToggle}>
            <span className={`${styles["line"]} ${styles["line1"]}`}></span>
            <span className={`${styles["line"]} ${styles["line2"]}`}></span>
            <span className={`${styles["line"]} ${styles["line3"]}`}></span>
          </div>
          <div className={styles["logo-container"]}>
            <img
              src={"/images/Logo/Logo.png"}
              alt="Логотип"
              className={styles["image"]}
              onClick={handleMainMenuRoute}
              draggable="false"
            />
            <div className={styles["nav-bucket-search"]}>
              <i className="fa-thin fa-magnifying-glass fa-lg" />
              <div className={styles["nav-bucket-search-shop-block"]}>
                <span>{shopBucket.length}</span>
                <i
                  className="fa-sharp fa-thin fa-bag-shopping fa-lg"
                  onClick={handleShopBag}
                />
              </div>
            </div>
          </div>
          <div className={styles["menu-items"]}>
            <li><a href="#">Каталог</a></li>
            <li><a href="#">О компании</a></li>
            <li><a href="#">Помощь</a></li>
            <li><a href="#">Подпишись</a></li>
            <li><a href="#">Контакты</a></li>
            <div className={styles["menu-items-description"]}>
            Магазин цифровой техники Park Mobile — ведущий поставщик
              оригинальной техники в Краснодаре. Мы рады предложить вам
              продукцию топовых марок, включая Apple, Dyson, Samsung, DJI,
              Xiaomi и многие другие.
            </div>
            <div className={styles["menu-items-contact-block"]}>
              <a href="tel:89337772777">+7 933 777‑27‑77</a>
              <div className={styles["menu-items-contact-block-social"]}>
                <a href="https://t.me/@ParkMobile23">
                  <TelegramIcon />
                </a>
                <a href="https://wa.me/79337772777">
                  <img src={"/images/AboutContacts/WhatssApp.png"} height={46} width={46} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

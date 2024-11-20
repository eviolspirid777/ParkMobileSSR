"use client";
import styles from "./AboutContacts.module.scss";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { TelegramIcon } from "../../Footer/Telegram";

import WhatssAppImg from "../../../assets/Reqesits/WhatssApp.png";
import PhoneDemo from "../../../assets/Reqesits/Phone_demo.png";

import Image from "next/image";
import { useEffect } from "react";

export const AboutContacts = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <YMaps>
        <div className={styles["about-contacts-block"]}>
          <div className={styles["about-contacts-block-info-block"]}>
            <h3>О компании</h3>
            <h3>Park Mobile</h3>
          </div>
          <div className={styles["about-contacts-block-info-block-text"]}>
            <span>
              Вас приветствует магазин цифровой техники Park Mobile. Мы являемся
              ведущим поставщиком оригинальной техники в Краснодаре и рады
              предложить вам продукцию топовых марок, включая Apple, Dyson,
              Samsung, DJI, Xiaomi и многие другие.
            </span>
            <span>
              С Park Mobile вы можете быть уверены в надежности и безопасности
              покупок. Мы гарантируем оригинальность всех товаров и предлагаем
              гибкие условия оплаты и доставки по всей России.
            </span>
          </div>
          <hr style={{ backgroundColor: "#e8e8ed" }} />
          <h3>Наши контакты</h3>
          <Map
            defaultState={{ center: [45.018244, 38.965192], zoom: 17 }}
            width="100%"
            height="360px"
            onLoad={(ymaps) => {
              console.log(ymaps);
            }}
          >
            <Placemark geometry={[45.018244, 38.965192]} />
          </Map>
          <div className={styles["about-contacts-block-data-grid"]}>
            <div className={styles["about-contacts-block-data-grid-1"]}>
              <h3>Наши реквезиты:</h3>
              <div
                className={styles["about-contacts-block-data-grid-1-reqesits"]}
              >
                <span>ИП Безганс Эмиль Владимирович</span>
                <span>ОГРНИП: 323237500114924</span>
                <span>ИНН: 090108428776</span>
              </div>
              <h3>Наши контакты:</h3>
              <div
                className={styles["about-contacts-block-data-grid-1-contacts"]}
              >
                <span>г. Краснодар, ул. Советская 36</span>
                <span>(Работаем без выходных с 11:00 до 20:00)</span>
              </div>
              <div className={styles["contacts"]}>
                <a href="tel:79288173475">+7 928 817 34-75</a>
                <a href="https://t.me/@ParkMobile23">
                  <TelegramIcon />
                </a>
                <a href="https://wa.me/79288173475">
                  <Image src={WhatssAppImg} alt="" />
                </a>
              </div>
            </div>
            <div className={styles["about-contacts-block-data-grid-2"]}>
              <span>
                Мы предлагаем доставку по Краснодару и отправку в другие города
                любым удобным для вас способом. Нужную вам позицию можно
                заказать с выдачей на следующий день.
              </span>
              <span>
                По всем вопросам обращайтесь к нашему менеджеру по указанным
                контактам.
              </span>
              <span>
                Присоединяйтесь к семье Park Mobile сегодня и откройте для себя
                мир высоких технологий с нами!
              </span>
            </div>
          </div>
          <div className={styles["about-contacts-block-questions"]}>
            <div className={styles["about-contacts-block-questions-data"]}>
              <h3>У вас возникли вопросы?</h3>
              <span>
                Позвоните или оставьте номер для связи, и мы грамотно, четко и
                ясно ответим на все вопросы.
              </span>
              <h3>+7 928 817-34-75</h3>
              <button>Заказать звонок</button>
            </div>
            <Image src={PhoneDemo} alt="" />
          </div>
        </div>
      </YMaps>
    </>
  );
};

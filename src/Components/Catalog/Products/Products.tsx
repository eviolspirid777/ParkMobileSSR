"use client"
import React, { FC, useEffect, useReducer, useState } from "react";
import styles from "./Products.module.scss";
import { ProductCard } from "./ProductCard/ProductCard";
import { CardType } from "../../../Types/CardType";
import { createPortal } from "react-dom";
import { Modal } from "antd";
import MarkdownRenderer from "@/Components/MarkDown/MarkDownRenderer";

type ProductsType = {
  cards?: CardType[];
  itemsCount: number | undefined;
  currentPage: number;
  onPageChange: (skip: number, page: number) => void;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (
  state: unknown,
  {
    skip,
    take,
    currentPage,
    itemsLength,
  }: { skip: number; take: number; currentPage: number; itemsLength: number }
) => {
  const totalPages = Math.ceil(itemsLength / take);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return {
    pages,
    currentPage: Math.min(currentPage, totalPages),
    skip,
    take,
  };
};

const MarkdownContent = `
Добро пожаловать в мир безграничных возможностей и качественного звука с наушниками **Apple AirPods Pro 2**. Эти ультрасовременные наушники объединяют в себе передовые технологии и высокое качество исполнения, чтобы удовлетворить даже самых требовательных пользователей.

*Основные характеристики:*

1. **Беспроводное подключение через Bluetooth 5.3:** Самая последняя версия Bluetooth обеспечивает стабильное и быстрое подключение к вашему устройству для безупречного воспроизведения звука.
2. **Открытый акустический тип:** Наушники AirPods Pro 2 предлагают открытый акустический тип, который обеспечивает естественный и просторный звук, а также комфортное ношение на протяжении долгих периодов времени.
3. **Активное подавление шума:** Встроенная система активного подавления шума позволяет вам погрузиться в мир музыки, изолируя вас от внешних шумов и помех.
4. **Беспроводная зарядка:** Заряжайте наушники без лишних проводов благодаря беспроводной зарядной платформе, входящей в комплект поставки.
5. **Управление воспроизведением:** С удобными сенсорными поверхностями вы можете легко управлять воспроизведением музыки и отвечать на звонки, не прибегая к использованию устройства.
6. **Длительное время работы:** Благодаря мощному аккумулятору вы можете наслаждаться музыкой в течение до 30 часов без перерыва.

Не имеет значения, слушаете ли вы музыку, смотрите фильмы или занимаетесь спортом, наушники AirPods Pro 2 обеспечат вам непревзойденное качество звука и комфортное использование в любой ситуации.
`

export const Products: FC<ProductsType> = ({
  cards,
  itemsCount,
  currentPage,
  onPageChange,
}) => {
  const [openProductCard, setOpenProductCard] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    pages: [],
    currentPage: 1,
    skip: 0,
    take: 16,
  });

  useEffect(() => {
    if (itemsCount !== undefined) {
      dispatch({
        skip: (currentPage - 1) * 16,
        take: 16,
        currentPage,
        itemsLength: itemsCount,
      });
    }
  }, [itemsCount, currentPage]);

  const handlePageClick = (page: number) => {
    const newSkip = (page - 1) * 16;
    onPageChange(newSkip, page);
  };

  return (
    <>
      <div className={styles["product"]}>
        <div className={styles["product-cards-block"]}>
          {cards &&
            cards.map((el, index) => <ProductCard key={index} card={el} onClick={setOpenProductCard.bind(this, true)}/>)}
        </div>
        <div className={styles["product-pagination-block"]}>
          {state.pages.map((el) => (
            <div
              key={el}
              className={`${styles["product-pagination-block-item"]} ${
                state.currentPage === el ? styles.selected : ""
              }`}
              onClick={() => handlePageClick(el)}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
      {
        createPortal(
          <div>
            <Modal
              open={openProductCard}
              onCancel={setOpenProductCard.bind(this, false)}
              onClose={setOpenProductCard.bind(this, false)}
              centered={true}
              footer={null}
              title={null}
              closeIcon={null}
              style={{
                border: "none",
                backgroundColor: "transparent",
                minWidth: "100%"
              }}
            >
              <div className={styles["item-container"]}>
                <div className={styles["item-container-image"]}>
                  <img src="" />
                </div>
                <div className={styles["item-container-data"]}>
                  <header>
                    <h3>AirPods Pro 2 USB-C</h3>
                    <title>apple</title>
                    <article></article>
                  </header>
                  <strong>21 190 ₽</strong>
                  <button>Купить</button>
                  <div className={styles["credit"]}>
                    <span>Доступно</span>
                    <a>
                      в рассрочку
                    </a>
                    <span>от 3 800 ₽/мес.</span>
                  </div>
                  <div className={styles["MarkdownContent"]}>
                    <MarkdownRenderer content={MarkdownContent} />
                  </div>
                </div>
              </div>
            </Modal>
          </div>,
          document.body
        )
      }
    </>
  );
};

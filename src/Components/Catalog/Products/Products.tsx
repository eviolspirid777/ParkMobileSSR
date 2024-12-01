"use client";
import React, { FC, useEffect, useReducer, useState } from "react";
import styles from "./Products.module.scss";
import { ProductCard } from "./ProductCard/ProductCard";
import { CardItemType, CardType } from "../../../Types/CardType";
import { createPortal } from "react-dom";
import { Modal } from "antd";
import MarkdownRenderer from "@/Components/MarkDown/MarkDownRenderer";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// import Image from "next/image";

type ProductsType = {
  cards?: CardType[];
  itemsCount: number | undefined;
  currentPage: number;
  onPageChange: (skip: number, page: number) => void;
};

type ReducerType = {
  skip: number;
  take: number;
  currentPage: number;
  itemsLength: number;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (
  state: unknown,
  { skip, take, currentPage, itemsLength }: ReducerType
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

// const MarkdownContent = `
// Добро пожаловать в мир безграничных возможностей и качественного звука с наушниками **Apple AirPods Pro 2**. Эти ультрасовременные наушники объединяют в себе передовые технологии и высокое качество исполнения, чтобы удовлетворить даже самых требовательных пользователей.

// *Основные характеристики:*

// 1. **Беспроводное подключение через Bluetooth 5.3:** Самая последняя версия Bluetooth обеспечивает стабильное и быстрое подключение к вашему устройству для безупречного воспроизведения звука.
// 2. **Открытый акустический тип:** Наушники AirPods Pro 2 предлагают открытый акустический тип, который обеспечивает естественный и просторный звук, а также комфортное ношение на протяжении долгих периодов времени.
// 3. **Активное подавление шума:** Встроенная система активного подавления шума позволяет вам погрузиться в мир музыки, изолируя вас от внешних шумов и помех.
// 4. **Беспроводная зарядка:** Заряжайте наушники без лишних проводов благодаря беспроводной зарядной платформе, входящей в комплект поставки.
// 5. **Управление воспроизведением:** С удобными сенсорными поверхностями вы можете легко управлять воспроизведением музыки и отвечать на звонки, не прибегая к использованию устройства.
// 6. **Длительное время работы:** Благодаря мощному аккумулятору вы можете наслаждаться музыкой в течение до 30 часов без перерыва.

// Не имеет значения, слушаете ли вы музыку, смотрите фильмы или занимаетесь спортом, наушники AirPods Pro 2 обеспечат вам непревзойденное качество звука и комфортное использование в любой ситуации.
// `;

export const Products: FC<ProductsType> = ({
  cards,
  itemsCount,
  currentPage,
  onPageChange,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    pages: [],
    currentPage: 1,
    skip: 0,
    take: 16,
  });

  const [openProductCard, setOpenProductCard] = useState<{
    state: boolean;
    id: number | null;
  }>({ state: false, id: null });

  const { data: CardData, mutate } = useMutation({
    mutationFn: async () => {
      const response = await axios.post<CardItemType>(
        `https://localhost:7280/api/ItemsPostgre/GetItem/${openProductCard.id}`
      );
      return response.data;
    },
  });

  useEffect(() => {
    console.log(CardData);
  }, [CardData]);

  useEffect(() => {
    if (openProductCard.id !== null) {
      mutate();
    }
  }, [openProductCard.id]);

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

  const handleCreditPrice = (price: string | undefined | number) => {
    if (typeof price == "string") {
      const _price = Number((price as string).split(" ").join(""));
      return ((_price * 1.31) / 36 + 1).toFixed();
    }
  };

  return (
    <>
      <div className={styles["product"]}>
        <div className={styles["product-cards-block"]}>
          {cards &&
            cards.map((el, index) => (
              <ProductCard
                key={index}
                card={el}
                onClick={setOpenProductCard.bind(this, {
                  state: true,
                  id: el.id ?? null,
                })}
              />
            ))}
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
      {createPortal(
        <div>
          <Modal
            open={openProductCard.state}
            onCancel={setOpenProductCard.bind(this, { state: false, id: null })}
            onClose={setOpenProductCard.bind(this, { state: false, id: null })}
            centered={true}
            footer={null}
            title={null}
            closeIcon={null}
            className={styles["item-modal-window"]}
          >
            <div className={styles["item-container"]}>
              <div className={styles["item-container-image"]}>
                <img
                  src={
                    CardData && CardData.image
                      ? `data:image/jpeg;base64,${CardData.image}`
                      : ""
                  }
                  alt=""
                />
              </div>
              <div className={styles["item-container-data"]}>
                <header>
                  <h3>{CardData?.name}</h3>
                  <title>{CardData?.brandName}</title>
                  <article>АРТИКУЛ</article>
                </header>
                <strong>{CardData?.price} ₽</strong>
                <button>Купить</button>
                <div className={styles["credit"]}>
                  <span>Доступно</span>
                  <a>в кредит</a>
                  <span>от {handleCreditPrice(CardData?.price)} ₽/мес.</span>
                </div>
                <div className={styles["MarkdownContent"]}>
                  <MarkdownRenderer content={CardData?.description ?? ""} />
                </div>
              </div>
            </div>
          </Modal>
        </div>,
        document.body
      )}
    </>
  );
};

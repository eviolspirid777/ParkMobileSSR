"use client"
import React, { FC, useEffect, useReducer } from "react";
import styles from "./Products.module.scss";
import { ProductCard } from "./ProductCard/ProductCard";
import { CardType } from "../../../Types/CardType";

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
    <div className={styles["product"]}>
      <div className={styles["product-cards-block"]}>
        {cards &&
          cards.map((el, index) => <ProductCard key={index} card={el} />)}
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
  );
};

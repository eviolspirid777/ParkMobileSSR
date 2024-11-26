"use client";
import { FC, useState } from "react";
import { Products } from "../Products";
import { RecivedCardDataType } from "@/Types/CardType";
import { animateScroll as scroll } from "react-scroll";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import styles from "./ProductObertka.module.scss";
import { Categories } from "../../Categories/Categories";

type ProductObertkaProps = {
  category: string;
};

const categoryDictionary = new Map([
  ["Apple", "brand=Apple"],
  ["Samsung", "brand=Samsung"],
  ["Xiaomi", "brand=Xiaomi"],
  ["Dyson", "brand=Dyson"],
  ["Headphones", "category=Audio"],
  ["Gaming", "category=Gaming"],
]);

export const ProductObertka: FC<ProductObertkaProps> = ({ category }) => {
  const [skip, setSkip] = useState(0);
  const [take] = useState(16);

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: items,
    refetch,
    isLoading: isLoadingAll,
  } = useQuery({
    queryKey: ["items", skip, take],
    //TODO: Здесь нужно будет пофиксить баг с тем, что категории неправильно отправляются, нужна дополнительная обработка на беке
    queryFn: async () => {
      const response = await axios.get<RecivedCardDataType>(
        `http://localhost:5164/api/ItemsPostgre/GetItems?skip=${skip}&take=${take}&${categoryDictionary.get(
          category
        )}`
      );
      const data = response.data;
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const handleOnPageChange = (newSkip: number, newPage: number) => {
    scroll.scrollTo(100, {
      duration: 700,
      smooth: true,
    });

    setSkip(newSkip);
    setCurrentPage(newPage);
    refetch();
  };

  if (isLoadingAll || items?.count === 0) {
    return <div style={{ height: "320vh", width: "100%" }} />;
  }

  return (
    <div className={styles["product-container"]}>
      <h4>Каталог</h4>
      <Categories noAnimationHeight />
      <Products
        cards={items?.items}
        itemsCount={items?.count}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}
      />
    </div>
  );
};

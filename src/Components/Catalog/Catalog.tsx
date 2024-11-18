"use client"
import { useEffect, useState } from "react";
import styles from "./Catalog.module.scss";
import { CatalogHeader } from "./Header/CatalogHeader";
import { Categories } from "./Categories/Categories";
import { Products } from "./Products/Products";
import { FilterTile } from "./Products/FilterTile/FilterTile";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RecivedCardDataType } from "../../Types/CardType";
import { useAtom } from "jotai";
import { categoryAtom, categoryDictionary } from "../../Store/FiltersStore";
import { animateScroll as scroll } from "react-scroll";

export const Catalog = () => {
  const [storeCategory] = useAtom(categoryAtom);

  const [skip, setSkip] = useState(0);
  const [take] = useState(16);

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: items,
    refetch,
    isLoading: isLoadingAll,
  } = useQuery({
    queryKey: ["items", skip, take],
    queryFn: async () => {
      const response = await axios.get<RecivedCardDataType>(
        `api/ItemsPostgre?skip=${skip}&take=${take}`
      );
      const data = response.data;
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const {
    mutate: fetchFilteredItems,
    data: categoryItems,
    isPending: isPendingCategory,
  } = useMutation({
    mutationKey: ["filter"],
    mutationFn: async (category: string) => {
      const response = await axios.post<RecivedCardDataType>(
        `api/ItemsPostgre/category?category=${categoryDictionary.get(category)}`
      );
      return response.data;
    },
  });

  const handleOnPageChange = (newSkip: number, newPage: number) => {
    scroll.scrollTo(3800, {
      duration: 700,
      smooth: true,
    });

    setSkip(newSkip);
    setCurrentPage(newPage);
    refetch();
  };

  useEffect(() => {
    if (storeCategory) {
      fetchFilteredItems(storeCategory);
    }
  }, [storeCategory, fetchFilteredItems]);

  return (
    <div className={styles["catalog-block"]}>
      <CatalogHeader />
      <Categories />
      <FilterTile itemsCount={categoryItems?.count || items?.count} />
      {isLoadingAll || isPendingCategory ? (
        <div style={{ height: "2040px", width: "1239px" }}>Loading...</div>
      ) : (
        <Products
          cards={categoryItems?.items || items?.items}
          itemsCount={categoryItems?.count || items?.count}
          currentPage={currentPage}
          onPageChange={handleOnPageChange}
        />
      )}
    </div>
  );
};

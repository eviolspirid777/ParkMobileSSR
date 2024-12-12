"use client";
import { FC, useEffect, useState } from "react";
import styles from "./HeaderSlider.module.scss";
import { SliderMenu } from "./SliderMenu/SliderMenu";
import { SliderSearch } from "./SliderSearch/SliderSearch";
import { CardType } from "@/Types/CardType";
import { ReducerAction } from "../HeaderComponentPack/HeaderComponentPack";
import { SliderSearchCard } from "./SliderSearch/SliderSearchCard/SliderSearchCard";
import { useGetSearchItems } from "@/hooks/useGetSearchItems";
import { debounce } from "lodash";

type HeaderSliderProps = {
  isContentVisible: boolean;
  handleIsContentVisible: () => void;
  handleMouseLeave: () => void;
  contentType: ReducerAction;
};

export const HeaderSlider: FC<HeaderSliderProps> = ({
  handleMouseLeave,
  isContentVisible,
  handleIsContentVisible,
  contentType,
}) => {
  const { mutateSearchedItems, searchedItems, isSearchedItemsSuccess } =
    useGetSearchItems();

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "scroll",
      () => {
        handleIsContentVisible();
      },
      { signal: controller.signal }
    );
    return () => controller.abort();
  }, []);

  const [inputValue, setInputValue] = useState("");

  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [skip, setSkip] = useState(0);
  const take = 24;

  const handleInputChange = debounce(async (value: string) => {
    setInputValue(value);
    await mutateSearchedItems({tag: value, skip: skip, take: take});
  }, 700);

  useEffect(() => {
    mutateSearchedItems({tag: inputValue, skip: skip, take: take})
  }, [skip])

  const handlePageClick = (page: number) => {
    console.log(page)
    const newSkip = (page - 1) * take;
    setCurrentPage(page)
    setSkip(newSkip)
  };

  useEffect(() => {
    totalCount()
  }, [searchedItems])

  const totalCount = () => {
    if(searchedItems?.count) {
      const totalPages = Math.ceil(searchedItems?.count / 24);
      setPages(Array.from({ length: totalPages }, (_, index) => index + 1));
    }
  }

  return (
    <>
      <div
        onMouseEnter={() => (inputValue ? {} : handleMouseLeave())}
        className={`${
          styles[`blur-block-${isContentVisible ? "visible" : "invisible"}`]
        } ${inputValue && searchedItems && styles["has-value-bg"]}`}
      >
        <div className={styles["search-items-block-container"]}>
          <span>Найдено результатов: {searchedItems?.count}</span>
          <div className={styles["search-items-block-container-data"]}>
            {searchedItems?.items?.map((item, index) => (
              <SliderSearchCard key={index} card={item} />
            ))}
          </div>
          {
            inputValue && searchedItems &&
            <div className={styles["pagination-block"]}>
            {pages.map((el) => (
              <div
                key={el}
                className={`${styles["pagination-block-item"]} ${
                  currentPage === el ? styles.selected : ""
                }`}
                onClick={() => handlePageClick(el)}
              >
                {el}
              </div>
            ))}
          </div>
          }
        </div>
      </div>
      <div
        id="blur-block"
        className={`${
          styles[
            `blur-block-content-${isContentVisible ? "visible" : "invisible"}`
          ]
        } ${inputValue && searchedItems && styles["has-value"]}`}
      >
        {contentType.type === "menu" ? (
          <SliderMenu
            items={contentType.items as unknown as CardType[]}
            subTitles={contentType.subTitles}
            titles={contentType.titles}
          />
        ) : (
          <SliderSearch
            onInputChange={handleInputChange}
            isSuccess={isSearchedItemsSuccess}
          />
        )}
      </div>
    </>
  );
};

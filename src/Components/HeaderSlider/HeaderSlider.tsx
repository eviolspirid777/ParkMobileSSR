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

  const handleInputChange = debounce(async (value: string) => {
    setInputValue(value);
    mutateSearchedItems(value);
  }, 700);

  return (
    <>
      <div
        onMouseEnter={() => (inputValue ? {} : handleMouseLeave())}
        className={`${
          styles[`blur-block-${isContentVisible ? "visible" : "invisible"}`]
        } ${inputValue && searchedItems && styles["has-value-bg"]}`}
      >
        <div className={styles["search-items-block-container"]}>
          <span>Найдено результатов: {searchedItems?.length}</span>
          <div className={styles["search-items-block-container-data"]}>
            {searchedItems?.map((item, index) => (
              <SliderSearchCard key={index} card={item} />
            ))}
          </div>
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

"use client";
import { FC, useEffect } from "react";
import styles from "./HeaderSlider.module.scss";
import { SliderMenu } from "./SliderMenu/SliderMenu";
import { SliderSearch } from "./SliderSearch/SliderSearch";
import { ReducerAction } from "@/app/(main_app)/page";
import { CardType } from "@/Types/CardType";

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

  return (
    <>
      <div
        onMouseEnter={() => handleMouseLeave()}
        className={
          styles[`blur-block-${isContentVisible ? "visible" : "invisible"}`]
        }
      />
      <div
        id="blur-block"
        className={
          styles[
            `blur-block-content-${isContentVisible ? "visible" : "invisible"}`
          ]
        }
      >
        {contentType.type === "menu" ? (
          <SliderMenu
            items={contentType.items as unknown as CardType[]}
            subTitles={contentType.subTitles}
            titles={contentType.titles}
          />
        ) : (
          <SliderSearch />
        )}
      </div>
    </>
  );
};

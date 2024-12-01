"use client";
import { useEffect, useReducer, useState } from "react";
import { Header } from "../Header/Header";
import { HeaderSlider } from "../HeaderSlider/HeaderSlider";
import { ContentType } from "@/Types/SliderContentType";
import { useRouter } from "next/navigation";
import { animateScroll as scroll } from "react-scroll";

import { ShopBucket } from "../ShopBucket/ShopBucket";

export type ReducerAction = {
  type?: ContentType;
  titles?: string[];
  subTitles?: string[];
  items?: { image: string; tag: string; price: string }[];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (
  state: unknown,
  { type, items, subTitles, titles }: ReducerAction
): ReducerAction => {
  return { type, items, subTitles, titles };
};

const navTitleDictionary = new Map([
  ["Apple", "Apple"],
  ["Samsung", "Samsung"],
  ["Xiaomi", "Xiaomi"],
  ["Dyson", "Dyson"],
  ["Акустика и гарнитура", "Headphones"],
  ["Гейминг", "Gaming"],
]);

export const HeaderComponentPack = () => {
  const navigate = useRouter();

  const [isHeaderMenuVisible, setIsHeaderMenuVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [sliderData, dispatch] = useReducer(reducer, {});

  const [open, setOpen] = useState(false);

  const handleMouseEnter = (
    type: ContentType,
    titles: string[] | undefined,
    subTitles: string[] | undefined
  ) => {
    setTimeout(() => {
      setIsHeaderMenuVisible(true);
      setIsContentVisible(true);
    }, 100);
    dispatch({ type, titles, subTitles });
  };

  const handleMouseLeave = () => {
    setIsContentVisible(false);
    setTimeout(() => {
      setIsHeaderMenuVisible(false);
    }, 800);
  };

  const handleRouteCategory = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const category = event.currentTarget.text;
    const selectedCategory = navTitleDictionary.get(category);
    navigate.push(`/categories/${selectedCategory}`);
    handleMouseLeave();
  };

  const handleMainMenu = () => {
    navigate.push("/");
    handleMouseLeave();
  };

  const handleShopBag = () => {
    setOpen((previousState) => !previousState);
  };

  useEffect(() => {
    scroll.scrollTo(0);
  }, []);

  return (
    <>
      <Header
        mouseEnter={handleMouseEnter}
        handleMouseClick={(event) => handleRouteCategory(event)}
        handleMainMenuRoute={handleMainMenu}
        handleShopBag={handleShopBag}
      />
      {isHeaderMenuVisible && (
        <HeaderSlider
          contentType={sliderData}
          handleMouseLeave={handleMouseLeave}
          isContentVisible={isContentVisible}
          handleIsContentVisible={handleMouseLeave}
        />
      )}
      <ShopBucket open={open} handleShopBag={handleShopBag} />
    </>
  );
};

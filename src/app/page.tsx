'use client'
import { useEffect, useReducer, useState } from "react";
import { ContentType } from "@/Types/SliderContentType";
import { useAtom } from "jotai";
import { selectedRouteAtom } from "@/Store/RouteStore";
import { useRouter } from "next/navigation";
import { InputFileComponent } from "@/Components/InputFileComponent/InputFileComponent";
import { Footer } from "@/Components/Footer/Footer";
import { Catalog } from "@/Components/Catalog/Catalog";
import { UnderTilesLogos } from "@/Components/UnderTilesLogos/UnderTilesLogos";
import { Tiles } from "@/Components/Tiles/Tiles";
import { PopularItems } from "@/Components/PopularItems/PopularItems";
import { Header } from "@/Components/Header/Header";
import { HeaderSlider } from "@/Components/HeaderSlider/HeaderSlider";
import { SwiperList } from "@/Components/Swiper/Swiper";
import { UnderSwiperCards } from "@/Components/UnderSwiperCards/UnderSwiperCards";

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

const Home = () => {
  const navigate = useRouter();
  const [selectedRoute, setSelectedRoute] = useAtom(selectedRouteAtom);

  const [isHeaderMenuVisible, setIsHeaderMenuVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [sliderData, dispatch] = useReducer(reducer, {});

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
    setSelectedRoute(category);
    navigate.push(`/category/${category}`);
  };

  const handleMainMenu = () => {
    navigate.push("/");
  };

  useEffect(() => {
    if (selectedRoute) {
      navigate.push(selectedRoute);
    }
  }, [selectedRoute]);

  return (
    <>
      <Header
        mouseEnter={handleMouseEnter}
        handleMouseClick={(event) => handleRouteCategory(event)}
        handleMainMenuRoute={handleMainMenu}
      />
      {isHeaderMenuVisible && (
        <HeaderSlider
          contentType={sliderData}
          handleMouseLeave={handleMouseLeave}
          isContentVisible={isContentVisible}
          handleIsContentVisible={handleMouseLeave}
        />
      )}
      <SwiperList />
      <UnderSwiperCards />
      <PopularItems />
      <Tiles />
      <UnderTilesLogos />
      <Catalog />
      <InputFileComponent />
      <Footer />
    </>
  );
};

export default Home;

"use client";
import { useEffect, useReducer, useState } from "react";
import { Header } from "../Header/Header";
import { HeaderSlider } from "../HeaderSlider/HeaderSlider";
import { ContentType } from "@/Types/SliderContentType";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { selectedRouteAtom } from "@/Store/RouteStore";
import { animateScroll as scroll } from "react-scroll";
import { Drawer } from "antd";
import { Map, YMaps } from "@pbe/react-yandex-maps";

import styles from "./HeaderComponentPack.module.scss";

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

export const HeaderComponentPack = () => {
  const navigate = useRouter();
  const [selectedRoute, setSelectedRoute] = useAtom(selectedRouteAtom);

  const [isHeaderMenuVisible, setIsHeaderMenuVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [sliderData, dispatch] = useReducer(reducer, {});

  const [open, setOpen] = useState(false);
  const [childDrawer, setChildDrawer] = useState(false);

  const testData = [
    {
      image: "/images/Devices/Ipad.png",
      name: "Watch 6 44mm",
      count: 2,
      price: "15 990",
      article: "364454479217",
    },
    {
      image: "/images/Devices/iphone.png",
      name: "Iphone 16 Pro Max 512 gb",
      count: 1,
      color: "quantaBlack",
      memory: "512gb",
      price: "164 990",
      article: "364849592901",
    },
  ];

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

  const handleShopBag = () => {
    setOpen((previousState) => !previousState);
  };

  const handleChildrenDrawer = () => {
    setChildDrawer((previous) => !previous);
  };

  useEffect(() => {
    if (selectedRoute) {
      navigate.push(selectedRoute);
    }
  }, [selectedRoute]);

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
      <Drawer onClose={handleShopBag} open={open} closable={false} width={700}>
        <div className={styles["drawer-items-block"]}>
          <header>
            <h3>Ваш заказ</h3>
            <i className="fa-regular fa-xmark fa-2xl" />
          </header>
          <hr />
          <main>
            {testData.map((el, index) => (
              <div key={index} className={styles["item-block"]}>
                <img src={el.image} alt="" width={60} />
                <div className={styles["item-block-info"]}>
                  {Object.entries(el).map(([k, v]) => {
                    if (!["price", "image", "count"].includes(k)) {
                      if (k === "name") {
                        return <strong key={k}>{v}</strong>;
                      }
                      return (
                        <div key={k}>
                          {k}: {v}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className={styles["item-block-count"]}>
                  <i className="fa-solid fa-minus" />
                  <span>{el.count}</span>
                  <i className="fa-solid fa-plus" />
                </div>
                <span className={styles["item-block-price"]}>{el.price} ₽</span>
                <div className={styles["item-block-decline"]}>
                  <i className="fa-regular fa-trash fa-lg" />
                </div>
              </div>
            ))}
          </main>
          <footer>
            <strong>Сумма: 18 480 ₽</strong>
            <button onClick={handleChildrenDrawer}>Оформить заказ</button>
          </footer>
        </div>
        <Drawer
          width="100%"
          open={childDrawer}
          onClose={handleChildrenDrawer}
          title="Ваш заказ"
        >
          <YMaps>
            <div className={styles["submit-shopping-block"]}>
              <div>
                <div>
                  <input type="text" />
                  <input type="tel" />
                </div>
                <div>
                  <strong>Доставка</strong>
                  <div>
                    <span>Город</span>
                    <input type="text" placeholder="Введите город" />
                    <label></label>
                  </div>
                  <input type="radio" />
                  <div>
                    <span>Пункт получения</span>
                    <input type="text" placeholder="Выберите пункт получения" />
                  </div>
                  <Map
                    defaultState={{ center: [45.018244, 38.965192], zoom: 17 }}
                    width="100%"
                    height="360px"
                    onLoad={(ymaps) => {
                      console.log(ymaps);
                    }}
                  ></Map>
                  <div>
                    <span>Получатель (ФИО полностью)</span>
                    <input type="text" placeholder="Иванов Иван Иванович" />
                  </div>
                  <div>
                    <span>Комментарий</span>
                    <input type="text" placeholder="Комментарий к заказу" />
                  </div>
                  <div>
                    <span>Способ оплаты</span>
                    <input type="radio" />
                    <input type="radio" />
                  </div>
                  <button>Оформить заказ</button>
                </div>
              </div>
              <div className={styles["drawer-items-block"]}>
                <main>
                  {testData.map((el, index) => (
                    <div key={index} className={styles["item-block"]}>
                      <img src={el.image} alt="" width={60} />
                      <div className={styles["item-block-info"]}>
                        {Object.entries(el).map(([k, v]) => {
                          if (!["price", "image", "count"].includes(k)) {
                            if (k === "name") {
                              return <strong key={k}>{v}</strong>;
                            }
                            return (
                              <div key={k}>
                                {k}: {v}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                      <div className={styles["item-block-count"]}>
                        <i className="fa-solid fa-minus" />
                        <span>{el.count}</span>
                        <i className="fa-solid fa-plus" />
                      </div>
                      <span className={styles["item-block-price"]}>
                        {el.price} ₽
                      </span>
                      <div className={styles["item-block-decline"]}>
                        <i className="fa-regular fa-trash fa-lg" />
                      </div>
                    </div>
                  ))}
                  <strong>Сумма: 18 480 ₽</strong>
                </main>
              </div>
            </div>
          </YMaps>
        </Drawer>
      </Drawer>
    </>
  );
};

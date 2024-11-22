import { Drawer, Input, Radio, Space, RadioChangeEvent, ConfigProvider } from "antd";
import styles from "./ShopBucket.module.scss"
import { ChangeEvent, FC, useCallback, useState } from "react";
import { Map, YMaps } from "@pbe/react-yandex-maps";

type ShopBucketType = {
  data?: DataType[],
  handleShopBag: () => void,
  open: boolean,
}

type DataType = {
  image: string;
  name: string;
  count: number;
  price: string;
  article: string;
  color?: undefined;
  memory?: undefined;
} | {
  image: string;
  name: string;
  count: number;
  color: string;
  memory: string;
  price: string;
  article: string;
}

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

export const ShopBucket: FC<ShopBucketType> = ({
  data = testData,
  open,
  handleShopBag
}) => {
  const [childDrawer, setChildDrawer] = useState(false);
  const [paymentValue, setPaymentValue] = useState("cash");

  const handlePayment = (e: RadioChangeEvent) => {
    setPaymentValue(e.target.value)
  }

  const handleChildrenDrawer = () => {
    setChildDrawer((previous) => !previous);
  };

  const debounce = <T extends string[]>(func: (...args: T) => void | Promise<void>, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: T) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };


  const fetchSuggestions = async (searchTerm: string) => {
    const response = await fetch(`https://suggest-maps.yandex.ru/v1/suggest?apikey=8ab2e2a3-2ca6-491b-8ef3-5687f909f24c&text=${searchTerm}`);
    const data = await response.json();
    console.log(data);
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedFetchSuggestions(event.target.value);
  };

  return (
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
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#87a08b', // Установите ваш цвет
                },
              }}
            >
              <div className={styles["submit-shopping-block"]}>
                <div className={styles["submit-shopping-block-data"]}>
                  <div className={styles["submit-shopping-block-data-user-info"]}>
                    <strong>Контактная информация</strong>
                    <div className={styles["submit-shopping-block-data-user-info-telname"]}>
                      <Input type="text" placeholder="Ваше имя*"/>
                      <Input type="tel" placeholder="+7 (999) 999-99-99"/>
                    </div>
                    <Input type="email" placeholder="Ваша электронная почта"/>
                  </div>
                  <div className={styles["submit-shopping-block-data-delivery"]}>
                    <strong>Доставка</strong>
                    <div>
                      <Input type="text" placeholder="Введите город" onChange={handleChange}/>
                      <label></label>
                    </div>
                    <Radio />
                    <div>
                      <Input type="text" placeholder="Выберите пункт получения" />
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
                      <Input type="text" placeholder="Получатель: Иванов Иван Иванович" />
                    </div>
                    <div>
                      <Input type="text" placeholder="Комментарий к заказу" />
                    </div>
                  </div>
                  <div className={styles["submit-shopping-block-data-payment-choose"]}>
                    <span>Способ оплаты</span>
                    <Radio.Group onChange={handlePayment} value={paymentValue}>
                      <Space direction="vertical">
                        <Radio value={"cash"}>Наличными при получении </Radio>
                        <Radio value={"card"}>Qr-кодом при получении (+5% к стоимости) </Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                  <button>Оформить заказ</button>
                </div>
                <div className={styles["drawer-items-block"]}>
                  <main>
                    {data.map((el, index) => (
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
            </ConfigProvider>
          </YMaps>
        </Drawer>
      </Drawer>
  )
}
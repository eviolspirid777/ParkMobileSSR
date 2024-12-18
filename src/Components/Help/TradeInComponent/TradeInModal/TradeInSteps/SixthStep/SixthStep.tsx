import { ConfigProvider, Radio, RadioChangeEvent } from "antd";

import styles from "./SixthStep.module.scss";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";

export const SixthStep = () => {
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom);

  const handleChange = (value: RadioChangeEvent) => {
    setTradeInStore((prevValues) => ({
      ...prevValues,
      condition: value.target.value,
    }));
  };

  return (
    <div className={styles["sixth-step-block"]}>
      <h3>Какое состояние у вашего устройства?</h3>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#87a08b",
          },
        }}
      >
        <Radio.Group
          className={styles["sixth-step-block-radio-group"]}
          size="large" 
          onChange={handleChange}
          defaultValue={tradeInStore?.condition && tradeInStore?.condition}
        >
          <Radio value={"best"} style={{fontSize: "1rem"}}>
            1. Безупречное. Безупречный внешний вид без видимых царапин. На экране
            нет дефектных пикселей (например, фантомное касание, выгорание экрана,
            битые пиксели), и сенсорный экран работает.
          </Radio>
          <Radio value={"good"} style={{fontSize: "1rem"}}>
            2. Хорошее. Несколько слабых следов износа, незаметных с расстояния 8
            дюймов. Без трещин и вмятин. На экране нет дефектных пикселей
            (например, призрачное касание, выгорание экрана, битые пиксели), и
            сенсорный экран работает.
          </Radio>
          <Radio value={"bad"} style={{fontSize: "1rem"}}>
            3. Изношенное. Видимые признаки износа, в том числе глубокие царапины
            и/или вмятины на внешней стороне устройства, не влияющие на его
            функциональность. Нет трещин. На экране нет дефектных пикселей
            (например, фантомное касание, выгорание экрана, битые пиксели), и
            сенсорный экран работает.
          </Radio>
          <Radio value={"worst"} style={{fontSize: "1rem"}}>
            4. Плохое. Имеет одну или несколько трещин и может быть или не быть на
            100% функциональным. Обратите внимание, что экран, который работает на
            100%, не имеет дефектных пикселей (например, призрачное касание,
            выгорание экрана, битые пиксели), и сенсорный экран работает.
          </Radio>
        </Radio.Group>
      </ConfigProvider>
    </div>
  );
};

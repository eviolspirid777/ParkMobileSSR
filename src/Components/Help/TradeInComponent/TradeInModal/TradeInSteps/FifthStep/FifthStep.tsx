import { ConfigProvider, Radio, RadioChangeEvent } from "antd";

import styles from "./FifthStep.module.scss";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";

export const FifthStep = () => {
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom);

  const handleChange = (value: RadioChangeEvent) => {
    setTradeInStore((prevValues) => ({
      ...prevValues,
      reset: value.target.value,
    }));
  };

  return (
    <div className={styles["fifth-step-block"]}>
      <h3>Отвязан iCloud, снят пароль, сброшен до заводских настроек?</h3>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#87a08b",
          },
        }}
      >
        <Radio.Group
          className={styles["fifth-step-block-radio-group"]}
          size="large"
          onChange={handleChange}
          defaultValue={tradeInStore?.reset && tradeInStore?.reset}
        >
          <Radio value={"reset"} style={{fontSize: "1rem"}}>Да</Radio>
          <Radio value={"not-reset"} style={{fontSize: "1rem"}}>Нет</Radio>
        </Radio.Group>
      </ConfigProvider>
    </div>
  );
};

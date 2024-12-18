import { ConfigProvider, Radio, RadioChangeEvent } from "antd";
import styles from "./ForthStep.module.scss";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";

export const ForthStep = () => {
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom);

  const handleChange = (value: RadioChangeEvent) => {
    setTradeInStore((prevValues) => ({
      ...prevValues,
      original: value.target.value,
    }));
  };

  return (
    <div className={styles["forth-step-block"]}>
      <h3>Устройство оригинальное, не восстановленное?</h3>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#87a08b",
          },
        }}
      >
        <Radio.Group
          className={styles["forth-step-block-radio-group"]}
          size="large"
          onChange={handleChange}
          defaultValue={tradeInStore?.original && tradeInStore.original}
        >
          <Radio value={"original"} style={{fontSize: "1rem"}}>Да, устройство оригинальное</Radio>
          <Radio value={"not-original"} style={{fontSize: "1rem"}}>Нет, устройство восстановленное</Radio>
        </Radio.Group>
      </ConfigProvider>
    </div>
  );
};

import { Radio, RadioChangeEvent } from "antd";
import styles from "./ForthStep.module.scss";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";

export const ForthStep = () => {
  const [, setTradeInStore] = useAtom(tradeInAtom);

  const handleChange = (value: RadioChangeEvent) => {
    setTradeInStore((prevValues) => ({
      ...prevValues,
      original: value.target.value,
    }));
  };

  return (
    <div className={styles["forth-step-block"]}>
      <h3>Устройство оригинальное, не восстановленное?</h3>
      <Radio.Group onChange={handleChange}>
        <Radio value={"original"}>Да, устройство оригинальное</Radio>
        <Radio value={"not-original"}>Нет, устройство восстановленное</Radio>
      </Radio.Group>
    </div>
  );
};

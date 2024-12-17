import { Radio, RadioChangeEvent } from "antd";

import styles from "./FifthStep.module.scss";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";

export const FifthStep = () => {
  const [, setTradeInStore] = useAtom(tradeInAtom);

  const handleChange = (value: RadioChangeEvent) => {
    setTradeInStore((prevValues) => ({
      ...prevValues,
      reset: value.target.value,
    }));
  };

  return (
    <div className={styles["fifth-step-block"]}>
      <h3>Отвязан iCloud, снят пароль, сброшен до заводских настроек?</h3>
      <Radio.Group onChange={handleChange}>
        <Radio value={"reset"}>Да</Radio>
        <Radio value={"not-reset"}>Нет</Radio>
      </Radio.Group>
    </div>
  );
};

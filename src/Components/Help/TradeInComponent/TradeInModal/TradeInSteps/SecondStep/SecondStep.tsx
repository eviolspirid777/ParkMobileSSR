import { ChangeEvent } from "react";
import styles from "./SecondStep.module.scss";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";

export const SecondStep = () => {
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTradeInStore(prev => ({...prev, model: event.target.value}))
  }

  return (
    <div className={styles["second-step-block"]}>
      <h3>Укажите модель вашего устройства</h3>
      <input
        type="text"
        placeholder="Iphone 13 Pro Max 256GB"
        defaultValue={tradeInStore?.model && tradeInStore.model}
        onChange={handleInputChange}
      />
    </div>
  );
};

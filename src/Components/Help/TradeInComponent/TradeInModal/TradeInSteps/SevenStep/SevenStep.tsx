import { useAtom } from "jotai";
import styles from "./SevenStep.module.scss";
import { tradeInAtom } from "@/Store/TradeInStore";

export const SevenStep = () => {
  const [, setTradeInStore] = useAtom(tradeInAtom);

  const handleSelectItem = (itemTag: string, key: "username" | "telephone") => {
    setTradeInStore((prev) => ({ ...prev, [key]: itemTag }));
  };

  return (
    <div className={styles["seven-step-block"]}>
      <h3>Ваше имя*</h3>
      <input
        type="text"
        onChange={(event) => handleSelectItem(event.target.value, "username")}
      />
      <h3>Ваш номер телефона*</h3>
      <input
        type="text"
        placeholder="+7 (999) 999-99-99"
        onChange={(event) => handleSelectItem(event.target.value, "telephone")}
      />
    </div>
  );
};

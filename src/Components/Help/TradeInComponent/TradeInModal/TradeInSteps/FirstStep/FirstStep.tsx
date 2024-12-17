import { useState } from "react";
import styles from "./FirstStep.module.scss";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";

const devices = [
  {
    image: "/images/Devices/iphone.png",
    tag: "iPhone",
  },
  {
    image: "/images/Devices/Ipad.png",
    tag: "iPad",
  },
  {
    image: "/images/Devices/MacBook.png",
    tag: "Mac",
  },
  {
    image: "/images/Devices/AirPods.png",
    tag: "AirPods",
  },
  {
    image: "/images/Devices/watch.png",
    tag: "Apple Watch",
  },
];

export const FirstStep = () => {
  const [selected, setSelected] = useState("");

  const [, setTradeInStore] = useAtom(tradeInAtom);

  const handleSelectItem = (itemTag: string) => {
    setSelected(itemTag);
    setTradeInStore((prev) => ({ ...prev, deviceType: itemTag }));
  };

  return (
    <div className={styles["first-step-block"]}>
      <h3>Выберите устройство, которое планируете сдать в Trade-in</h3>
      <div className={styles["first-step-block-content"]}>
        {devices.map((el) => (
          <div key={el.tag} onClick={handleSelectItem.bind(this, el.tag)}>
            <img src={el.image} alt="" />
            <span className={el.tag === selected ? styles["selected"] : ""}>
              {el.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

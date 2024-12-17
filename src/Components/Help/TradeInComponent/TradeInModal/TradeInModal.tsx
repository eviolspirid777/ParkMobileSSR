"use client";
import { Modal, StepProps, Steps } from "antd";
import { FC, useState } from "react";

import styles from "./TradeInModal.module.scss";
import { FirstStep } from "./TradeInSteps/FirstStep/FirstStep";
import { SecondStep } from "./TradeInSteps/SecondStep/SecondStep";
import { ThirdStep } from "./TradeInSteps/ThirdStep/ThirdStep";
import { ForthStep } from "./TradeInSteps/ForthStep/ForthStep";
import { FifthStep } from "./TradeInSteps/FifthStep/FifthStep";
import { SixthStep } from "./TradeInSteps/SixthStep/SixthStep";
import { SevenStep } from "./TradeInSteps/SevenStep/SevenStep";

type TradeInModalProps = {
  open: boolean;
  handleClose: () => void;
};

const stepsDictionary = new Map([
  [0, () => <FirstStep />],
  [1, () => <SecondStep />],
  [2, () => <ThirdStep />],
  [3, () => <ForthStep />],
  [4, () => <FifthStep />],
  [5, () => <SixthStep />],
  [6, () => <SevenStep />],
]);

export const TradeInModal: FC<TradeInModalProps> = ({ handleClose, open }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [items, setItems] = useState<StepProps[]>([
    {
      title: "Тип устройства",
      description: "",
    },
    {
      title: "Модель устройства",
      description: "",
    },
    {
      title: "Цвет устройства",
      description: "",
    },
    {
      title: "Ремонтировался?",
      description: "",
    },
    {
      title: "Сброшены настройки?",
      description: "",
    },
    {
      title: "Состояние устройства",
      description: "",
    },
    {
      title: "Контактная информация",
      description: "",
    },
  ]);

  const handleChangeStep = (state: "next" | "previous") => {
    if (currentStep === 0 && state === "previous") {
      handleClose();
      return;
    }
    if (currentStep === 6 && state === "next") {
      console.log("YES!");
      handleClose();
      return;
    }

    setItems((prev) => {
      return prev.map((el, index, array) => {
        if (index === currentStep) {
          switch (state) {
            case "next": {
              el.status = "finish";
              array[index + 1].status = "process";
              break;
            }
            case "previous": {
              el.status = "wait";
              array[index - 1].status = "process";
              break;
            }
          }
        }
        return el;
      });
    });
    setCurrentStep((previousState) => {
      return state === "next" ? previousState + 1 : previousState - 1;
    });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      onCancel={handleClose}
      closable={false}
      width="100%"
      centered={true}
      footer={null}
    >
      <div className={styles["trade-in-modal-content"]}>
        <div className={styles["steps"]}>
          <Steps items={items} />
        </div>
        <div className={styles["content"]}>
          {stepsDictionary.get(currentStep)!()}
        </div>
        <div className={styles["button-block"]}>
          <button onClick={handleChangeStep.bind(this, "previous")}>
            <i className="fa-thin fa-arrow-left" />
            &nbsp; Назад
          </button>
          <button onClick={handleChangeStep.bind(this, "next")}>
            Далее &nbsp;
            <i className="fa-thin fa-arrow-right" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

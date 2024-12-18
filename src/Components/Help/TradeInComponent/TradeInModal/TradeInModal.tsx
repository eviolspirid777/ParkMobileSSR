"use client";
import { ConfigProvider, Modal, StepProps, Steps } from "antd";
import { FC, useState } from "react";

import styles from "./TradeInModal.module.scss";
import { FirstStep } from "./TradeInSteps/FirstStep/FirstStep";
import { SecondStep } from "./TradeInSteps/SecondStep/SecondStep";
import { ThirdStep } from "./TradeInSteps/ThirdStep/ThirdStep";
import { ForthStep } from "./TradeInSteps/ForthStep/ForthStep";
import { FifthStep } from "./TradeInSteps/FifthStep/FifthStep";
import { SixthStep } from "./TradeInSteps/SixthStep/SixthStep";
import { SevenStep } from "./TradeInSteps/SevenStep/SevenStep";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";
import { useAddTradeInRequest } from "@/hooks/useAddTradeInRequest";

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

/*
Я хочу, чтобы при срабатывании условия currentStep === 0 && state === "previous" у меня выводился alert от antd, который бы спрашивал "Вы действительно хотите выйти?" и если пользователь отвечал "Да" - выполнял бы действие handleClose(); "use client"; import { Modal, StepProps, Steps } from "antd"; import { FC, useState } from "react"; import styles from "./TradeInModal.module.scss"; import { FirstStep } from "./TradeInSteps/FirstStep/FirstStep"; import { SecondStep } from "./TradeInSteps/SecondStep/SecondStep"; import { ThirdStep } from "./TradeInSteps/ThirdStep/ThirdStep"; import { ForthStep } from "./TradeInSteps/ForthStep/ForthStep"; import { FifthStep } from "./TradeInSteps/FifthStep/FifthStep"; import { SixthStep } from "./TradeInSteps/SixthStep/SixthStep"; import { SevenStep } from "./TradeInSteps/SevenStep/SevenStep"; type TradeInModalProps = { open: boolean; handleClose: () => void; }; const stepsDictionary = new Map([ [0, () => <FirstStep />], [1, () => <SecondStep />], [2, () => <ThirdStep />], [3, () => <ForthStep />], [4, () => <FifthStep />], [5, () => <SixthStep />], [6, () => <SevenStep />], ]); export const TradeInModal: FC<TradeInModalProps> = ({ handleClose, open }) => { const [currentStep, setCurrentStep] = useState(0); const [items, setItems] = useState<StepProps[]>([ { title: "Тип устройства", description: "", }, { title: "Модель устройства", description: "", }, { title: "Цвет устройства", description: "", }, { title: "Ремонтировался?", description: "", }, { title: "Сброшены настройки?", description: "", }, { title: "Состояние устройства", description: "", }, { title: "Контактная информация", description: "", }, ]); const handleChangeStep = (state: "next" | "previous") => { if (currentStep === 0 && state === "previous") { alert handleClose(); return; } if (currentStep === 6 && state === "next") { console.log("YES!"); handleClose(); return; } setItems((prev) => { return prev.map((el, index, array) => { if (index === currentStep) { switch (state) { case "next": { el.status = "finish"; array[index + 1].status = "process"; break; } case "previous": { el.status = "wait"; array[index - 1].status = "process"; break; } } } return el; }); }); setCurrentStep((previousState) => { return state === "next" ? previousState + 1 : previousState - 1; }); }; return ( <Modal open={open} onClose={handleClose} onCancel={handleClose} closable={false} width="100%" centered={true} footer={null} > <div className={styles["trade-in-modal-content"]}> <div className={styles["steps"]}> <Steps items={items} /> </div> <div className={styles["content"]}> {stepsDictionary.get(currentStep)!()} </div> <div className={styles["button-block"]}> <button onClick={handleChangeStep.bind(this, "previous")}> <i className="fa-thin fa-arrow-left" /> &nbsp; {currentStep === 0 ? "Выйти" : "Назад"} </button> <button onClick={handleChangeStep.bind(this, "next")}> {currentStep === 6 ? "Отправить" : "Далее"} &nbsp; <i className="fa-thin fa-arrow-right" /> </button> </div> </div> </Modal> ); };
*/

export const TradeInModal: FC<TradeInModalProps> = ({ handleClose, open }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom)

  const {
    mutateAsync
  } = useAddTradeInRequest();

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
  
  const handleCloseModal = () => {
    setTradeInStore({})
    handleClose();
  }

  const handleChangeStep = async (state: "next" | "previous") => {
    if (currentStep === 0 && state === "previous") {
      if (!window.confirm("Вы действительно хотите выйти?")) {
        return;
      }
      handleCloseModal()
      return;
    }
    if (currentStep === 6 && state === "next") {
      if(tradeInStore) {
        await mutateAsync(tradeInStore);
      }
      handleCloseModal()
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

  const handleDisabled = () => {
    switch(currentStep) {
      case 0: {
        return !tradeInStore?.deviceType;
      } 
      case 1: {
        return !tradeInStore?.model;
      }
      case 2: {
        return !tradeInStore?.color;
      }
      case 3: {
        return !tradeInStore?.original;
      }
      case 4: {
        return !tradeInStore?.reset;
      }
      case 5: {
        return !tradeInStore?.condition;
      }
      case 6: {
        return !(tradeInStore?.telephone && tradeInStore?.username)
      }
      default: 
        return false;
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      onCancel={handleCloseModal}
      closable={false}
      width="100%"
      centered={true}
      footer={null}
    >
      <div className={styles["trade-in-modal-content"]}>
        <div className={styles["steps"]}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#87a08b",
            },
          }}
        >
          <Steps items={items} />
        </ConfigProvider>
        </div>
        <div className={styles["content"]}>
          {stepsDictionary.get(currentStep)!()}
        </div>
        <div className={styles["button-block"]}>
          <button onClick={handleChangeStep.bind(this, "previous")}>
            {
              currentStep === 0 ? <><span>Выйти</span></> : <><i className="fa-thin fa-arrow-left"/>&nbsp; <span>Назад</span></>
            }
          </button>
          <button
            className={styles["next-step-button"]}
            disabled={handleDisabled()}
            onClick={handleChangeStep.bind(this, "next")}
          >
            {
              currentStep === 6 ? <><span>Отправить</span></> : <><span>Далее</span> &nbsp;<i className="fa-thin fa-arrow-right"/></>
            }
          </button>
        </div>
      </div>
    </Modal>
  );
};

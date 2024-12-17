import styles from "./SecondStep.module.scss";

export const SecondStep = () => {
  return (
    <div className={styles["second-step-block"]}>
      <h3>Укажите модель вашего устройства</h3>
      <input type="text" placeholder="Iphone 13 Pro Max 256GB" />
    </div>
  );
};

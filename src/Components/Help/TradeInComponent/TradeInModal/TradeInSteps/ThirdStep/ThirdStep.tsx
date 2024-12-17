import styles from "./ThirdStep.module.scss";

export const ThirdStep = () => {
  return (
    <div className={styles["second-step-block"]}>
      <h3>Укажите цвет</h3>
      <input type="text" placeholder="Black" />
    </div>
  );
};

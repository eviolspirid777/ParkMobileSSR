import styles from "./LoadingComponent.module.scss";

export const LoadingComponent = () => {
  return (
    <div className={styles["loading-component"]}>
      <img
        className={styles["logo-fade-animation"]}
        src="images/Logo/Logo.png"
        width={700}
        alt="Загрузка"
      />
    </div>
  );
};

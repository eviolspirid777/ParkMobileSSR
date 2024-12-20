"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Footer.module.scss";
import { TelegramIcon } from "./Telegram";
import { animateScroll as scroll } from "react-scroll";

export const Footer = () => {
  const pathName = usePathname();
  const naviagate = useRouter();

  const handlePath = (path: string) => {
    if (pathName === path) {
      return (() => scroll.scrollTo(0))();
    }
    naviagate.push(path);
  };

  return (
    <div className={styles["footer-block"]}>
      <div className={styles["footer-block-help"]}>
        <div className={styles["footer-block-help-items"]}>
          <h2>О компании</h2>
          <span onClick={handlePath.bind(this, "/about/contacts")}>
            Адреса магазинов
          </span>
          <span onClick={handlePath.bind(this, "/about/contacts")}>
            Контакты
          </span>
          <span onClick={handlePath.bind(this, "/about/contacts")}>
            Обратная связь
          </span>
        </div>
        <div className={styles["footer-block-help-items"]}>
          <h2>Помощь</h2>
          <span onClick={handlePath.bind(this, "/help/delivery")}>
            Доставка и оплата
          </span>
          <span onClick={handlePath.bind(this, "/help/gurantee")}>
            Гарантии и возврат
          </span>
          <span onClick={handlePath.bind(this, "/help/trade-in")}>
            Trade-in
          </span>
          <span onClick={handlePath.bind(this, "/help/credit")}>
            Рассрочка и кредит
          </span>
        </div>
        <div className={styles["footer-block-help-items"]}>
          <h2>Каталог</h2>
          <span>Mac</span>
          <span>iPhone</span>
          <span>Watch</span>
          <span>iPad</span>
          <span>Аксессуары</span>
          <span>Гаджеты</span>
        </div>
        <div className={styles["footer-block-help-items"]}>
          <h2>Подпишись</h2>
          <a
            href="https://www.instagram.com/parkmobile_"
            title="Запрещенная в РФ организация META"
          >
            Instagram*
          </a>
          <a href="https://vk.com/parkmobile">VK</a>
          <a href="https://t.me/parkmobile_krasnodar">Telegram</a>
        </div>
        <div
          className={styles["footer-block-help-items"]}
          style={{ width: "255px" }}
        >
          <div className={styles["footer-block-help-items-first-block"]}>
            <div
              className={
                styles["footer-block-help-items-first-block-number-address"]
              }
            >
              <h2>+7 928 817-34-75</h2>
              <div>
                <a href="https://yandex.ru/maps/-/CDxYZJo0">
                  с 11:00 до 20:00, без выходных г. Краснодар ул.Советская, 36
                </a>
              </div>
            </div>
            <a href="https://t.me/parkmobile_krasnodar">
              <TelegramIcon />
            </a>
          </div>
          <span className={styles["subscribe-text"]}>
            Подпишитесь на наш телеграмм канал, чтобы получать уведомления о
            наших лучших предложениях
          </span>
          <div className={styles["reqesits"]}>
            <img src={"/images/requisits/reqesits.png"} alt="" />
          </div>
        </div>
      </div>
      <hr />
      <div className={styles["footer-block-info"]}>
        <div className={styles["footer-data"]}>
          <span>
            ИП Безганс Эмиль Владимирович | ОГРНИП: 323237500114924 | ИНН:
            090108428776
          </span>
          <strong>
            Сеть магазинов электроники «Park Mobile». Указанные на сайте цены не
            являются публичной офертой (ст.435 ГК РФ)., 2012-2024
          </strong>
        </div>
        <span onClick={handlePath.bind(this, "/policy")}>
          Политика конфиденциальности
        </span>
      </div>
    </div>
  );
};

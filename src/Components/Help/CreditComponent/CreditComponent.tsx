import styles from "./CreditComponent.module.scss"
import Image from "next/image";

import HomeKredit from "./Images/HomeKredit.png";
import Renesans from "./Images/RenessanceCredit.png";
import MTSKredit from "./Images/MTS.png";
import OTPBank from "./Images/OTP_bank.png";
import PochtaBank from "./Images/PochtaBank.png";
import RusskiyStandart from "./Images/Russkiy_Standart.png";
import SovKomBank from "./Images/SovKomBank.png";
import TinkoffBank from "./Images/Tinkoff.png";

export const CreditComponent = () => {
  const imagesLogos = [
                        HomeKredit, Renesans, MTSKredit, OTPBank,
                        PochtaBank, RusskiyStandart, SovKomBank, TinkoffBank,
                      ]

  return (
    <div className={styles["credit-component-block"]}>
      <div className={styles["credit-component-block-conditions"]}>
        <h4>Рассрочка и кредит</h4>
        <div className={styles["credit-component-block-conditions-textblock"]}>
          <span>Мы понимаем, что покупка техники может быть значительным вложением, поэтому мы предлагаем гибкие условия оплаты, чтобы сделать процесс приобретения максимально удобным для наших клиентов. У нас вы можете воспользоваться услугами рассрочки и кредита. </span>
          <span>Мы сотрудничаем с ведущими банками и финансовыми учреждениями, чтобы предоставить вам возможность приобрести нужные вам товары уже сегодня, а оплатить их позже или в рассрочку.</span>
        </div>
      </div>
      <div className={styles["credit-component-block-requirments"]}>
        <h4>Оформление кредита или рассрочки</h4>
        <ul>
          <li>Вы являетесь Гражданином РФ в возрасте 18-80 лет;</li>
          <li>У Вас имеется постоянная регистрация по месту жительства на территории РФ;</li>
          <li>Вы официально трудоустроены или являетесь пенсионером по возрасту или выслуге лет;</li>
        </ul>
        <span>Не является публичной офертой. Уточняйте условия у наших менджеров*</span>
      </div>
      <div className={styles["credit-component-block-submit"]}>
        <h4>Процесс оформления</h4>
        {/* Тут степы нужно описать */}
      </div>
      <div className={styles["credit-component-block-partners"]}>
        <h4>Наши партнёры</h4>
        <div className={styles["credit-component-block-partners-grid-images"]}>
          {
            imagesLogos.map((el, key) => (
              <div key={key}>
                <Image src={el} alt="" width={190}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
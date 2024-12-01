import { Form, Input } from "antd";

import styles from "./KrasnodarDelivery.module.scss";

export const KrasnodarDelivery = () => {
  return (
    <>
      <Form.Item>
        <Input placeholder="Введите ФИО получателя" />
      </Form.Item>
      <Form.Item>
        <Input placeholder="Улица" />
      </Form.Item>
      <div className={styles["grid-template"]}>
        <Form.Item>
          <Input placeholder="Дом" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Подъезд" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Этаж" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Квартира/офис" />
        </Form.Item>
      </div>
      <Form.Item>
        <Input placeholder="Комментарий к заказу" />
      </Form.Item>
    </>
  );
};

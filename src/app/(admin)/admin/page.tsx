"use client";
import { Button, Form, Input } from "antd";
import styles from "./PageStyles.module.scss";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/api/ApiClient";
import { LoadingComponent } from "@/Components/LoadingComponent/LoadingComponent";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";

type LoginType = {
  userName: string;
  password: string;
};

const LoginPage = () => {
  const [form] = useForm();
  const navigate = useRouter();

  const {
    data: loginResponse,
    mutate: loginMutate,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: async (account: LoginType) => apiClient.Login(account),
  });

  if (isLoginSuccess && loginResponse.status !== 204) {
    form.resetFields();
    navigate.push("/admin/menu");
  }

  const handleFinish = (values: LoginType) => {
    loginMutate(values);
  };

  if (isLoginPending) {
    return (
      <div className={styles["loading-contanier"]}>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className={styles["login-container"]}>
      <h1>ParkMobile Admin Page</h1>
      <Form onFinish={handleFinish} form={form}>
        <Form.Item label="Логин" name="userName">
          <Input placeholder="Введите логин" />
        </Form.Item>
        <Form.Item label="Пароль" name="password">
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>
        <div className={styles["button-block"]}>
          <Form.Item>
            <Button type="link">Зарегестрироваться</Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Войти
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;

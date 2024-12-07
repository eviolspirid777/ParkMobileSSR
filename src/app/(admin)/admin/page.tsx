"use client";
import { Button, Form, Input, message } from "antd";
import styles from "./PageStyles.module.scss";
import { useMutation } from "@tanstack/react-query";
import { apiClient, AuthorizationType } from "@/api/ApiClient";
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

  const { mutateAsync: registerAsync, isPending: isRegisterPending } =
    useMutation({
      mutationFn: async (values: AuthorizationType) =>
        apiClient.Register(values),
    });

  if (isLoginSuccess && loginResponse.status !== 204) {
    form.resetFields();
    navigate.push("/admin/menu");
  }

  const handleFinish = (values: LoginType) => {
    loginMutate(values);
  };

  const handleRegisterAccount = () => {
    let values = form.getFieldsValue();
    registerAsync(values);
  };

  if (isLoginPending && isRegisterPending) {
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
        <Form.Item
          label="Логин"
          name="userName"
          rules={[{ required: true, message: "Введите логин!" }]}
        >
          <Input placeholder="Введите логин" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>
        <div className={styles["button-block"]}>
          <Form.Item>
            <Button type="link" onClick={handleRegisterAccount}>
              Зарегистрироваться
            </Button>
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

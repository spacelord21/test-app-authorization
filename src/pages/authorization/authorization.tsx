import {
  $number,
  $password,
  Form,
  References,
  RememberMe,
  setNumber,
  setPassword,
} from "@entities/auth";
import styles from "./authorization.module.scss";
import { useStore } from "effector-react";
import { Input, PrimaryButton } from "@shared/ui";

export const Authorization = () => {
  const number = useStore($number);
  const password = useStore($password);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Form
          button={
            <PrimaryButton content={"Авторизоваться"} onClick={() => {}} />
          }
          inputs={[
            <Input
              placeholder="Телефон"
              setValue={setNumber}
              type="text"
              value={number}
            />,
            <Input
              placeholder="Пароль"
              setValue={setPassword}
              type="password"
              value={password}
            />,
          ]}
          title="Авторизация"
          rememberMe={<RememberMe />}
          references={
            <References references={["Забыли пароль?", "Регистрация"]} />
          }
        />
      </div>
    </div>
  );
};

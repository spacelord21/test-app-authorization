import {
  $number,
  Form,
  PasswordInput,
  References,
  RememberMe,
  setNumber,
} from "@entities/auth";
import styles from "./authorization.module.scss";
import { useStore } from "effector-react";
import { Input, PrimaryButton } from "@shared/ui";

export const Authorization = () => {
  const number = useStore($number);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Form
          button={
            <PrimaryButton content={"Авторизоваться"} onClick={() => {}} />
          }
          inputs={[
            <Input
              placeholder="Номер"
              setValue={setNumber}
              value={number}
              type="text"
              isPhone={true}
            />,
            <PasswordInput />,
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

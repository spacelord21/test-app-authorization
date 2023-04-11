import { Form, PasswordInput, References } from "@entities/auth";
import { forgotEndFx, forgotStartFx } from "@entities/auth/model";
import { Input, PrimaryButton } from "@shared/ui";
import { useState } from "react";
import styles from "./code.module.scss";
import { useTimer } from "./hooks";
import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";

type TCodeFormProps = {
  phone: string;
};

export const CodeForm = ({ phone }: TCodeFormProps) => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { seconds, setSeconds } = useTimer();

  forgotStartFx.doneData.watch((payload) => {
    if (payload.success) {
      setSeconds(20);
    }
  });

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      createAlert({
        message: "Пароли не совпадают. Пожалуйста, попробуйте еще раз.",
        timeout: DEFAULT_ALERT_TIMEOUT,
        type: "ERROR",
      });
      return;
    }
    forgotEndFx({
      code: code,
      password: password,
      phone: phone,
    });
  };

  const inputs = [
    <Input
      placeholder="Код из СМС"
      setValue={setCode}
      type="text"
      value={code}
    />,
    <PasswordInput
      placeholder="Пароль"
      setPassword={setPassword}
      password={password}
    />,
    <PasswordInput
      placeholder="Повторите пароль"
      setPassword={setConfirmPassword}
      password={confirmPassword}
    />,
  ];

  return (
    <Form
      button={<PrimaryButton content="Восстановить" onClick={clickHandler} />}
      inputs={inputs}
      title="Восстановление"
      additional={[
        <button
          className={styles.timer}
          onClick={() => {
            forgotStartFx({ phone: phone });
          }}
          disabled={seconds !== 0}
        >
          {seconds !== 0
            ? `Повторно отправить код можно будет через ${seconds} секунд`
            : "Отправить код повторно"}
        </button>,
      ]}
      references={
        <References
          references={[
            { link: "/", title: "Вспомнил пароль!" },
            { link: "/registration", title: "Регистрация" },
          ]}
        />
      }
    />
  );
};

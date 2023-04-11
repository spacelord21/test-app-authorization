import { useState } from "react";
import styles from "./password.module.scss";
import { PasswordEye } from "@features/password-eye";
import { Event } from "effector";

type TPassInputProps = {
  password: string;
  setPassword: Event<string> | ((value: string) => void);
  placeholder?: string;
  label?: string;
};

export const PasswordInput = ({
  password,
  setPassword,
  placeholder,
  label,
}: TPassInputProps) => {
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const onCnahgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div className={styles.wrapperInput}>
      {label && password.length < 8 ? (
        <span className={styles.labelInput}>*{label}</span>
      ) : null}
      <div className={styles.container}>
        <input
          className={styles.input}
          type={passwordType}
          value={password}
          onChange={onCnahgeHandler}
          placeholder={placeholder ?? "Пароль"}
        />
        {password ? (
          <PasswordEye setType={setPasswordType} type={passwordType} />
        ) : null}
        <span className={styles.border}></span>
      </div>
    </div>
  );
};

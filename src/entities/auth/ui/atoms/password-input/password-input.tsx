import { useState } from "react";
import styles from "./password.module.scss";
import { useStore } from "effector-react";
import { $password, setPassword } from "@entities/auth/model/authorization";
import { PasswordEye } from "@features/password-eye";

export const PasswordInput = () => {
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const password = useStore($password);

  const onCnahgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <input
          className={styles.input}
          type={passwordType}
          value={password}
          onChange={onCnahgeHandler}
          placeholder="Пароль"
        />
        {password ? (
          <PasswordEye setType={setPasswordType} type={passwordType} />
        ) : null}
        <span className={styles.border}></span>
      </div>
    </div>
  );
};

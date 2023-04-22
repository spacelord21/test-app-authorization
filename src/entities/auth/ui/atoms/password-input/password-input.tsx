import { InputHTMLAttributes, useState } from "react";
import styles from "./password.module.scss";
import { PasswordEye } from "@features/password-eye";
import React from "react";

interface TPassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
}

export const PasswordInput = React.forwardRef(
  (
    { value, onChange, placeholder, label, name }: TPassInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [passwordType, setPasswordType] = useState<"password" | "text">(
      "password"
    );
    return (
      <div className={styles.wrapperInput}>
        {label && value!.length < 8 ? (
          <span className={styles.labelInput}>*{label}</span>
        ) : null}
        <div className={styles.container}>
          <input
            className={styles.input}
            type={passwordType}
            value={value}
            onChange={onChange}
            placeholder={placeholder ?? "Пароль"}
            name={name}
            ref={ref}
          />
          {value ? (
            <PasswordEye setType={setPasswordType} type={passwordType} />
          ) : null}
          <span className={styles.border}></span>
        </div>
      </div>
    );
  }
);

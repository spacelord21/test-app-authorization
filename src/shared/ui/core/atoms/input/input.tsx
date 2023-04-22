import styles from "./input.module.scss";
import InputMask from "react-input-mask";
import { FC, InputHTMLAttributes } from "react";
import React from "react";

interface TInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isPhone?: boolean;
  label?: string;
  value?: string;
}

export const Input = React.forwardRef(
  (
    { isPhone, label, value, ...props }: TInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const { onChange, name, placeholder, type } = props;

    return (
      <div className={styles.wrapperInput}>
        {label ? <span className={styles.labelInput}>*{label}</span> : null}
        {isPhone ? (
          <InputMask
            value={value}
            mask={"9 999 999 99 99"}
            className={styles.input}
            placeholder={placeholder}
            maskChar={" "}
            onChange={onChange}
            name={name}
            inputRef={ref}
          />
        ) : (
          <input
            name={name}
            className={styles.input}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            ref={ref}
          />
        )}
        <span className={styles.border}></span>
      </div>
    );
  }
);

import { Event } from "effector";
import styles from "./input.module.scss";
import InputMask from "react-input-mask";

type TInputProps = {
  type: "text" | "password";
  value: string;
  setValue: Event<string> | ((value: string) => void);
  placeholder: string;
  isPhone?: boolean;
  label?: string;
};

export const Input = ({
  setValue,
  type,
  value,
  placeholder,
  isPhone,
  label,
}: TInputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return (
    <div className={styles.wrapperInput}>
      {label ? <span className={styles.labelInput}>*{label}</span> : null}
      {isPhone ? (
        <InputMask
          value={value.trim()}
          mask={"9 999 999 99 99"}
          className={styles.input}
          placeholder={placeholder}
          maskChar={" "}
          onChange={onChangeHandler}
        />
      ) : (
        <input
          className={styles.input}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
      )}
      <span className={styles.border}></span>
    </div>
  );
};

import { Event } from "effector";
import styles from "./input.module.scss";
import InputMask from "react-input-mask";

type TInputProps = {
  type: "text" | "password";
  value: string;
  setValue: Event<string> | ((value: string) => void);
  placeholder: string;
  isPhone?: boolean;
};

export const Input = ({
  setValue,
  type,
  value,
  placeholder,
  isPhone,
}: TInputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return (
    <div className={styles.wrapper}>
      {isPhone ? (
        <InputMask
          value={value}
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

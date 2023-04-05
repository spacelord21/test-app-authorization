import { Event } from "effector";
import styles from "./input.module.scss";

type TInputProps = {
  type: string;
  value: string;
  setValue: Event<string>;
  placeholder: string;
};

export const Input = ({ setValue, type, value, placeholder }: TInputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
      <span className={styles.border}></span>
    </div>
  );
};

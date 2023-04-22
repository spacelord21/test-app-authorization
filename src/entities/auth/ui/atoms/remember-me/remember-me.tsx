import styles from "./remember.module.scss";
import { InputHTMLAttributes } from "react";

interface TRememberMeProps extends InputHTMLAttributes<HTMLInputElement> {}

export const RememberMe = ({ onChange }: TRememberMeProps) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={onChange}
        />
        <span className={styles.fakeCheckbox}></span>
        Запомнить меня
      </label>
    </div>
  );
};

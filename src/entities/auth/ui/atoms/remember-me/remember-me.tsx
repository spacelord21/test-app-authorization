import { useStore } from "effector-react";
import styles from "./remember.module.scss";
import { $rememberMe } from "@entities/auth/model/authorization";

export const RememberMe = () => {
  const rememberMe = useStore($rememberMe);
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input type="checkbox" className={styles.checkbox} />
        <span className={styles.fakeCheckbox}></span>
        Запомнить меня
      </label>
    </div>
  );
};

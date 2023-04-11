import styles from "./password-recovery.module.scss";
import { FormTemplate } from "./ui";

export const PasswordRecovery = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <FormTemplate />
        </div>
      </div>
    </div>
  );
};

import { useEffect } from "react";
import styles from "./password-recovery.module.scss";
import { FormTemplate } from "./ui";
import { useAppDispatch } from "@app/store";
import { clearProgress } from "@entities/auth/model";

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearProgress());
  }, []);

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

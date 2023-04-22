import styles from "./registration.module.scss";
import { ChooseAvatar, FormTemplate } from "./ui";
import { registState } from "@entities/auth/model/registration";

export const Registration = () => {
  const { success } = registState();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          {success ? <ChooseAvatar /> : <FormTemplate />}
        </div>
      </div>
    </div>
  );
};

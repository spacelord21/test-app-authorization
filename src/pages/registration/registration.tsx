import { useState } from "react";
import styles from "./registration.module.scss";
import { ChooseAvatar, FormTemplate } from "./ui";
import { sendRegistFx } from "@entities/auth/model/registration";

export const Registration = () => {
  const [success, setSuccess] = useState(false);

  sendRegistFx.doneData.watch((payload) => {
    if (payload.success) {
      setSuccess(true);
    }
  });

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

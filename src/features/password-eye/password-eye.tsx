import { Icon } from "@iconify/react";
import styles from "./password.module.scss";

type TPasswordEyeProps = {
  type: "password" | "text";
  setType: (value: "password" | "text") => void;
};

export const PasswordEye = ({ type, setType }: TPasswordEyeProps) => {
  return type === "password" ? (
    <Icon
      icon={"el:eye-close"}
      className={styles.icon}
      onClick={() => setType("text")}
    />
  ) : (
    <Icon
      icon={"el:eye-open"}
      className={styles.icon}
      onClick={() => setType("password")}
    />
  );
};

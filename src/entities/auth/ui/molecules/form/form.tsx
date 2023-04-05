import { ReactNode } from "react";
import styles from "./form.module.scss";

type TFormProps = {
  title: string;
  inputs: ReactNode[];
  button: ReactNode;
  rememberMe?: ReactNode;
  references?: ReactNode;
};

export const Form = ({
  button,
  inputs,
  title,
  references,
  rememberMe,
}: TFormProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      {inputs.map((item, index) => (
        <div className={styles.inputWrapper} key={index}>
          {item}
        </div>
      ))}
      {rememberMe}
      {button}
      {references}
    </div>
  );
};

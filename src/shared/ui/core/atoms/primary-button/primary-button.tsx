import { ReactNode } from "react";
import styles from "./button.module.scss";

type TPrimaryButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  content: string | ReactNode;
};

export const PrimaryButton = ({ content, onClick }: TPrimaryButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={onClick} type="button" className={styles.button}>
        {content}
      </button>
    </div>
  );
};

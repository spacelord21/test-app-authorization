import { ReactNode } from "react";
import styles from "./button.module.scss";

type TPrimaryButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  content: string | ReactNode;
  disabled?: boolean;
};

export const PrimaryButton = ({
  content,
  onClick,
  disabled,
}: TPrimaryButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <button
        onClick={onClick}
        type="button"
        className={styles.button}
        disabled={disabled}
      >
        {content}
      </button>
    </div>
  );
};

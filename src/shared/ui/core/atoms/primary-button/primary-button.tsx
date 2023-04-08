import { ReactNode, RefObject } from "react";
import styles from "./button.module.scss";

type TPrimaryButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  content: string | ReactNode;
  disabled?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const PrimaryButton = ({
  content,
  onClick,
  disabled,
  onMouseEnter,
  onMouseLeave,
}: TPrimaryButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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

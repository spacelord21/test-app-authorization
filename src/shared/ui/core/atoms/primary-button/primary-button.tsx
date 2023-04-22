import { ReactNode } from "react";
import styles from "./button.module.scss";
import { Loader } from "../loader";

type TPrimaryButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  content: string | ReactNode;
  disabled?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
};

export const PrimaryButton = ({
  content,
  onClick,
  disabled,
  onMouseEnter,
  onMouseLeave,
  loading,
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
        {loading ? <Loader color="white" /> : content}
      </button>
    </div>
  );
};

import { Loader } from "../loader";
import styles from "./fallback.module.scss";

export const Fallback = () => {
  return (
    <div className={styles.container}>
      <Loader width={50} height={50} color="#827ffe" />
    </div>
  );
};

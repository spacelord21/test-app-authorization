import { useNavigate } from "react-router";
import styles from "./references.module.scss";

type TReferencesProps = {
  references: {
    title: string;
    link: string;
  }[];
};

export const References = ({ references }: TReferencesProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      {references.map((item, index) => (
        <span
          className={styles.text}
          key={index}
          onClick={() => navigate(item.link)}
        >
          {item.title}
        </span>
      ))}
    </div>
  );
};

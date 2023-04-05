import styles from "./references.module.scss";

type TReferencesProps = {
  references: string[];
};

export const References = ({ references }: TReferencesProps) => {
  return (
    <div className={styles.wrapper}>
      {references.map((item, index) => (
        <span className={styles.text} key={index}>
          {item}
        </span>
      ))}
    </div>
  );
};

import { useState } from "react";
import styles from "./avatar.module.scss";
import { Icon } from "@iconify/react";

type TAvatarProps = {
  url: string;
  removeFile: () => void;
};

export const Avatar = ({ url, removeFile }: TAvatarProps) => {
  const [isHoverImage, setIsHoverImage] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHoverImage(true)}
      onMouseLeave={() => setIsHoverImage(false)}
    >
      <img src={url} className={styles.image} />
      <div
        onClick={() => removeFile()}
        className={isHoverImage ? styles.active : styles.inactive}
      >
        <Icon
          icon={"mdi:garbage-can-outline"}
          className={styles.icon}
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

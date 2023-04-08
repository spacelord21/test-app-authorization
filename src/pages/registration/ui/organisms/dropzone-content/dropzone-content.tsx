import { useState } from "react";
import styles from "./dropzone.module.scss";
import { Avatar } from "../../atoms";
import classNames from "classnames/bind";

type TDropzoneContent = {
  file: File;
  onChangeHandler: (file: File) => void;
  removeFile: () => void;
  isDropActive: boolean;
};

let cx = classNames.bind(styles);

export const DropzoneContent = ({
  onChangeHandler,
  file,
  removeFile,
  isDropActive,
}: TDropzoneContent) => {
  const makeImageUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  const className = isDropActive
    ? cx(styles.wrapper, styles.active)
    : cx(styles.wrapper, styles.inactive);

  const onFilesPut = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files && e.target.files.length > 0) {
      onChangeHandler(e.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      {file ? (
        <Avatar removeFile={removeFile} url={makeImageUrl(file)} />
      ) : (
        <div className={className}>
          <label htmlFor="file">
            Перетащите файлы, или выберите на компьютере
          </label>
          <input
            type="file"
            accept=".jpg,.png,.gif,.jpeg"
            id="file"
            onChange={onFilesPut}
            className={styles.input}
          />
        </div>
      )}
    </div>
  );
};

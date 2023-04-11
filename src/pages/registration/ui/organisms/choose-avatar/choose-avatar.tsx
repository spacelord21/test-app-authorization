import { PrimaryButton } from "@shared/ui";
import { Dropzone } from "../../molecules";
import styles from "./avatar.module.scss";
import { useDropzone } from "./hooks";
import { DropzoneContent } from "../dropzone-content/dropzone-content";
import { References } from "@entities/auth";
import { useNavigate } from "react-router";

export const ChooseAvatar = () => {
  const { file, onDragStateChange, onFilesDrop, removeFile, isDropActive } =
    useDropzone();
  const navigate = useNavigate();

  return (
    <div className={styles.avatarWrapper}>
      <span className={styles.title}>Загрузите свой аватар</span>
      <Dropzone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
        <DropzoneContent
          isDropActive={isDropActive}
          file={file!}
          onChangeHandler={onFilesDrop}
          removeFile={removeFile}
        />
      </Dropzone>
      <PrimaryButton
        content={"Загрузить"}
        onClick={() => {
          navigate("/");
        }}
      />
      <References references={[{ link: "/", title: "Пропустить" }]} />
    </div>
  );
};

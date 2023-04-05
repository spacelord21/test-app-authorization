import { useStore } from "effector-react";
import { $alert, createAlert, removeAlert } from "../model";
import styles from "./alert.module.scss";
import classNames from "classnames/bind";
import { Icon } from "@iconify/react";
import { useRef } from "react";

let cx = classNames.bind(styles);
let timeout: ReturnType<typeof setTimeout>;
let defaultTimeout = 1000;

export const Alert = () => {
  const alert = useStore($alert);
  const alertRef = useRef<HTMLDivElement>(null);
  let className = cx("alertActive", alert?.type.toLocaleLowerCase());

  const onCloseHandler = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (alertRef) {
      alertRef.current?.classList.add(styles.alertEmpty);
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      removeAlert();
    }, defaultTimeout);
  };

  return alert ? (
    <div className={className} ref={alertRef}>
      <span>{alert.message}</span>
      <div>
        <Icon
          icon={"material-symbols:close"}
          className={styles.close}
          onClick={onCloseHandler}
        />
      </div>
    </div>
  ) : null;
};

import styles from "./alert.module.scss";
import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { useStore } from "effector-react";
import { $alerts, removeAlert } from "../model";

let timeout: ReturnType<typeof setTimeout>;
let defaultTimeout = 500;

export const Alert = () => {
  const alertRef = useRef<HTMLDivElement>(null);
  const alerts = useStore($alerts);

  const className =
    alerts.length > 0
      ? alerts[0].type === "ERROR"
        ? styles.error
        : alerts[0].type === "SUCCESS"
        ? styles.success
        : styles.warning
      : "";

  const automaticallyClose = () => {
    if (alerts[0] && alertRef) {
      alertRef.current?.classList.remove(styles.alertEmpty);
      alertRef.current?.classList.add(styles.alertActive);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        alertRef.current?.classList.remove(styles.alertActive);
        alertRef.current?.classList.add(styles.alertEmpty);
      }, alerts[0].timeout - defaultTimeout);
    }
  };

  const onCloseHandler = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (alertRef) {
      alertRef.current?.classList.remove(styles.alertActive);
      alertRef.current?.classList.add(styles.alertEmpty);
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      removeAlert();
    }, defaultTimeout);
  };

  useEffect(() => {
    if (alerts) {
      automaticallyClose();
    }
  }, [alerts]);

  return alerts.length > 0 ? (
    <div ref={alertRef} className={className}>
      <span>{alerts[0].message}</span>
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

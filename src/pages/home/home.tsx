import { useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./home.module.scss";
import { getUser, logout } from "@entities/auth/model";
import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";
import { useAppDispatch } from "@app/store";

export const Home = () => {
  const navigate = useNavigate();
  const user = getUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.token) {
      createAlert({
        message: "Пожалуйста, авторизуйтесь!",
        timeout: DEFAULT_ALERT_TIMEOUT,
        type: "WARNING",
      });
      navigate("/login");
    }
  }, []);

  const exitHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <span className={styles.text}>Здравствуйте, {user.firstName}!</span>
      <span className={styles.text} onClick={exitHandler}>
        Выход
      </span>
    </div>
  );
};

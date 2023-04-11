import { $token, $user, clearSession, getUserInfoFx } from "@entities/auth";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./home.module.scss";

export const Home = () => {
  const user = useStore($user);
  const token = useStore($token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
    getUserInfoFx(token);
  }, []);

  const exitHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    clearSession();
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

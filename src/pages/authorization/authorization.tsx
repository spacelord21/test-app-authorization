import { $number, $password, setNumber, setPassword } from "@entities/auth";
import styles from "./authorization.module.scss";
import { useStore } from "effector-react";
import { Input } from "@shared/ui";

export const Authorization = () => {
  const number = useStore($number);
  const password = useStore($password);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Input
          placeholder="Phone"
          setValue={setNumber}
          type="text"
          value={number}
        />
        <Input
          placeholder="Password"
          setValue={setPassword}
          type={"password"}
          value={password}
        />
      </div>
    </div>
  );
};

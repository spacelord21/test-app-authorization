import {
  $number,
  $password,
  Form,
  PasswordInput,
  References,
  RememberMe,
  sendAuthData,
  sendAuthDataFx,
  setNumber,
  setPassword,
} from "@entities/auth";
import styles from "./authorization.module.scss";
import { useStore } from "effector-react";
import { Input, PrimaryButton } from "@shared/ui";
import { useNavigate } from "react-router";
import { $alerts } from "@entities/alert";

export const Authorization = () => {
  const number = useStore($number);
  const password = useStore($password);
  const isPending = useStore(sendAuthDataFx.pending);
  const navigate = useNavigate();
  const alerts = useStore($alerts);

  sendAuthDataFx.doneData.watch((payload) => {
    if (payload.success) {
      navigate("/personal-account");
    }
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendAuthData();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Form
          button={
            <PrimaryButton
              content={"Авторизоваться"}
              onClick={handleClick}
              disabled={isPending || alerts.length > 0}
            />
          }
          inputs={[
            <Input
              placeholder="Номер"
              setValue={setNumber}
              value={number}
              type="text"
              isPhone={true}
            />,
            <PasswordInput password={password} setPassword={setPassword} />,
          ]}
          title="Авторизация"
          rememberMe={<RememberMe />}
          references={
            <References
              references={[
                { title: "Забыли пароль?", link: "" },
                { link: "/registration", title: "Регистрация" },
              ]}
            />
          }
        />
      </div>
    </div>
  );
};

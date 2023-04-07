import {
  $number,
  Form,
  PasswordInput,
  References,
  RememberMe,
  sendAuthData,
  sendAuthDataFx,
  setNumber,
} from "@entities/auth";
import styles from "./authorization.module.scss";
import { useStore } from "effector-react";
import { Input, PrimaryButton } from "@shared/ui";
import { useNavigate } from "react-router";

export const Authorization = () => {
  const number = useStore($number);
  const isPending = useStore(sendAuthDataFx.pending);
  const navigate = useNavigate();

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
              disabled={isPending}
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
            <PasswordInput />,
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

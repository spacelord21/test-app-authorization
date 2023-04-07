import { Form, PasswordInput, References } from "@entities/auth";
import styles from "./registration.module.scss";
import { Input, PrimaryButton } from "@shared/ui";
import { useStore } from "effector-react";
import {
  $firstName,
  $lastName,
  $registNumber,
  $registPassword,
  sendRegist,
  sendRegistFx,
  setFirstName,
  setLastName,
  setNumber,
  setPassword,
} from "@entities/auth/model/registration";

export const Registration = () => {
  const isPending = useStore(sendRegistFx.pending);
  const password = useStore($registPassword);
  const number = useStore($registNumber);
  const firstName = useStore($firstName);
  const lastName = useStore($lastName);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendRegist();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Form
          button={
            <PrimaryButton
              content={"Зарегистрироваться"}
              onClick={onClickHandler}
              disabled={isPending}
            />
          }
          inputs={[
            <Input
              placeholder="Имя"
              setValue={setFirstName}
              type="text"
              value={firstName}
            />,
            <Input
              placeholder="Фамилия"
              setValue={setLastName}
              type="text"
              value={lastName}
            />,
            <Input
              placeholder="Номер"
              setValue={setNumber}
              value={number}
              type="text"
              isPhone={true}
            />,
            <PasswordInput password={password} setPassword={setPassword} />,
          ]}
          title="Регистрация"
          references={
            <References references={[{ link: "/", title: "Авторизация" }]} />
          }
        />
      </div>
    </div>
  );
};

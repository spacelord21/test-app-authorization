import {
  $number,
  Form,
  PasswordInput,
  References,
  setNumber,
} from "@entities/auth";
import styles from "./registration.module.scss";
import { Input, PrimaryButton } from "@shared/ui";
import { useStore } from "effector-react";
import {
  $firstName,
  $lastName,
  sendRegistFx,
  setFirstName,
  setLastName,
} from "@entities/auth/model/registration";

export const Registration = () => {
  const isPending = useStore(sendRegistFx.pending);
  const number = useStore($number);
  const firstName = useStore($firstName);
  const lastName = useStore($lastName);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Form
          button={
            <PrimaryButton
              content={"Зарегистрироваться"}
              onClick={() => {}}
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
            <PasswordInput />,
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

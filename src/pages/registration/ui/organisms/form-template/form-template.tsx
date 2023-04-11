import { $alerts } from "@entities/alert";
import { Form, PasswordInput, References } from "@entities/auth";
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
import { Input, PrimaryButton } from "@shared/ui";
import { useStore } from "effector-react";

export const FormTemplate = () => {
  const isPending = useStore(sendRegistFx.pending);
  const password = useStore($registPassword);
  const number = useStore($registNumber);
  const firstName = useStore($firstName);
  const lastName = useStore($lastName);
  const alerts = useStore($alerts);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendRegist();
  };

  const inputs = [
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
    <PasswordInput
      password={password}
      setPassword={setPassword}
      label="Минимальная длина пароля - 8 символов"
    />,
  ];

  return (
    <Form
      button={
        <PrimaryButton
          content={"Зарегистрироваться"}
          onClick={onClickHandler}
          disabled={isPending || alerts.length > 0}
        />
      }
      inputs={inputs}
      title="Регистрация"
      references={
        <References references={[{ link: "/", title: "Авторизация" }]} />
      }
    />
  );
};

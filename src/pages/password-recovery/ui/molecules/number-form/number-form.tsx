import { Form, References } from "@entities/auth";
import { forgotStartFx } from "@entities/auth/model";
import { Input, PrimaryButton } from "@shared/ui";
import { useState } from "react";

type TNumberFormProps = {
  number: string;
  setNumber: (value: string) => void;
};

export const NumberForm = ({ number, setNumber }: TNumberFormProps) => {
  return (
    <Form
      button={
        <PrimaryButton
          content={"Продолжить"}
          onClick={() => forgotStartFx({ phone: number.replaceAll(" ", "") })}
        />
      }
      inputs={[
        <Input
          placeholder="Телефон"
          setValue={setNumber}
          type="text"
          isPhone={true}
          value={number}
        />,
      ]}
      title="Восстановление"
      references={
        <References
          references={[
            { link: "/", title: "Вспомнил пароль!" },
            { link: "/registration", title: "Регистрация" },
          ]}
        />
      }
    />
  );
};

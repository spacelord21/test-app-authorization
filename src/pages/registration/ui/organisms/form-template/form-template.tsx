import { useAppDispatch } from "@app/store";
import { $alerts } from "@entities/alert";
import { Form, PasswordInput, References } from "@entities/auth";
import { signIn } from "@entities/auth/api";
import { registState } from "@entities/auth/model/registration";
import { Input, PrimaryButton } from "@shared/ui";
import { useStore } from "effector-react";
import { Controller, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
};

const references = [{ link: "/login", title: "Авторизация" }];

export const FormTemplate = () => {
  const alerts = useStore($alerts);
  const dispatch = useAppDispatch();
  const { loading } = registState();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<Required<FormData>>({
      defaultValues: {
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
      },
    });
  useFormPersist("registData", {
    watch,
    setValue,
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(signIn({ ...data, phone: data.phone.replaceAll(" ", "") }));
  });

  const inputs = [
    <Input
      placeholder="Имя"
      type="text"
      {...register("firstName", {
        onChange: (e) => setValue("firstName", e.target.value),
      })}
    />,
    <Input
      placeholder="Фамилия"
      type="text"
      {...register("lastName", {
        onChange: (e) => setValue("lastName", e.target.value),
      })}
    />,
    <Input
      value={getValues().phone}
      placeholder="Номер"
      type="text"
      isPhone={true}
      {...register("phone", {
        onChange: (e) => setValue("phone", e.target.value),
      })}
    />,
    <Controller
      control={control}
      name="password"
      render={({ field }) => (
        <PasswordInput
          label="Минимальная длина пароля - 8 символов"
          value={field.value}
          onChange={(e) => field.onChange(e)}
        />
      )}
    />,
  ];

  return (
    <Form
      button={
        <PrimaryButton
          content={"Зарегистрироваться"}
          onClick={onSubmit}
          disabled={loading || alerts.length > 0}
          loading={loading}
        />
      }
      inputs={inputs}
      title="Регистрация"
      references={<References references={references} />}
    />
  );
};

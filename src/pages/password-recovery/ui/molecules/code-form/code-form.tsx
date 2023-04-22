import { Form, PasswordInput, References } from "@entities/auth";
import { Input, PrimaryButton } from "@shared/ui";
import styles from "./code.module.scss";
import { useTimer } from "./hooks";
import { useAppDispatch } from "@app/store";
import { forgotEnd, forgotStart } from "@entities/auth/api";
import { getUser, passwordRecoveryState } from "@entities/auth/model";
import { Controller, useForm } from "react-hook-form";
import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const references = [
  { link: "/login", title: "Вспомнил пароль!" },
  { link: "/registration", title: "Регистрация" },
];

type TCodeFormProps = {
  phone: string;
};
type FormData = {
  code: string;
  password: string;
  confirmPassword: string;
};

export const CodeForm = ({ phone }: TCodeFormProps) => {
  const navigate = useNavigate();
  const { seconds, setSeconds } = useTimer();
  const { register, handleSubmit, setValue, control } = useForm<
    Required<FormData>
  >({
    defaultValues: {
      code: "",
      confirmPassword: "",
      password: "",
    },
  });
  const { loading } = passwordRecoveryState();
  const { token } = getUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const onSubmit = handleSubmit((data) => {
    if (data.password === data.confirmPassword) {
      dispatch(
        forgotEnd({
          phone: phone.replaceAll(" ", ""),
          ...data,
        })
      );
      return;
    }
    createAlert({
      message: "Пароли не совпадают!",
      timeout: DEFAULT_ALERT_TIMEOUT,
      type: "ERROR",
    });
  });

  const inputs = [
    <Input
      placeholder="Код из СМС"
      {...(register("code"),
      {
        onChange: (e) => setValue("code", e.target.value),
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
    <Controller
      control={control}
      name="confirmPassword"
      render={({ field }) => (
        <PasswordInput
          value={field.value}
          onChange={(e) => field.onChange(e)}
        />
      )}
    />,
  ];

  const updateCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(forgotStart({ phone: phone.replaceAll(" ", "") }));
    setSeconds(20);
  };

  const buttonContent =
    seconds !== 0
      ? `Повторно отправить код можно будет через ${seconds} секунд`
      : "Отправить код повторно";

  return (
    <Form
      button={
        <PrimaryButton
          content="Восстановить"
          onClick={onSubmit}
          disabled={loading}
          loading={loading}
        />
      }
      inputs={inputs}
      title="Восстановление"
      additional={[
        <button
          className={styles.timer}
          onClick={updateCode}
          disabled={seconds !== 0}
          key={styles.timer}
        >
          {buttonContent}
        </button>,
      ]}
      references={<References references={references} />}
    />
  );
};

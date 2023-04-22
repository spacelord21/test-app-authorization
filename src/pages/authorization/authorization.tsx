import {
  Form,
  PasswordInput,
  References,
  RememberMe,
  useAuthForm,
} from "@entities/auth";
import styles from "./authorization.module.scss";
import { Input, PrimaryButton } from "@shared/ui";
import { useAppDispatch } from "@app/store";
import { useStore } from "effector-react";
import { $alerts } from "@entities/alert";
import { Controller, useForm } from "react-hook-form";
import { login } from "@entities/auth/api";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getUser } from "@entities/auth/model";
import useFormPersist from "react-hook-form-persist";

type FormData = {
  phone: string;
  password: string;
  rememberMe: boolean;
};

const references = [
  { title: "Забыли пароль?", link: "/password-recovery" },
  { link: "/registration", title: "Регистрация" },
];

export const Authorization = () => {
  const { loading } = useAuthForm();
  const isAuthorized = getUser().token;
  const navigate = useNavigate();
  const alerts = useStore($alerts);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, getValues, setValue, control, watch } =
    useForm<Required<FormData>>({
      defaultValues: {
        password: "",
        phone: "",
        rememberMe: false,
      },
    });
  useFormPersist("authData", {
    watch,
    setValue,
  });

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized]);

  const onSubmit = handleSubmit((data) => {
    dispatch(
      login({
        password: data.password,
        phone: data.phone.replaceAll(" ", ""),
      })
    );
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <Form
            button={
              <PrimaryButton
                content={"Авторизоваться"}
                onClick={onSubmit}
                disabled={alerts.length > 0}
                loading={loading}
              />
            }
            inputs={[
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
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />,
            ]}
            title="Авторизация"
            rememberMe={
              <RememberMe
                {...(register("rememberMe"),
                {
                  onChange: () =>
                    setValue("rememberMe", !getValues().rememberMe),
                })}
              />
            }
            references={<References references={references} />}
          />
        </div>
      </div>
    </div>
  );
};

import { useAppDispatch } from "@app/store";
import { Form, References } from "@entities/auth";
import { forgotStart } from "@entities/auth/api";
import { passwordRecoveryState } from "@entities/auth/model";
import { Input, PrimaryButton } from "@shared/ui";

const references = [
  { link: "/login", title: "Вспомнил пароль!" },
  { link: "/registration", title: "Регистрация" },
];

type TNumberFormProps = {
  number: string;
  setNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NumberForm = ({ number, setNumber }: TNumberFormProps) => {
  const dispatch = useAppDispatch();
  const { loading } = passwordRecoveryState();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(forgotStart({ phone: number.replaceAll(" ", "") }));
  };

  return (
    <Form
      button={
        <PrimaryButton
          content={"Продолжить"}
          onClick={onSubmit}
          disabled={loading}
          loading={loading}
        />
      }
      inputs={[
        <Input
          placeholder="Телефон"
          onChange={setNumber}
          type="text"
          isPhone={true}
          value={number}
        />,
      ]}
      title="Восстановление"
      references={<References references={references} />}
    />
  );
};

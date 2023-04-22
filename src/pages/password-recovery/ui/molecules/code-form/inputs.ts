type TInput = {
  id: number;
  placeholder?: string;
  name: "code" | "password" | "confirmPassword";
  isPassword?: boolean;
  isPhone?: boolean;
};

export const inputs: TInput[] = [
  {
    id: 1,
    placeholder: "Код из СМС",
    name: "code",
  },
  {
    id: 2,
    placeholder: "Пароль",
    name: "password",
    isPassword: true,
  },
  {
    id: 3,
    placeholder: "Повторите пароль",
    name: "confirmPassword",
    isPassword: true,
  },
];

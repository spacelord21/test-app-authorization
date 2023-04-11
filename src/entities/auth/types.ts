export type TAuth = {
  phone: string;
  password: string;
};

export type TAuthModel = {
  success: boolean;
  token?: string;
  message?: string;
  errors?: TError[];
};

export type TRegistUser = {
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
};

type TError = {
  value: string;
  msg: string;
  param: string;
  location: string;
};

export type TRegistResponse = Partial<TAuthModel>;

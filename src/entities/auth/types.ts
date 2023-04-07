export type TAuth = {
  phone: string;
  password: string;
};

export type TAuthModel = {
  success: boolean;
  token?: string;
  message?: string;
  errors?: string[];
};

export type TRegistUser = {
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type TRegistResponse = Partial<TAuthModel>;

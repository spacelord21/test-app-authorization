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

export type TAlert = {
  message: string;
  type: TAlertVariant;
  timeout: number;
};

export type TAlertVariant = "ERROR" | "SUCCESS" | "WARNING";

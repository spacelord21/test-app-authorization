import { useState } from "react";
import { useNavigate } from "react-router";
import { CodeForm, NumberForm } from "../../molecules";
import { passwordRecoveryState } from "@entities/auth/model";

export const FormTemplate = () => {
  const [number, setNumber] = useState("");
  const { startSuccess } = passwordRecoveryState();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNumber(e.target.value);
  };

  const actualForm = startSuccess ? (
    <CodeForm phone={number.replaceAll(" ", "")} />
  ) : (
    <NumberForm number={number} setNumber={onChangeHandler} />
  );

  return actualForm;
};

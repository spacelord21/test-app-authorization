import { Form } from "@entities/auth";
import { forgotEndFx, forgotStartFx } from "@entities/auth/model";
import { Input } from "@shared/ui";
import { useState } from "react";
import { useNavigate } from "react-router";
import { CodeForm, NumberForm } from "../../molecules";

export const FormTemplate = () => {
  const [number, setNumber] = useState("");
  const [firstStageSuccess, setFirstStageSuccess] = useState(false);
  const navigate = useNavigate();

  forgotStartFx.doneData.watch((payload) => {
    if (payload.success) setFirstStageSuccess(true);
  });
  forgotEndFx.doneData.watch((payload) => {
    if (payload.success) {
      navigate("/personal-account");
    }
  });

  const actualForm = firstStageSuccess ? (
    <CodeForm phone={number.replaceAll(" ", "")} />
  ) : (
    <NumberForm number={number} setNumber={setNumber} />
  );

  return actualForm;
};

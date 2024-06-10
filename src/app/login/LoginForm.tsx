"use client";

import { FC, useEffect } from "react";
import { signInUser } from "../../actions/signInUser";
import { useFormState } from "react-dom";
type Props = {
  csrfToken: string;
};

type FormState = {
  message?: string;
  shouldRedirect?: boolean;
};

const initialState: FormState = {};

const LoginForm: FC<Props> = ({ csrfToken }) => {
  const [state, formAction] = useFormState(signInUser, initialState);

  useEffect(() => {
    if (state.shouldRedirect) {
      window.location.href = "/";
    }
  }, [state]);
  return (
    <div className="flex flex-col gap-2">
      {state?.message && <span>{state.message}</span>}
      <form action={formAction} className="flex w-[400px] flex-col">
        <label htmlFor="username">Login</label>
        <input name="username" type="text" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <button type="submit">
          <span>Se connecter</span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

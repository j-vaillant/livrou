"use client";

import { FC, useEffect } from "react";
import { signInUser } from "../../actions/signInUser";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

type Props = {
  csrfToken: string;
};

type FormState = {
  message?: string;
  success?: boolean;
};

const initialState: FormState = {};

const LoginForm: FC<Props> = ({ csrfToken }) => {
  const [state, formAction] = useFormState(signInUser, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state.success, router]);

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

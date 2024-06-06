"use client";

import insertBook from "./insertBook";
import { FC } from "react";
import { useFormState } from "react-dom";

type FormState = {
  errors?: Record<string, string>;
  message?: string;
};

const initialState: FormState = {};

const NewBookForm: FC = () => {
  const [state, formAction] = useFormState(insertBook, initialState);

  console.log(state);

  return (
    <div className="mx-auto w-[400px]">
      <form action={formAction}>
        {state.message && <span>{state.message}</span>}
        <div className="flex w-full flex-col">
          <div className="flex flex-col w-full">
            <label>Titre</label>
            <input type="text" name="title" />
            {state.errors && state.errors.title && (
              <span className="text-red-600">{state.errors?.title}</span>
            )}
          </div>
          <div className="flex flex-col w-full mt-4">
            <label>Résumé</label>
            <textarea name="summary" />
            {state.errors && state.errors.summary && (
              <span className="text-red-600">{state.errors?.summary}</span>
            )}
          </div>
          <button type="submit">Publier</button>
        </div>
      </form>
    </div>
  );
};

export default NewBookForm;

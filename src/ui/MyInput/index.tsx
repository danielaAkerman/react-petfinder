import React from "react";
import css from "./index.css";

type MyInputProps = {
  defaultValue?, placeholder?: string;
  label: string
  name: string;
  type?: string
  textarea?: boolean
  petName?: string
};

function MyInput(props: MyInputProps) {
  const { name, defaultValue, label, type, textarea, placeholder, petName } = props;
  const petNameQuestion = petName + "?"

  return (
    <div className={css.root}>
      <label>{label}{petName ? petNameQuestion : null}</label>
      {
        textarea ?
          <textarea name={name} defaultValue={defaultValue} className={css.input} />
          :
          <input type={type} name={name} defaultValue={defaultValue} className={css.input} placeholder={placeholder} />
      }
    </div>

  );
}

export { MyInput };

import React from "react";
import css from "./index.css";

type ButtonProps = {
  children: any
  type?: any
  funcion?: () => any
};

function MainButton(props: ButtonProps) {
  return <button onClick={props.funcion}type={props.type} className={css.root}>{props.children}</button>;
}

function LargeButton(props: ButtonProps) {
  return <button onClick={props.funcion}type={props.type} className={`${css.root} ${css.large}`}>{props.children}</button>;
}





export { MainButton, LargeButton };
import React from "react";
import css from "./index.css";
// import { ShowModalLostPet } from "../../atoms";
// import { useRecoilState } from "recoil";

type CustomButtonProps = {
  name, objectID, label: string;
  funcion: () => any
}

export function CustomButton(props: CustomButtonProps) {
  const {  funcion, label} = props

  return (
    <div className={css.root}>
      <button onClick={funcion}>{label}</button>
    </div>
  );
}
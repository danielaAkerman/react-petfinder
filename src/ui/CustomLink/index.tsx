import React from "react";
import css from "./index.css";
// import { ShowModalLostPet } from "../../atoms";
// import { useRecoilState } from "recoil";

type CustomLinkProps = {
  children, label: string;
  funcion: () => any
}

export function CustomLink(props: CustomLinkProps) {
  const { label, children, funcion } = props

  function ejecutarFunction() {
    funcion()
  }
  return (
    <div className={css.root}>
      <span>
        {label}
        <span onClick={ejecutarFunction} className={css.link}>{children}</span>
      </span>
    </div>
  );
}
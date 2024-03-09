import React from "react";
import css from "./index.css";
// import { ShowModalLostPet } from "../../atoms";
// import { useRecoilState } from "recoil";

type CustomButtonProps = {
  name, objectID, label: string;
  funcion: () => any
}

export function CustomButton(props: CustomButtonProps) {
  const { name, objectID , funcion, label} = props
  // const [showModal, setShowModal] = useRecoilState(ShowModalLostPet)

  // ejecutar la funcion q le manden
  // funcion()


  return (
    <div className={css.root}>
      <button onClick={funcion}>{label}</button>
    </div>
  );
}

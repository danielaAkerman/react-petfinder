import React, { useState } from "react";
import css from "./index.css";
import { ModalLostPet } from "../ModalLostPet";
import { ShowModalLostPet } from "../../atoms";
import { DataModalLostPet } from "../../atoms";
import { useRecoilState } from "recoil";
import { CustomButton } from "../../ui/CustomButton";

type LostPetsNearMeItemProps = {
  name, ubication, picture_url, objectID: string
}

export function LostPetsNearMeItem(props: LostPetsNearMeItemProps) {
  const { name, ubication, picture_url, objectID } = props
  const [showModal, setShowModal] = useRecoilState(ShowModalLostPet)
  const [dataModal, setDataModal] = useRecoilState(DataModalLostPet)




  function mostrarModal() {
    console.log("funcion mostrarModal", name, objectID)
    setShowModal(true)
    setDataModal({ name, objectID })
  }

  return (
    <div className={css.root}>
      <img src={picture_url} className={css.picture}></img>
      <h4 className={css.name}>Nombre: {name}</h4>
      <h6 className={css.ubication}>Ubicación: {ubication}</h6>
      <CustomButton name={name} objectID={objectID} funcion={mostrarModal} label={`¿Viste a ${name}?`} />
    </div>
  );
}

import React, { useState } from "react";
import css from "./index.css";
import { ModalLostPet } from "../ModalLostPet";
import { ShowModalLostPet } from "../../atoms";
import { DataModalLostPet } from "../../atoms";
import { useRecoilState } from "recoil";
import { CustomButton } from "../../ui/CustomButton";
import { useNavigate } from "react-router-dom";

type MyLostPetItemProps = {
  name, ubication, picture_url, objectID, owner?: string
}

export function MyLostPetItem(props: MyLostPetItemProps) {
  const { name, ubication, picture_url, objectID } = props
  const [showModal, setShowModal] = useRecoilState(ShowModalLostPet)
  const [dataModal, setDataModal] = useRecoilState(DataModalLostPet)
  const navigate = useNavigate();

  function editarPublicacion() {
    navigate("/editar-publicacion/" + name + "&" + objectID, { replace: true });
  }

  function eliminarMascota() {
    setShowModal(true)
    setDataModal({ name, objectID })
  }

  return (
    <div className={css.root}>
      <img src={picture_url} className={css.picture}></img>
      <h4 className={css.name}>Nombre: {name}</h4>
      <h6 className={css.ubication}>Ubicación: {ubication}</h6>
      <CustomButton name={name} objectID={objectID} funcion={editarPublicacion} label={`Editar Publicación`} />
      <CustomButton name={name} objectID={objectID} funcion={eliminarMascota} label={`Eliminar Publicación`} />
    </div>
  );
}

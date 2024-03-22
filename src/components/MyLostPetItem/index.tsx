import React, { useState } from "react";
import css from "./index.css";
import { ModalLostPet } from "../ModalLostPet";
import { ShowModalLostPet, DataModalLostPet, datosMyPet, cambioAtom } from "../../atoms";
import { useRecoilState } from "recoil";
import { CustomButton } from "../../ui/CustomButton";
import { useNavigate } from "react-router-dom";
const url = "https://lostpets.onrender.com";

type MyLostPetItemProps = {
  name, ubication, picture_url, objectID, owner?: string
}

export function MyLostPetItem(props: MyLostPetItemProps) {
  const { name, ubication, picture_url, objectID } = props
  const [showModal, setShowModal] = useRecoilState(ShowModalLostPet)
  const [dataModal, setDataModal] = useRecoilState(DataModalLostPet)
  const [dataMyPet, setDataMyPet] = useRecoilState(datosMyPet)
  const [cambio, setcambio] = useRecoilState(cambioAtom)
  const navigate = useNavigate();

  function editarPublicacion() {

    setDataMyPet(
      {
        objectID,
        name,
        ubication,
        picture_url
      }
    )

    navigate("/editar-publicacion/", { replace: true });

  }

  function eliminarMascota() {
    fetch(url + "/delete-pet/" + objectID, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "deleted" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Mascota Eliminada");
        setcambio(Math.random())
        navigate("/mis-mascotas-reportadas", { replace: true })
      });

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

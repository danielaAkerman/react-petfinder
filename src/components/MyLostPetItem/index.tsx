import React from "react";
import css from "./index.css";
import { ShowModalLostPet, DataModalLostPet, datosMyPet, cambioAtom } from "../../atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { LargeButton, MainButton } from "../../ui/MyButton";
import { ModalLostPet } from "../ModalLostPet";
const url = "https://lostpets.onrender.com";

type MyLostPetItemProps = {
  name, ubication, picture_url, objectID, owner?: string
}

export function MyLostPetItem(props: MyLostPetItemProps) {
  const { name, ubication, picture_url, objectID, owner } = props
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
        setcambio(Math.random())
        navigate("/mis-mascotas-reportadas", { replace: true })
      });

  }

  function mostrarModal() {
    setShowModal(true)
    setDataModal({ name, objectID })
  }

  return (
    <div className={css.root}>
      <div className={css.picture_container} style={{ backgroundImage: `url(${picture_url})` }}>
        <img src={picture_url} className={css.picture}></img>
      </div>
      <div className={css.text}>
        <div className={css.name}>{name}</div>
        <div className={css.ubication}>{ubication}</div>

        {owner ?
          <div>
            <MainButton funcion={editarPublicacion}>Editar Publicación</MainButton>
            <MainButton funcion={eliminarMascota}>Eliminar Publicación</MainButton>
          </div>
          :
          <div>
            <MainButton funcion={mostrarModal}>Viste a {name}?</MainButton>
          </div>
        }

      </div>
    </div>
  );
}

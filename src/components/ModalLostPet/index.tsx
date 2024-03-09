import React from "react";
import css from "./index.css";
import { DataModalLostPet, ShowModalLostPet } from "../../atoms";
import { useRecoilState } from "recoil";



export function ModalLostPet() {

  const [showModal, setShowModal] = useRecoilState(ShowModalLostPet)
  const [dataModal, setDataModal] = useRecoilState(DataModalLostPet)

  function ocultarModal() {
    setShowModal(false)
  }


  return (
    <div className={css.root}>
      MODAL {dataModal.name} {dataModal.objectID}
      <button onClick={ocultarModal}>Cerrar modal</button>
    </div>
  );
}

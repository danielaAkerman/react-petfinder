import React from "react";
import css from "./index.css";
import { DataModalLostPet, ShowModalLostPet } from "../../atoms";
import { useRecoilState } from "recoil";
import { enviarReporte } from "../../api";

export function ModalLostPet() {

  const [showModal, setShowModal] = useRecoilState(ShowModalLostPet)
  const [dataModal, setDataModal] = useRecoilState(DataModalLostPet)

  function ocultarModal() {
    setShowModal(false)
  }
  const { name, objectID } = dataModal


  function submittedForm(e) {
    e.preventDefault()

    const reporte: any = {};

    reporte.pet_name = name;
    reporte.reporter = e.target.nombre.value
    reporte.phone_number = e.target.telefono.value
    reporte.message = e.target.mensaje.value
    reporte.pet_id = objectID;

    enviarReporte(reporte);
    ocultarModal()
  }


  return (<div>

    <div className={css.root}></div>

    <div className={css.content}>
      <div className={css.xButtonContainer}>

        <button onClick={ocultarModal}>X</button>
      </div>

      AYUDANOS A ENCONTRAR A {name}


      <form className={css.form} onSubmit={submittedForm}>

        <label className={css.label}>
          <span>Tu nombre:</span>

          <input name="nombre" />
        </label>


        <label className={css.label}>
          <span>Tu teléfono:</span>

          <input name="telefono" />
        </label>


        <label className={css.label}>
          <span>¿Dónde viste a {name}?</span>

          <textarea name="mensaje" />
        </label>


        <button>ENVIAR DATOS</button>


      </form>
    </div>
  </div>
  );
}
import React from "react";
import css from "./index.css";
import { DataModalLostPet, ShowModalLostPet } from "../../atoms";
import { useRecoilState } from "recoil";
import { enviarReporte } from "../../api";
import { MyInput } from "../../ui/MyInput";
import { LargeButton, MainButton } from "../../ui/MyButton";
import close from "../../assets/img/close.png"

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


  return (<div className={css.root}>

    <div className={css.background}></div>

    <div className={css.content}>
      <div className={css.xButtonContainer}>
        <img src={close} onClick={ocultarModal} className={css.xButton}></img>
        {/* <button onClick={ocultarModal}>X</button> */}
      </div>

      AYUDANOS A ENCONTRAR A {name}
      <form className={css.form} onSubmit={submittedForm}>
        <MyInput name="nombre" label="Tu nombre:" />
        <MyInput name="telefono" label="Tu teléfono:" />
        <MyInput name="mensaje" label="¿Dónde viste a " petName={name} textarea={true} />
        <LargeButton type="submit" >Enviar datos</LargeButton>
      </form>
    </div>
  </div>
  );
}
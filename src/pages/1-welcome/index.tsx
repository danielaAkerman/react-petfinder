import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import css from "./index.css";
import { usePerrosCerca } from "../../hooks";
import { LostPetsNearMeItem } from "../../components/LostPetsNearMeItem";
import { ModalLostPet } from "../../components/ModalLostPet";
import { ShowModalLostPet } from "../../atoms";




function PetsPage() {
  const [showModal, setShowModal] = useRecoilState(ShowModalLostPet)

  const mascotasCercanas = usePerrosCerca()
  console.log(mascotasCercanas)

  return (
    <div className={css.root}>
      <h1>Mascotas perdidas cerca tuyo</h1>
      <div className={css.results} id="results">
        {mascotasCercanas.map((m) => (
          <LostPetsNearMeItem
            key={m.objectID}
            name={m.name}
            ubication={m.ubication}
            picture_url={m.picture_url}
            objectID={m.objectID}

          />
        ))}{
          showModal ?
            <ModalLostPet /> : null
        }
      </div>
    </div>
  );
}

export { PetsPage };
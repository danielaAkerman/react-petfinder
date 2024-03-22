import React from "react";
import { useRecoilState } from "recoil";
import css from "./index.css";
import { usePerrosCerca } from "../../hooks";
import { LostPetsNearMeItem } from "../../components/LostPetsNearMeItem";
import { ModalLostPet } from "../../components/ModalLostPet";
import { ShowModalLostPet, UserLocationAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";




export function LostPetsNearMe() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useRecoilState(ShowModalLostPet)

  const mascotasCercanas = usePerrosCerca()

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


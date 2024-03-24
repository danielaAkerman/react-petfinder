import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import css from "./index.css";
import { usePerrosCerca } from "../../hooks";
import { LostPetsNearMeItem } from "../../components/LostPetsNearMeItem";
import { ModalLostPet } from "../../components/ModalLostPet";
import { HayUserLocationAtom, LoggedAtom, ShowModalLostPet, UserLocationAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { MyLostPetItem } from "../../components/MyLostPetItem";
import { CustomLink } from "../../ui/CustomLink";



export function LostPetsNearMe() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useRecoilState(ShowModalLostPet)
  const [logged, setLogged] = useRecoilState(LoggedAtom)

  const mascotasCercanas = usePerrosCerca()

  function irAPublicarMascota() {
    {
      logged ?
        navigate("/publicar-mascota", { replace: true })
        :
        navigate("/iniciar-sesion", { replace: true })
    }
  }


  return (
    <div>
      {mascotasCercanas[0] ?


        <div className={css.root}>
          <h1>Mascotas perdidas cerca tuyo</h1>
          <div className={css.results} id="results">
            {mascotasCercanas.map((m) => (
              <MyLostPetItem
                key={m.objectID}
                name={m.name}
                ubication={m.ubication}
                picture_url={m.picture_url}
                objectID={m.objectID}

              />
            ))}{
              showModal ?
                <ModalLostPet />
                : null
            }
          </div>
        </div>
        :
        <div>
          <h1>No se reportaron mascotas perdidas cerca de tu ubicación</h1>
          <CustomLink label="Para reportar una mascota perdida hacé " funcion={irAPublicarMascota}>click aquí</CustomLink>
        </div>
      }
    </div>
  );
}


import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { myReportedPetsSelector } from "../../atoms";
import { MyLostPetItem } from "../../components/MyLostPetItem";
import css from "./index.css";
import { useNavigate } from "react-router-dom";

export function MisMascotasReportadas() {
  const navigate = useNavigate()

  const misMascotasReportadas = useRecoilValue(myReportedPetsSelector)
  function irAPublicarMascota() {
    navigate("/publicar-mascota", { replace: true })
  }

  return (

    <div>
      {misMascotasReportadas[0] ?

        <div>
          <h1>Mis Mascotas</h1>

          <div className={css.results} id="results">
            {misMascotasReportadas.map((m) => (
              <MyLostPetItem
                key={m.id}
                objectID={m.id}
                name={m.name}
                ubication={m.ubication}
                picture_url={m.picture_url}
                owner="me"
              />
            ))}
          </div>
        </div>
        :
        <div>

          <h1>No hay mascotas reportadas</h1>
          <span>Para reportar una mascota perdida hacé <span onClick={irAPublicarMascota}>click aquí</span></span>
        </div>

      }
    </div>
  );
}
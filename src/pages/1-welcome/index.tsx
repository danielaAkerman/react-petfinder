import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import css from "./index.css";
import { usePerrosCerca } from "../../hooks";
import { LostPetsNearMeItem } from "../../components/LostPetsNearMeItem";




function PetsPage() {

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
          />
        ))}
      </div>
    </div>
  );
}

export { PetsPage };
import React from "react";
import css from "./index.css";

type LostPetsNearMeItemProps = {
  name, ubication, picture_url: string
}

export function LostPetsNearMeItem(props: LostPetsNearMeItemProps) {
  const { name, ubication, picture_url } = props
  console.log("soy el item")
  return (
    <div className={css.root}>
      <h4 className={css.name}>Nombre: {name}</h4>
      <h6 className={css.ubication}>Ubicación: {ubication}</h6>
      <img src={picture_url} className={css.picture}></img>
    </div>
  );
}
